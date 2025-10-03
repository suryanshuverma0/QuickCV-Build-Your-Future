import PropTypes from "prop-types";

const AddSkills = ({onInputChange, skill}) => {
  return (
    <>
      <form className="py-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Skills</label>
            <input
              type="text"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="e.g. Python, React, Node.js"
              required
              value={skill.skill}
              name="skill"
              onChange={(e) => onInputChange(skill.id, "skill", e.target.value)}
            />
          </div>
          <div className="col-span-5 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Level of Proficiency
            </label>
            <select
              value={skill.level}
              onChange={(e) =>  onInputChange(skill.id, "level", e.target.value)}
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Beginner">Beginners</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Proficient">Proficient</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

        </div>
      </form>
    </>
  );
};
AddSkills.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  skill: PropTypes.object.isRequired,
};

export default AddSkills;
