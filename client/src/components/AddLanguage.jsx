import PropTypes from "prop-types";
const AddLanguage = ({onInputChange, language}) => {
  return (
    <>
      <form>
        <div className=" p-4 bg-white rounded-lg shadow-sm space-y-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Language
            </label>
            <input
              type="text"
              name="language"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="English"
              required
              value={language.language}
              onChange={(e)=>{onInputChange(language.id , "language", e.target.value)}}
            />
          </div>
        </div>
      </form>
    </>
  );
};

AddLanguage.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  language: PropTypes.object.isRequired,
}
export default AddLanguage;
