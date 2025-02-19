import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
} from "@mui/material";
import style from "./style";
import { Field, Form, Formik } from "formik";
import ModalInput from "./ModalInput";
import { PropTypes } from "prop-types";

// If there is a lot styles, they can be defined outside and importing here
// It can be also created a className in app.css and use it here, but mui uses sx accept object, for that reason it is created the style file

// InputLabels: it is necessary to know for which form is used, how many input fields are needed

const FormModal = ({
  open,
  initialValues,
  handleSubmit,
  handleClose,
  inputLabels,
  title,
  arrayData,
}) => {
  return (
    <Modal open={open}>
      <Box sx={style}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            {inputLabels.map((item) => {
              // It is necessary to check whether input label has arrayName
              // If it does, it is needed to render a select input
              // If not, it is needed to render a text input
              return item.arrayName ? (
                <FormControl sx={{ width: "100%", mb: 2 }}>
                  <InputLabel>{item.label}</InputLabel>
                  <Field // Field from formik
                    as={Select} // but style as Select component from mui: drop-down menu
                    name={item.name}
                    label={item.label}
                    required
                    key={item.name}
                  >
                    {/* Here it is needed to map over the array to provide select options */}
                    {arrayData[item.arrayName].map((element) => (
                      <MenuItem key={element._id} value={element._id}>
                        {element.name}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              ) : (
                <ModalInput
                  key={item.name}
                  name={item.name}
                  label={item.label}
                />
              );
            })}
            {/* using desctructuring */}
            {/* {inputLabels.map(({name, label}) => (
              <ModalInput key={name} name={name} label={label} /> */}

            <Stack direction="row" justifyContent="space-between">
              <Button type="submit" variant="contained" size="large">
                {title}
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

FormModal.propTypes = {
  open: PropTypes.bool,
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  inputLabels: PropTypes.array,
  title: PropTypes.string,
  arrayData: PropTypes.object,
};

export default FormModal;
