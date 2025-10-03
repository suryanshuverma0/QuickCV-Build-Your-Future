// // // ShareForm.js
// // import { useTemplate } from "../contexts/TemplateContext";
// // import FormTitle from "../components/FormTitle";

// // const ShareForm = () => {
// //   const { selectedTemplate, updateTemplate, templates } = useTemplate();
// //   const SelectedTemplateComponent = selectedTemplate?.component || null;

// //   const handleTemplateChange = (event) => {
// //     const selectedTemplateName = event.target.value;
// //     const newTemplate = templates.find((template) => template.name === selectedTemplateName);
// //     if (newTemplate) {
// //       updateTemplate(newTemplate);
// //     }
// //   };

// //   return (
// //     <div className="max-w-6xl  mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
// //       <FormTitle title="Share Your Resume" description="Share your resume among friends"/>

// //       <div className="mb-4">
// //         <label className="block text-gray-700">Select Template</label>
// //         <select
// //           onChange={handleTemplateChange}
// //           value={selectedTemplate?.name || ""}
// //           className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //         >
// //           <option value="" disabled>Select Template</option>
// //           {templates.map((template) => (
// //             <option key={template.id} value={template.name}>
// //               {template.name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       <div className="mb-6">
// //         <h3 className="text-xl font-semibold mb-4">Preview</h3>
// //         <div className="border p-6 rounded-lg bg-gray-50">
// //           {SelectedTemplateComponent ? <SelectedTemplateComponent /> : <p>No template selected.</p>}
// //         </div>
// //       </div>

// //           <button className=" bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100" >Share</button>
// //     </div>
// //   );
// // };

// // export default ShareForm;


// // // import { useTemplate } from "../contexts/TemplateContext";
// // // import FormTitle from "../components/FormTitle";


// // // const ShareForm = () => {
// // //   const { selectedTemplate, updateTemplate, templates } = useTemplate();
// // //   const SelectedTemplateComponent = selectedTemplate?.component || null;



// // //   const handleTemplateChange = (event) => {
// // //     const selectedTemplateName = event.target.value;
// // //     const newTemplate = templates.find((template) => template.name === selectedTemplateName);
// // //     if (newTemplate) {
// // //       updateTemplate(newTemplate);
// // //     }
// // //   };



// // //   return (
// // //     <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
// // //       <FormTitle title="Share Your Resume" description="Share your resume among friends" />

// // //       <div className="mb-4">
// // //         <label className="block text-gray-700">Select Template</label>
// // //         <select
// // //           onChange={handleTemplateChange}
// // //           value={selectedTemplate?.name || ""}
// // //           className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //         >
// // //           <option value="" disabled>Select Template</option>
// // //           {templates.map((template) => (
// // //             <option key={template.id} value={template.name}>
// // //               {template.name}
// // //             </option>
// // //           ))}
// // //         </select>
// // //       </div>

// // //       <div className="mb-6">
// // //         <h3 className="text-xl font-semibold mb-4">Preview</h3>
// // //         <div className="border p-6 rounded-lg bg-gray-50">
// // //           {SelectedTemplateComponent ? <SelectedTemplateComponent /> : <p>No template selected.</p>}
// // //         </div>
// // //       </div>


// // //     </div>
// // //   );
// // // };

// // // export default ShareForm;



// import { useTemplate } from "../contexts/TemplateContext";
// import FormTitle from "../components/FormTitle";

// const ShareForm = () => {
//   const { selectedTemplate, updateTemplate, templates } = useTemplate();
//   const SelectedTemplateComponent = selectedTemplate?.component;

//   const handleTemplateChange = (event) => {
//     const selectedTemplateId = parseInt(event.target.value); // Use ID for reliability
//     const newTemplate = templates.find(template => template.id === selectedTemplateId);
//     if (newTemplate) updateTemplate(newTemplate);
//   };

//   return (
//     <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
//       <FormTitle title="Share Your Resume" description="Share your resume among friends" />

//       <div className="mb-4">
//         <label className="block text-gray-700">Select Template</label>
//         <select
//           onChange={handleTemplateChange}
//           value={selectedTemplate?.id || ""}
//           className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           <option value="" disabled>Select Template</option>
//           {templates.map((template) => (
//             <option key={template.id} value={template.id}>
//               {template.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-6">
//         <h3 className="text-xl font-semibold mb-4">Preview</h3>
//         <div className="border p-6 rounded-lg bg-gray-50">
//           {SelectedTemplateComponent ? (
//             <SelectedTemplateComponent key={selectedTemplate.id} />
//           ) : (
//             <p>No template selected.</p>
//           )}
//         </div>
//       </div>

//       <button className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100">
//         Share
//       </button>
//     </div>
//   );
// };

// export default ShareForm;


import { useRef } from "react";
import { useTemplate } from "../contexts/TemplateContext";
import FormTitle from "../components/FormTitle";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ShareForm = () => {
  const { selectedTemplate, updateTemplate, templates } = useTemplate();
  const SelectedTemplateComponent = selectedTemplate?.component;
  const resumeRef = useRef();

  const handleTemplateChange = (event) => {
    const selectedTemplateId = parseInt(event.target.value);
    const newTemplate = templates.find((template) => template.id === selectedTemplateId);
    if (newTemplate) updateTemplate(newTemplate);
  };

  // 📥 Download as full-page PDF
  const handleDownload = async () => {
    if (!resumeRef.current) return;

    const element = resumeRef.current;

    const canvas = await html2canvas(element, {
      scale: 2, // sharpness
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // PDF in A4
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm

    // Scale image to fit A4 exactly
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

    pdf.save(`${selectedTemplate?.name || "resume"}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <FormTitle title="Export Resume" description="Preview and download your resume as PDF" />

      <div className="mb-4">
        <label className="block text-gray-700">Select Template</label>
        <select
          onChange={handleTemplateChange}
          value={selectedTemplate?.id || ""}
          className="mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>
            Select Template
          </option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* FULLSCREEN RESUME PREVIEW */}
      <div className="flex justify-center my-8">
        <div
          ref={resumeRef}
          className="resume-page shadow-lg"
        >
          {SelectedTemplateComponent ? (
            <SelectedTemplateComponent key={selectedTemplate.id} />
          ) : (
            <p>No template selected.</p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-6 rounded transition-colors delay-100"
        >
          Download Full Resume PDF
        </button>
      </div>
    </div>
  );
};

export default ShareForm;
