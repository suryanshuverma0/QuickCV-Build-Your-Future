// TemplateSelector.js
import { useTemplate } from "../contexts/TemplateContext";
import PropTypes from "prop-types";

import FormTitle from "./FormTitle";
const TemplateSelector = ({onItemClick}) => {
  const { selectedTemplate, updateTemplate, templates } = useTemplate();

  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <FormTitle title="Select a Template" description="Select a template that suits your need and requirement"/>
      <div className="grid grid-cols-3 gap-4"> 
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer p-4 border rounded-lg hover:bg-gray-200 transition ${
              selectedTemplate.id === template.id ? "bg-indigo-100" : "bg-white"
            }`}
            onClick={() => updateTemplate(template)}
          >
            <img src={template.image} alt={template.name} className="mb-2 w-full h-32 object-cover rounded-md" />
            <p className="text-center text-gray-800">{template.name}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-gray-600">Selected Template:<span className="text-blue-500"> {selectedTemplate ? selectedTemplate.name : "None"}</span></p>

      <div className="flex justify-end  my-8">
      <button
          className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100"
          onClick={() => onItemClick("profileImage")}
        >
          Continue to Profile Image
        </button>
      </div>
    </div>
  );
};
TemplateSelector.propTypes = {
  onItemClick: PropTypes.func.isRequired,
}

export default TemplateSelector;
