import PropTypes from "prop-types";
import FormTitle from "../components/FormTitle";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useContext, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import AddSocialMedia from "../components/AddSocialMedia";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import ShowSocialMedia from "../components/ShowSocialMedia";
import { resumeAPI } from "../api/apiService";
const AboutForm = ({ onItemClick }) => {
  const { logout, decodedToken } = useContext(AuthContext);

  const [addSocialMedia, setAddSocialMedia] = useState([]);
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [aboutFormData, setAboutFormData] = useState({
    name: "",
    designation: "",
    address: "",
    city: "",
    email: "",
    phone: "",
    summary: "",
  });

  const fetchAboutFormDetails = async () => {
    try {
      const response = await resumeAPI.getAbout();
      const data = await response.data;
      console.log("hi i am data of about form please print me ", data);
      setAboutFormData({
        name: data[0].name,
        designation: data[0].designation,
        address: data[0].address,
        city: data[0].city,
        email: data[0].email,
        phone: data[0].phone,
        summary: data[0].summary,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getSocialMediaLinks = async () => {
    try {
      const response = await resumeAPI.getSocialMedia();

      const data = await response.data;
      setSocialMediaData(data);
      console.log("Social media links", data);
    } catch (error) {
      console.error(error);
    }
  };

    const handleDeleteSocialMedia = async (id) => {
    try {
      const response = await resumeAPI.deleteSocialMedia(id);

      if (response.status === 200) {
        setSocialMediaData((prev) => prev.filter((item) => item._id !== id));
        toast.success("Social media link deleted successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.error("Failed to delete social media link");
        toast.error("Failed to delete social media link", {
          position: "top-right",
          autoClose: 1000,  
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,  
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (decodedToken) {
      fetchAboutFormDetails();
      getSocialMediaLinks();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    setAboutFormData((prevData) => ({
      ...prevData,
      summary: value,
    }));
  };

  const handleAddSocialMedia = () => {
    setAddSocialMedia([
      ...addSocialMedia,
      { id: Date.now(), linkType: "", link: "" },
    ]);
  };

  const handleSocialMediaChange = (index, name, value) => {
    const updatedSocialMedia = [...addSocialMedia];
    updatedSocialMedia[index][name] = value;
    setAddSocialMedia(updatedSocialMedia);
  };

  const handleRemoveSocialMedia = (index) => {
    const updatedSocialMedia = addSocialMedia.filter((_, i) => i !== index);
    setAddSocialMedia(updatedSocialMedia);
  };

  const saveSocialMediaLinksToDatabase = async () => {
    try {
      const response = await resumeAPI.addSocialMedia({ addSocialMedia });
      const data = await response.data;
      console.log("Data from social media links", data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const socialLinks = {socialLinks: addSocialMedia }
      console.log("Form data to send:", aboutFormData);

      const response = await resumeAPI.addAbout(aboutFormData);

      const data = await response.data;
      console.log("data from that about form", data);
      console.log("response from that about form", response.status);

      saveSocialMediaLinksToDatabase();

      if (response.status === 201) {
        toast.success("Data saved successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setAddSocialMedia([]);
      } else if (response.status === 401) {
        toast.success("Data did not saved. Please try again!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          logout();
        }, 1000);
      } else if (response.status === 500) {
        toast.error("Internal server error!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (response.status === 200) {
        toast.success("Data updated successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.error("Error saving data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-[1000px] overflow-y-auto">
      <div className="pl-4">
        <FormTitle
          title="About yourself"
          description="Please complete the fields below with your primary information."
        />
      </div>

     
      <ul className="flex flex-col gap-3 items-center my-8">
  {socialMediaData &&
    socialMediaData.map((data) => {
      return (
        <ShowSocialMedia
          key={data._id}
          value={data}
          onDelete={handleDeleteSocialMedia}
        />
      );
    })}
</ul>

      <form
        className="p-4 bg-white rounded-lg shadow-sm space-y-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={aboutFormData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="designation"
              className="text-sm font-medium text-gray-700"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              required
              value={aboutFormData.designation}
              onChange={handleChange}
              placeholder="Web Developer"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={aboutFormData.address}
              onChange={handleChange}
              placeholder="123 Main St"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={aboutFormData.city}
              onChange={handleChange}
              placeholder="New York"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={aboutFormData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={aboutFormData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              className="mt-1 border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-2 focus:outline-gray-500 font-semibold"
            />
          </div>
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
            value={aboutFormData.summary}
            onChange={handleQuillChange}
            modules={{ toolbar: [["bold", "italic", "underline"], ["link"]] }}
            placeholder="Describe about yourself"
            className=" custom-quill-editor mb-16"
          />
        </div>

        <div className="mt-12 flex gap-8 flex-col">
          {addSocialMedia.map((social, index) => (
            <AddSocialMedia
              key={social.id}
              formData={social}
              onChange={(name, value) =>
                handleSocialMediaChange(index, name, value)
              }
              onRemove={() => handleRemoveSocialMedia(index)}
            />
          ))}
        </div>

        <div
          onClick={handleAddSocialMedia}
          className="flex items-center text-lg gap-2 text-blue-400 font-semibold cursor-pointer hover:underline"
        >
          <span>
            <IoIosAdd />
          </span>
          <p>Add Social Link</p>
        </div>

        <div className="flex justify-end items-center">
          <Button text="Save" type="submit" />
        </div>
      </form>

      <div className="flex justify-between items-center p-4">
        <button
          className="bg-white hover:bg-neutral-800 hover:text-white transition-colors delay-100 border-black border-2 text-black text-sm py-2 px-4 rounded"
          onClick={() => onItemClick("profileImage")}
        >
          Back
        </button>

        <button
          className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100"
          onClick={() => onItemClick("education")}
        >
          Continue to Education
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

AboutForm.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default AboutForm;
