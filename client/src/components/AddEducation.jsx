import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEducation = ({ education, onInputChange }) => {
  return (
    <>
    <form className="p-4 bg-white rounded-lg shadow-sm space-y-8">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">School</label>
        <input
          type="text"
          className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
          placeholder="ABC School"
          value={education.school}
          onChange={(e) =>
            onInputChange(education.id, "school", e.target.value)
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Degree</label>
          <input
            type="text"
            required
            className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            placeholder="Bachelor's"
            value={education.degree}
            onChange={(e) =>
              onInputChange(education.id, "degree", e.target.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            required
            className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            placeholder="New York"
            value={education.city}
            onChange={(e) =>
              onInputChange(education.id, "city", e.target.value)
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Start Date</label>
          <DatePicker
            selected={education.startDate ? new Date(education.startDate) : null}
            onChange={(date) =>
              onInputChange(education.id, "startDate", date.toISOString().slice(0, 7))
            }
            dateFormat="yyyy-MM"
            showMonthYearPicker
            className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">End Date</label>
          <DatePicker
            selected={education.endDate ? new Date(education.endDate) : null}
            onChange={(date) =>
              onInputChange(education.id, "endDate", date.toISOString().slice(0, 7))
            }
            dateFormat="yyyy-MM"
            showMonthYearPicker
            className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            disabled={education.currentlyStudying}
          />
        </div>
        <div className="pt-4 flex items-center gap-1">
          <input
            type="checkbox"
            checked={education.currentlyStudying}
            onChange={(e) =>
              onInputChange(education.id, "currentlyStudying", e.target.checked)
            }
          />
          <label className="text-sm font-medium text-gray-700">
            I am currently studying here
          </label>
        </div>
      </div>
    </form>
    </>
  );
};

AddEducation.propTypes = {
  education: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default AddEducation;
