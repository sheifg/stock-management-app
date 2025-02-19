import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Field } from "formik";
import PropTypes from "prop-types";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const PasswordForm = ({ name, label, errors, touched }) => {
  // Define a state to show the password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field
      as={TextField}
      // It is necessary to make conditional that part
      type={showPassword ? "text" : "password"}
      name={name}
      fullWidth
      label={label}
      required
      margin="dense"
      error={Boolean(errors[name]) && touched[name]}
      helperText={touched[name] ? errors[name] : ""}
      // Add adornment
      // To use the adornments, it is necessary to use InputProps
      InputProps={{
        // It is necessary to decide where to put the icon: start or end
        // To position the icon it can be used startAdornments and the icon will be at the start of the input at the end, like here
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              // Whenever the icon is clicked, it is necessary to change the state with the opposite value
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {/* Depending on the value of the state it will be displayed an Icon */}
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

PasswordForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default PasswordForm;
