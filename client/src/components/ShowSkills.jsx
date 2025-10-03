import PropTypes from "prop-types";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const ShowSkills = ({ value, onEdit , setIsEditing , onDelete }) => {
  return (
    <li className="flex justify-between items-center bg-white shadow-md p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 max-w-2xl w-full">
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-md md:text-xl lg:text-xl font-bold text-gray-800">
            {value.skill}
          </h1>
        </div>
       <div>
        <span className="text-green-600">{value.level}</span>
       </div>
      </div>
      <div className="flex gap-2 md:gap-4 lg:gap-4">
        <button onClick={()=>{onEdit(value._id)
         setIsEditing(true)}}
          className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
          aria-label="Edit"
        >
          <CiEdit size={24} />
        </button>
        <button onClick={()=>{ onDelete(value._id)}}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
          aria-label="Delete"
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </li>
  );
};

ShowSkills.propTypes = {
  value: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  setIsEditing: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ShowSkills;
