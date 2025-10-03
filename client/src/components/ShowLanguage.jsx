import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";

const ShowLanguage = ({ value, onEdit, setIsEditing, onDelete }) => {
  return (
    <li className="flex justify-between items-center bg-white shadow-md p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 max-w-xl w-full">
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-md md:text-xl lg:text-xl font-bold text-gray-800">
            {value.language}
          </h1>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4 lg:gap-4">
        <button
          onClick={() => {
            onEdit(value._id);
            setIsEditing(true);
          }}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          aria-label="Edit"
        >
          <CiEdit size={24} />
        </button>
        <button
          onClick={() => onDelete(value._id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
          aria-label="Delete"
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </li>
  );
};

ShowLanguage.propTypes = {
  value: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
export default ShowLanguage;
