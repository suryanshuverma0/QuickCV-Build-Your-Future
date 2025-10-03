import PropTypes from "prop-types";
import FormTitle from "../components/FormTitle";
import { IoIosAdd } from "react-icons/io";
import { useState, useContext, useEffect } from "react";
import AddReferences from "../components/AddReferences";
import { AuthContext } from "../contexts/AuthContext";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import ShowReferences from "../components/ShowReferences";
const ReferenceForm = ({ onItemClick }) => {
  const [references, setReferences] = useState([
    {
      id: Date.now(),
      name: "",
      company: "",
      designation: "",
      phone: "",
      email: "",
    },
  ]);
  const { logout, decodedToken } = useContext(AuthContext);

  const [referenceData, setReferenceData] = useState([]);

  const [referenceIdToUpdate, setReferenceIdToUpdate] = useState(null);

  const fetchProjectData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/get-reference-form-details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.status === 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("I am data that you fetched from backend projects", data);
      setReferenceData(data);
      console.log("I am project data", referenceData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getReferenceData = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/get-reference-data/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      setReferences([
        {
          name: data.name,
          company: data.company,
          designation: data.designation,
          phone: data.phone,
          email: data.email,
        },
      ]);

      // setReferenceIdToUpdate(data._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (decodedToken) {
      fetchProjectData();
    }
  }, []);

  const handleAddReference = () => {
    setReferences([
      ...references,
      {
        id: Date.now(),
        name: "",
        company: "",
        designation: "",
        phone: "",
        email: "",
      },
    ]);
  };

  const handleInputChange = (id, field, value) => {
    setReferences((prevReferences) =>
      prevReferences.map((reference) =>
        reference.id === id ? { ...reference, [field]: value } : reference
      )
    );
  };

  const handleDeleteReferences = (id) => {
    setReferences((prevReferences) =>
      prevReferences.filter((reference) => reference.id !== id)
    );
  };

  const handleSave = async () => {
    if (references.length === 0) {
      toast.error("Please add references to save!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    console.log("projects", references);
    try {
      const response = await fetch(
        "http://localhost:3000/api/create-reference-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ references }),
        }
      );

      const data = await response.json();
      console.log("data from that projects form", data);
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
        setReferences([
          {
            id: Date.now(),
            name: "",
            company: "",
            designation: "",
            phone: "",
            email: "",
          },
        ]);
      } else if (response.status === 401) {
        toast.error("Data did not save. Please try again!", {
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
      } else {
        toast.error("Error saving data!", {
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
      console.error("Error saving data:", error);
      toast.error("Error saving data!", {
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
  };
  return (
    <>
      <div className="h-[1000px] overflow-y-auto">
        <div className="pl-4">
          <FormTitle
            title="References"
            description="Add references including name, company, and contact details."
          />
        </div>

        <ul className="flex flex-col gap-3 items-center">
          {referenceData &&
            referenceData.map((data) => {
              return (
                <ShowReferences
                  key={data._id}
                  value={data}
                  onEdit={getReferenceData}
                />
              );
            })}
        </ul>

        <div className="mt-8">
          {references.map((reference) => (
            <div key={reference.id} className="relative">
              <AddReferences
                reference={reference}
                onInputChange={handleInputChange}
              />
              <button
                onClick={() => handleDeleteReferences(reference.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                aria-label="Delete "
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          ))}
        </div>

        <div
          onClick={handleAddReference}
          className="mt-8 flex items-center text-lg gap-2 text-blue-400 font-semibold cursor-pointer hover:underline"
        >
          <span>
            <IoIosAdd />
          </span>
          <p>Add Reference</p>
        </div>

        <div className="m-8 flex justify-end">
          <Button text="Save" type="button" onClick={handleSave} />
        </div>

        <div className="flex justify-between items-center p-4 my-4">
          <button
            className="bg-white hover:bg-neutral-800 hover:text-white transition-colors delay-100 border-black border-2 text-black text-sm py-2 px-4 rounded"
            onClick={() => onItemClick("language")}
          >
            Back
          </button>

          <button
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100"
            onClick={() => onItemClick("share")}
          >
            Continue to Share CV
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

ReferenceForm.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default ReferenceForm;
