import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { categoriesActions } from "../store/categories";
import { useState } from "react";
import CategoryModal from "../components/Modals/CategoryModal";
import { uiActions } from "../store/ui";

const Categories = () => {
  // Defining state for the open the modal and edit
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  // Way-2: using state and props
  // It will be necesary to create state in each pages that it is needed to use it
  // Way-1: using dispatch(setModalData) -> It will be the best way to do it
  // const [modalValues, setModalValues] = useState({});

  const categories = useSelector((state) => state.categories.data);
  const dispatch = useDispatch();

  // When this page is loaded, it is necessary to get all the categories from the server
  useEffect(() => {
    dispatch(categoriesActions.getData());
  }, []);

  // Modal will be used for add and edit, so for that reason it is needed to set false the edit, to avoid showing the previous info in the modal
  const closeModal = () => {
    // Set everything as initial values
    setOpen(false);
    setEdit(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleEdit = (category) => {
    console.log("handleData category info: ", category);
    setEdit(true);
    setOpen(true);
    // it is necessary to pass the data to the modal that it is wanted to update
    // There are 2 different methods:

    // 1. dispatch(setModalData)
    dispatch(uiActions.setModalData(category));

    // 2. setModalValues
    // setModalValues(category);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        {/* For search engine optimization is better to have at least one h1 in the pages. For that reason it is being used componet as h1, but it is wanted the style as h5(variant) */}
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Categories
        </Typography>
        {/* contained make the button blue and leeters white */}
        <Button variant="contained" onClick={openModal}>
          New category
        </Button>
      </Stack>
      {/* mui table https://mui.com/material-ui/react-table/#basic-table */}
      <Container maxWidth="lg">
        <TableContainer component={Paper} sx={{ alignItems: "center" }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* # is used to represent the index, in that case the ids */}
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Number of Products</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category._id}>
                  <TableCell align="center">{category._id}</TableCell>
                  <TableCell align="center">{category.name}</TableCell>
                  <TableCell align="center">{category.productCount}</TableCell>
                  {console.log("Number of products: ", category.productCount)}
                  <TableCell align="center">
                    <EditIcon
                      sx={{ color: "goldenrod", cursor: "pointer", mx: 1 }}
                      onClick={() => handleEdit(category)}
                    />
                    <DeleteOutlineIcon
                      sx={{ color: "red", cursor: "pointer", mx: 1 }}
                      onClick={
                        () =>
                          dispatch(categoriesActions.deleteData(category._id))
                        // category._id is getting from useEffect(), when all the categories are received, when the page is loaded
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CategoryModal
          open={open}
          closeModal={closeModal}
          edit={edit}
          // Using way-2 it is needed to pass this state as a prop
          // modalValues={modalValues}
        />
      </Container>
    </Box>
  );
};

export default Categories;




// mock data (data from Postman) to check if everything is working
// The data should containt always id, because using index is dangerous, because it can change any time
// const categories = [
//   {
//     _id: '65343222b67e9681f937f201',
//     name: 'FOOD',
//     createdAt: '2024-08-30T09:39:21.255Z',
//     updatedAt: '2024-08-30T09:39:21.255Z',
//     __v: 0,
//   },
//   {
//     _id: '65343222b67e9681f937f202',
//     name: 'DRINK',
//     createdAt: '2024-08-30T09:39:21.258Z',
//     updatedAt: '2024-08-30T09:39:21.258Z',
//     __v: 0,
//   },
//   {
//     _id: '65343222b67e9681f937f203',
//     name: 'JEWELERY',
//     createdAt: '2024-08-30T09:39:21.259Z',
//     updatedAt: '2024-08-30T09:39:21.259Z',
//     __v: 0,
//   },
//   {
//     _id: '65343222b67e9681f937f204',
//     name: 'ELECTRONIC',
//     createdAt: '2024-08-30T09:39:21.262Z',
//     updatedAt: '2024-08-30T09:39:21.262Z',
//     __v: 0,
//   },
// ];