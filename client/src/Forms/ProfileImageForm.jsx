import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import FormTitle from "../components/FormTitle";
import Button from "../components/Button";
import PropTypes from "prop-types";
import { profileImageAPI } from "../api/apiService"; 

const ProfileImageForm = ({ onItemClick }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [currentImage, setCurrentImage] = useState(null);

  // Fetch current profile image
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const { data } = await profileImageAPI.getImage();
        if (data?.imageUrl) {
          setCurrentImage(data.imageUrl);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfileImage();
  }, []);

  // Handle file input
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
        toast.error("Only JPEG, PNG, and WebP images are allowed");
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Upload image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Please select an image");
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const { data } = await profileImageAPI.uploadImage(formData);
      setCurrentImage(data.imageUrl);
      toast.success("Profile image uploaded successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      setSelectedImage(null);
      setPreviewUrl("");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.response?.data?.message || "Error uploading image");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete image
  const handleDelete = async () => {
    if (!currentImage) return;
    try {
      await profileImageAPI.deleteImage();
      setCurrentImage(null);
      toast.success("");
      toast.success("Profile image deleted successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(error.response?.data?.message || "Error deleting image");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <FormTitle title="Profile Image" />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current or Preview Image */}
        <div className="flex justify-center">
          {(previewUrl || currentImage) && (
            <div className="relative">
              <img
                src={previewUrl || currentImage}
                alt="Profile preview"
                className="w-48 h-48 object-cover rounded-full"
              />
              {currentImage && !previewUrl && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* File Input */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500">
            Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP
          </p>
        </div>

        <div className="flex justify-end items-center">
          <Button text={isLoading ? "Saving..." : "Save"} type="submit" />
        </div>
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          className="bg-white hover:bg-neutral-800 hover:text-white transition-colors delay-100 border-black border-2 text-black text-sm py-2 px-4 rounded"
          onClick={() => onItemClick("template")}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100"
          onClick={() => onItemClick("about")}
        >
          Continue to About
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

ProfileImageForm.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default ProfileImageForm;
