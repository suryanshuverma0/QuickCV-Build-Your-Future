import Sidebar from "../components/Sidebar";
import Form from "../components/Form";
import { useState } from "react";
const Dashboard = () => {
  const [activeForm, setActiveForm] = useState(null);
  const handleSidebarClick = (formType) => {
    setActiveForm(formType);
  };
  return (
    <>
     <div className="flex justify-center items-center flex-col gap-2 ">
     <div className="pt-4">
        <div className="">
          <Sidebar onItemClick={handleSidebarClick} />
        </div>
        <div className="flex justify-center items-center w-full">
          <Form activeForm={activeForm} onItemClick={handleSidebarClick} />
        </div>
      </div>
         </div> 
    </>
  )
}

export default Dashboard
