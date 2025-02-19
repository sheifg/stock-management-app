import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import PasswordForm from "../components/PasswordForm";
import { changePassword } from "../store/auth";
import { useDispatch } from "react-redux";

// For all the constants it is better to define outside the function, because maybe it is needed to change them  and it would make problems with the performance. The function will be rendered with every change inside of these constants, for that reason it is better to have them outside
const initialValues = {
  oldPassword: "",
  newPassword: "",
  newPassword2: "",
};

// They need to match with the initial values
const passwordLabels = [
  { label: "Old Password", name: "oldPassword" },
  { label: "New Password", name: "newPassword" },
  { label: "Confirm New Password", name: "newPassword2" },
];

const legendLabels = [
  "Password minimum 8 characters",
  "Password should include at least 1 number",
  "Password should include at least 1 lowercase character",
  "Password should include at least 1 uppercase character",
  "Password should include at least 1 special character",
];

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/[A-Z]+/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]+/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]+/, "Password must contain at least one number")
    .matches(
      /[^A-Za-z0-9]+/,
      "Password must contain at least one special character"
    )
    .required("New Password is required"),
  newPassword2: Yup.string()
    // The following line will check whether this new password is the same as the field newPassword
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm New Password is required"),
});

const Profile = () => {
  // If the data is dynamic, it is better to take the info from sessionStorage instead of the useSelector from Redux
  // It can be got the below information from session storage or from the redux store(useSelector())
  // It is known that these information are hard to change. So, it can be just used session storage
  // If there is a data and it is updated frequently, in tha case it is better to use redux
  const currentUser = sessionStorage.getItem("username");
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  const email = sessionStorage.getItem("email");

  // This const is depending from the variable above, for that reason they should keep inside of the function
  const userInfoLabels = [
    { label: "Username", value: currentUser },
    { label: "Email", value: email },
    { label: "First Name", value: firstName },
    { label: "Last Name", value: lastName },
  ];

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);
    const { newPassword } = values;
    dispatch(changePassword(newPassword));
    // reset the form after submitting
    actions.resetForm();
    // stop the form from submitting
    // when the user clicks the buttons
    // isSubmitting is a prop of Formik
    // this means there is a submit process started and will not allow to click the submit button again until that process is finished
    // if isSubmitting is not changed to true and if there is an error, it will not allow to click the submit button again
    actions.setSubmitting(false);
  };

  return (
    <Box p={6}>
      {/* variant style like h5 but component it renders as h1 */}
      <Typography variant="h5" component="h1" color="inherit" noWrap>
        Profile
      </Typography>
      {/* max width will be md around 900px */}
      <Container maxWidth="md">
        <Card variant="outlined">
          <CardContent>
            <Grid container>
              <Grid item xs={12} md={6}>
                {/* stack is flex */}
                {/* It is also possible to style directly the flex theme in the Avatar component*/}
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Avatar
                    src="broken"
                    alt={currentUser.toUpperCase()}
                    variant="square"
                    sx={{ width: 100, height: 100, fontSize: 50 }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <List dense>
                  {userInfoLabels.map((label) => (
                    <ListItem key={label.label}>
                      {/* primary is the content of ListItemText */}
                      <ListItemText
                        primary={
                          <Stack direction="row" justifyContent="space-between">
                            <Typography>{label.label}</Typography>
                            <Typography>{label.value}</Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} md={6} mt={3}>
                <Typography variant="subtitle2" color="red" textAlign="center">
                  Change password
                </Typography>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {/* If there is any validation error, it can be shown it here with a function */}
                  {/* touched used when the user click anything in the input but dont provide anything, to show an error */}
                  {({ errors, touched }) => (
                    <Form>
                      {passwordLabels.map((label) => (
                        // using PasswordForm component to use the adorment that we have created
                        <PasswordForm
                          key={label.name}
                          name={label.name}
                          label={label.label}
                          errors={errors}
                          touched={touched}
                        />
                      ))}
                      <Button
                        type="submit"
                        fullWidth
                        // contained is a blue button with white letters
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Change password
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Grid item xs={12} md={6} mt={3}>
                <Box m={3} mt={5}>
                  {legendLabels.map((label) => (
                    <Typography key={label} variant="body2" color="gray">
                      {label}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Profile;
