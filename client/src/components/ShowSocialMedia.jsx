// import PropTypes from "prop-types";
// import { CiEdit } from "react-icons/ci";
// import { AiOutlineDelete } from "react-icons/ai";
// const ShowSocialMedia = ({value}) => {
//   return (
//     <>
//          <li className="flex justify-between items-center bg-white shadow-md p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 max-w-3xl w-full">
//       <div className="flex flex-col gap-1">
//         <div>
//           <h1 className="text-md md:text-xl lg:text-xl font-bold text-gray-800">
//             {value?.linkType}
//           </h1>
//         </div>
//         <div className="flex flex-row gap-2 md:gap-4 lg:gap-4 items-center text-gray-600">
//           <div className="flex justify-center items-center gap-3">
//             <span className="font-semibold text-gray-800">Link: </span>{" "}
//             <a
//               className="text-blue-500 hover:underline"
//               target="_blank"
//               rel="noopener noreferrer"
//               href={value?.link}
//             > {value.link}</a>
//           </div>
//         </div>
//       </div>
//       <div className="flex gap-2 md:gap-4 lg:gap-4">
//         <button
//           className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
//           aria-label="Edit education"
//         >
//           <CiEdit size={24} />
//         </button>
//         <button
//           className="text-red-500 hover:text-red-700 transition-colors duration-200"
//           aria-label="Delete education"
//         >
//           <AiOutlineDelete size={24} />
//         </button>
//       </div>
//     </li> 
//     </>
//   )
// }
// ShowSocialMedia.propTypes = {
//          value: PropTypes.object.isRequired,
// }
// export default ShowSocialMedia


import PropTypes from "prop-types";
import { AiOutlineDelete } from "react-icons/ai";
const ShowSocialMedia = ({ value, onDelete }) => {
  return (
    <li className="flex justify-between items-center bg-white shadow-md p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 max-w-3xl w-full">
      <div className="flex flex-col gap-1">
        <div>
          <h1 className="text-md md:text-xl lg:text-xl font-bold text-gray-800">
            {value?.linkType}
          </h1>
        </div>
        <div className="flex flex-row gap-2 md:gap-4 lg:gap-4 items-center text-gray-600">
          <div className="flex justify-center items-center gap-3">
            <span className="font-semibold text-gray-800">Link: </span>{" "}
            <a
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href={value?.link}
            >
              {value.link}
            </a>
          </div>
        </div>
      </div>
      <div className="flex gap-2 md:gap-4 lg:gap-4">
        <button
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
          aria-label="Delete social media"
          onClick={() => onDelete(value._id)}
        >
          <AiOutlineDelete size={24} />
        </button>
      </div>
    </li>
  );
};

ShowSocialMedia.propTypes = {
  value: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ShowSocialMedia;
