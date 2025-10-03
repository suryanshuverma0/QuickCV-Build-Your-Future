import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import PropTypes from "prop-types";

const AddProjects = ({onInputChange, project}) => {

  return (
    <>
      <form>
        <div className=" p-4 bg-white rounded-lg shadow-sm space-y-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="Resume Builder"
              required
              value={project.title}
              onChange={(e) => onInputChange(project.id, "title", e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="summary"
              className="text-sm font-medium text-gray-700"
            >
              Summary
            </label>
            <ReactQuill
              theme="snow"
              id="summary"
              required
              name="summary"
              value={project.summary}
              onChange={(value) => onInputChange(project.id, "summary", value)}
              modules={{
                toolbar: [["bold", "italic", "underline"], ["link"]],
              }}
              placeholder="Describe your project"
              className=" custom-quill-editor mb-16"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Project Link
            </label>
            <input
              type="text"
              required
              value={project.link}
              onChange={(e) => onInputChange(project.id, "link", e.target.value)}
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="https://"
            />
          </div>
        </div>
      </form>
    </>
  );
};

AddProjects.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
}
export default AddProjects;
