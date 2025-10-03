import PropTypes from "prop-types"
const FormTitle = ({title, description}) => {
  return (
    <>
     <div className="flex flex-col gpa-2 items-start px-2 pb-8 pt-4 w-full">
         <h1 className="font-bold text-blue-400 text-4xl">{title} </h1>
         <p className="font-semibold text-md">{description}</p>
         </div> 
    </>
  )
}
FormTitle.propTypes = {
         title: PropTypes.string.isRequired,
         description: PropTypes.string.isRequired,
}

export default FormTitle
