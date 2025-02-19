import { TextField } from "@mui/material";
import { Field } from "formik";
import { PropTypes } from "prop-types";

const ModalInput = ({ name, label }) => {
  console.log(name, label);
  return (
    <Field // Funcionality as Field from formik
      type="text"
      name={name}
      label={label}
      variant="outlined"
      required
      as={TextField} // Style as TextField from mui
      fullWidth
      sx={{ mb: 2 }}
    />
  );
};
ModalInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default ModalInput;
