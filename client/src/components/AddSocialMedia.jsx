import PropTypes from "prop-types";
import { AiOutlineDelete } from "react-icons/ai";

const AddSocialMedia = ({ formData, onChange, onRemove }) => {
  return (
    <div className="grid grid-cols-12 gap-3 mb-4">
      <div className="col-span-5 flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Social Website</label>
        <select
          value={formData.linkType}
          onChange={(e) => onChange("linkType", e.target.value)}
          className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="Website">Website</option>
          <option value="Twitter">Twitter</option>
          <option value="Facebook">Facebook</option>
          <option value="Github">GitHub</option>
          <option value="Linkedin">LinkedIn</option>
          <option value="Instagram">Instagram</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="col-span-6 flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Link</label>
        <input
          type="text"
          value={formData?.link}
          onChange={(e) => onChange("link", e.target.value)}
          placeholder="https://example.com"
          className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
        />
      </div>
      <div className="col-span-1 flex items-center justify-center pt-8">
        <AiOutlineDelete
          onClick={onRemove}
          className="cursor-pointer text-2xl transition-colors"
        />
      </div>
    </div>
  );
};

AddSocialMedia.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default AddSocialMedia;
