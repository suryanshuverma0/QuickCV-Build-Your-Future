import TemplateSelector from "../components/TemplateSelector";
import PropTypes from "prop-types";
const TemplateForm = ({onItemClick}) => {
  return (
    <div>
      <TemplateSelector onItemClick= {onItemClick}  />
    </div>
  )
}

TemplateForm.propTypes = {
  onItemClick: PropTypes.func.isRequired
}
export default TemplateForm
