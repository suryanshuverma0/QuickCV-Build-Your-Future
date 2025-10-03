// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import propTypes from "prop-types";

// const AddAchievements = ({onInputChange, achievement}) => {
  

//   return (
//     <>
//       <form>
//         <div className=" p-4 bg-white rounded-lg shadow-sm space-y-8">
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium text-gray-700">Title</label>
//             <input
//               type="text"
//               className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
//               placeholder="Your Achievement"
//               required
//               value={achievement.title}
//               onChange={(e) => onInputChange(achievement.id, "title", e.target.value)}
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="summary"
//               className="text-sm font-medium text-gray-700"
//             >
//               Summary
//             </label>
//             <ReactQuill
//               theme="snow"
//               id="summary"
//               name="summary"
//               value={achievement.summary}
//               onChange={(value) => onInputChange(achievement.id, "summary", value)}
//               modules={{
//                 toolbar: [["bold", "italic", "underline"], ["link"]],
//               }}
//               placeholder="Describe about your achievements"
//               className=" custom-quill-editor mb-16"
//             />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-medium text-gray-700">Link</label>
//             <input
//               type="text"
//               className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
//               placeholder="Your achievements link"

//               value={achievement.link}
//               onChange={(e) => onInputChange(achievement.id, "link", e.target.value)}
//             />
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };
// AddAchievements.propTypes = {
//   onInputChange: propTypes.func.isRequired,
//   achievement: propTypes.object.isRequired,
// };

// export default AddAchievements;

import propTypes from "prop-types";

const AddAchievements = ({onInputChange, achievement}) => {
  return (
    <>
      <form>
        <div className="p-4 bg-white rounded-lg shadow-sm space-y-8">
          {/* Title Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="Your Achievement"
              required
              value={achievement.title}
              onChange={(e) => onInputChange(achievement.id, "title", e.target.value)}
            />
          </div>

          {/* Summary Textarea */}
          <div className="flex flex-col gap-2">
            <label htmlFor="summary" className="text-sm font-medium text-gray-700">
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={achievement.summary}
              onChange={(e) => onInputChange(achievement.id, "summary", e.target.value)}
              placeholder="Describe your achievements in detail"
              rows="6"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold resize-none w-full"
            />
          </div>

          {/* Link Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Link</label>
            <input
              type="text"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="Your achievements link"
              value={achievement.link}
              onChange={(e) => onInputChange(achievement.id, "link", e.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

AddAchievements.propTypes = {
  onInputChange: propTypes.func.isRequired,
  achievement: propTypes.object.isRequired,
};

export default AddAchievements;
