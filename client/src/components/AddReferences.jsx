const AddReferences = () => {
  return (
    <>
      <form>
        <div className="p-4 bg-white rounded-lg shadow-sm space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="John Doe"
            />
          </div>

          {/* Company Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="ABC Corp"
            />
          </div>

          {/* Designation Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="Software Engineer"
            />
          </div>

          {/* Phone Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="+1 234 567 890"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
              placeholder="example@email.com"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddReferences;
