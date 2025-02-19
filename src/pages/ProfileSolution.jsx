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
import { useDispatch } from "react-redux";
import { changePassword } from "../store/auth";

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

const initialValues = {
  oldPassword: "",
  newPassword: "",
  newPassword2: "",
};

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
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm New Password is required"),
});

const ProfileSolution = () => {
  const currentUser = sessionStorage.getItem("username");
  const firstName = sessionStorage.getItem("firstName");
  const lastName = sessionStorage.getItem("lastName");
  const email = sessionStorage.getItem("email");

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
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <Box p={5}>
      <Typography variant="h5" component="h1" color="inherit" noWrap>
        Profile
      </Typography>
      <Container maxWidth="md">
        <Card variant="outlined">
          <CardContent>
            <Grid container>
              <Grid item xs={12} md={6}>
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
                <List>
                  {userInfoLabels.map((label) => (
                    <ListItem key={label.label}>
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
                  Change Password
                </Typography>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      {passwordLabels.map((label) => (
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
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Change Password
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Grid>
              <Grid item xs={12} md={6} mt={3}>
                <Box m={3}>
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

export default ProfileSolution;
