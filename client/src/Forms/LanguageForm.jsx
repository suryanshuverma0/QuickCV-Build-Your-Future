import PropTypes from "prop-types";
import FormTitle from "../components/FormTitle";
import { IoIosAdd } from "react-icons/io";
import { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import { AiOutlineDelete } from "react-icons/ai";
import ShowLanguage from "../components/ShowLanguage";
import AddLanguage from "../components/AddLanguage";
import { resumeAPI } from "../api/apiService";

const LanguageForm = ({ onItemClick }) => {
  const [languages, setLanguages] = useState([
    {
      id: Date.now(),
      language: "",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false)
  const [languageIdToUpdate , setLanguageIdToUpdate] = useState(null);
  const [langaugeData, setLanguageData] = useState([]);
  
  const { logout, decodedToken } = useContext(AuthContext);


  const fetchLanguageData = async () => {
    try {
      const response = await resumeAPI.getLanguages();

      if (!response.status === 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.data;
      console.log("I am data that you fetched from backend languages", data);
      setLanguageData(data);
      console.log("I am language data", langaugeData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const getLanguage = async (id) => {
    try {
      const response = await resumeAPI.getLanguageDetail(id);
      if (!response.status === 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.data;
      setLanguages([
        {
          language: data.language,
        },
      ]);
      setLanguageIdToUpdate(data._id)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const updateLanguageDetail = async () => {
    try {
      const response = await resumeAPI.updateLanguage(languageIdToUpdate, languages[0]);

      if (!response.status === 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.data;
      setIsEditing(false);
      if(response.status === 200) {
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
      }else if(response.status === 401){
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
      }
      setLanguages([
        {
          id: Date.now(),
          language: ""
        }
      ])
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLanguageData = async (id) => {
try {
  const response = await resumeAPI.deleteLanguage(id);

  if (!response.status === 200) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.data;
  console.log("I am data that you fetched from backend experience", data);
  if (response.status === 200) {
    toast.success("Data deleted successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  } else if (response.status === 401) {
    toast.error("Data did not delete. Please try again!", {
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
  }
} catch (error) {
  console.log(error);
}
  }

  useEffect(() => {
    if (decodedToken) {
      fetchLanguageData();
    }
  }, []);

  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      {
        id: Date.now(),
        language: "",
      },
    ]);
  };

  const handleInputChange = (id, field, value) => {
    setLanguages((prevLangauge) =>
      prevLangauge.map((language) =>
        language.id === id ? { ...language, [field]: value } : language
      )
    );
  };

  const handleDeleteLanguage = (id) => {
    setLanguages((prevLangauge) =>
      prevLangauge.filter((skill) => skill.id !== id)
    );
  };

  const handleSave = async () => {
    console.log("language data to send in backend", languages);

    try {
  const response = await resumeAPI.addLanguage({languages});
      const data = await response.setLanguageData;
      console.log("data from that education form", data);
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
        setLanguages([
          {
            id: Date.now(),
            language: "",
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
      } else {
        toast.error("Error saving data", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error("Error saving data");
      }
      console.log("I am data of education", data);
      console.log("Saving educations:", languages);
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
            title="Languages"
            description="Include languages you are fluent in."
          />
        </div>

        <ul className="flex flex-col gap-3 items-center">
          {langaugeData &&
            langaugeData.map((data) => {
              return (
                <ShowLanguage
                  key={data._id}
                  value={data}
                  onEdit={getLanguage}
                  setIsEditing = {setIsEditing}
                  onDelete = {deleteLanguageData}
                />
              );
            })}
        </ul>

        <div className="mt-8">
          {languages.map((language) => (
            <div key={language.id} className="relative">
              <AddLanguage
                language={language}
                onInputChange={handleInputChange}
              />
              <button
                onClick={() => handleDeleteLanguage(language.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                aria-label="Delete education"
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          ))}
        </div>
        <div
          onClick={handleAddLanguage}
          className="mt-8 flex items-center text-lg gap-2 text-blue-400 font-semibold cursor-pointer hover:underline"
        >
          <span>
            <IoIosAdd />
          </span>
          <p>Add Language</p>
        </div>

        <div className="m-8 flex justify-end">
          <Button text={isEditing ? "Update" : "Save"} type="button" onClick={isEditing ? () => updateLanguageDetail(): ()=> handleSave()} />
        </div>

        <div className="flex justify-between items-center p-4 my-4">
          <button
            className="bg-white hover:bg-neutral-800 hover:text-white transition-colors delay-100 border-black border-2 text-black text-sm py-2 px-4 rounded"
            onClick={() => onItemClick("achievements")}
          >
            Back
          </button>

          <button
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100"
            onClick={() => onItemClick("references")}
          >
            Continue to References
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
LanguageForm.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};
export default LanguageForm;
