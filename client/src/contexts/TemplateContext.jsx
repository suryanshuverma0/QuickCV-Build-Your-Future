// // TemplateContext.js
// import  { createContext, useContext, useState } from "react";
// import Template1 from "../templates/Template1";
// import Template2 from "../templates/Template2";
// import Template3 from "../templates/Template3";

// import Template1Image from "../assets/template1.png";
// import Template2Image from "../assets/template2.png";
// import Template3Image from "../assets/template3.png";

// import PropTypes from "prop-types";

// const TemplateContext = createContext();

// export const TemplateProvider = ({ children }) => {
//   const templates = [
//     { id: 1, name: "Template 1", image: Template1Image  , component: Template1 },
//     { id: 2, name: "Template 2", image:Template2Image  , component: Template2 },
//     { id: 3, name: "Template 3", image:Template3Image  , component: Template3 },
//   ];

//   const [selectedTemplate, setSelectedTemplate] = useState(() => {
//     const savedTemplate = localStorage.getItem("selectedTemplate");
//     return savedTemplate ? JSON.parse(savedTemplate) : templates[0];
//   });

//   const updateTemplate = (template) => {
//     setSelectedTemplate(template);
//     localStorage.setItem("selectedTemplate", JSON.stringify(template));
//   };

//   return (
//     <TemplateContext.Provider value={{ selectedTemplate, updateTemplate, templates }}>
//       {children}
//     </TemplateContext.Provider>
//   );
// };


// TemplateProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const useTemplate = () => useContext(TemplateContext);


import { createContext, useContext, useState } from "react";
import Template1 from "../Templates/Template1";
import Template2 from "../Templates/Template2";
import Template3 from "../Templates/Template3";

import Template1Image from "../assets/template1.png";
import Template2Image from "../assets/template2.png";
import Template3Image from "../assets/template3.png";

import PropTypes from "prop-types";

const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const templates = [
    { id: 1, name: "Template 1", image: Template1Image, component: Template1 },
    { id: 2, name: "Template 2", image: Template2Image, component: Template2 },
    { id: 3, name: "Template 3", image: Template3Image, component: Template3 },
  ];

  // Initialize selected template safely from localStorage
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      const savedTemplate = localStorage.getItem("selectedTemplate");
      if (savedTemplate) {
        const parsed = JSON.parse(savedTemplate);
        // Ensure the parsed template exists in templates array
        const validTemplate = templates.find(t => t.id === parsed.id);
        return validTemplate || templates[0];
      }
    } catch (err) {
      console.warn("Invalid template in localStorage", err);
    }
    return templates[0];
  });

  const updateTemplate = (template) => {
    if (!template) return;
    setSelectedTemplate(template);
    localStorage.setItem("selectedTemplate", JSON.stringify(template));
  };

  return (
    <TemplateContext.Provider value={{ selectedTemplate, updateTemplate, templates }}>
      {children}
    </TemplateContext.Provider>
  );
};

TemplateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTemplate = () => useContext(TemplateContext);
