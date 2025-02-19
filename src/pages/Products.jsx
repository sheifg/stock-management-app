import { useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui";
import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { productsActions } from "../store/products";
import ProductModal from "../components/Modals/ProductModal";
import { brandsActions } from "../store/brands";
import { categoriesActions } from "../store/categories";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  //! Making input editable in the table, it is necessary a state to update the value
  // NOTE: when it is wanted to update automatically when something is changed, the best option is to use useState
  const [editingRowId, setEditingRowId] = useState(null);

  const products = useSelector((state) => state.products.data);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.getData());
    // It is also needed to get the data for brands and categories, because when it is wantedt to show the drop-down menu with both in the modal component,
    // if it is not got the data here, the initial values will be emptys andit could not see any options in the drop dpwn menu
    dispatch(brandsActions.getData());
    dispatch(categoriesActions.getData());
  }, []);

  const closeModal = () => {
    setOpen(false);
    setEdit(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleEdit = (data) => {
    setEdit(true);
    setOpen(true);

    //! Here it is better to remove unnecessary data before sending to the API
    // It willbe sent to the API just the necessary/required information, using destructuring in data
    const { _id, name, brandId, categoryId, quantity, price } = data;

    dispatch(
      uiActions.setModalData({
        _id,
        name,
        brandId,
        categoryId,
        quantity,
        price,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(productsActions.deleteData(id));
  };

  //! Making editable the input. Function when the editing starts
  const handleCellEditStart = (params) => {
    // It is necessary to know which row is being edited
    setEditingRowId(params.id);
  };

  //! Making editable the input. Function when the editing finishs
  const handleCellEditStop = () => {
    setEditingRowId(null);
  };

  //! Saving the editable input in the table
  const handleSave = (data) => {
    const { _id, name, quantity, price } = data;

    dispatch(
      productsActions.editData({
        _id,
        name,
        quantity,
        price,
      })
    );
  };

  // https://mui.com/x/react-data-grid/column-definition/
  // First field should be id, that is always mandatory
  // Rest fields: it is better to have the same name as in Postman
  const columns = [
    // 1- It can be defined with width
    // {
    //   field: 'id',
    //   headerName: '#',
    //   width: 100,
    // },
    // {
    //   field: 'name',
    //   headerName: 'Name',
    //   width: 250,
    // },

    // 2- It can be defined with flex and minWidth
    {
      field: "id",
      headerName: "#",
      // flex is defining the max
      // it will not occupy the whole space, just the 0.2 from the complete space
      // ( In that case will be 4.2(0.2 + 1 + 1 + 1 + 0.5 + 0.5), for a screen that the width is 600px, it will be: 600/4,2 = 150px)
      // https://mui.com/x/api/data-grid/grid-col-def/#grid-col-def-prop-flex
      flex: 0.2,
      minWidth: 50,
    },

    //! Making editable name, quantity and price
    //! include -> editable: true,
    //! also it is had to use state to update the value
    //! const [editingRowId, setEditingRowId] = useState(null);
    //! It is also needed to handle the cell edit start and cell edit stop, in the DataGrid Component
    {
      // name as in Postman
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      //! Make the input editable, it is a input features
      editable: true,
    },
    { field: "category", headerName: "Category", flex: 1, minWidth: 150 },
    { field: "brand", headerName: "Brand", flex: 1, minWidth: 150 },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      minWidth: 100,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      minWidth: 100,
      editable: true,
    },
    // It is also wanted to include some icons
    // When it is wanted to render something, it is had to use Actions
    // rendercell is a function that it takes something called params, it can be used any name and returns jsx code
    {
      field: "action",
      headerName: "Actions",
      // https://mui.com/x/api/data-grid/grid-cell-params/#grid-cell-params-prop-row
      // params is a special parameteres used for the renderCell, there are more properties than rows, but it is the most used
      renderCell: (params) => (
        <Stack direction="row" spacing={1} mt={1} alignItems={"center"}>
          {/* To add the icon to edit the input in the table and save it. It is necessary to check if the input in row is being edited or not (editingRowId from the state) */}
          {editingRowId === params.row.id ? (
            //! Saving the editable input in the table
            <IconButton onClick={() => handleSave(params.row)}>
              <SaveIcon sx={{ color: "green" }} />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={() => handleEdit(params.row)}>
                <EditIcon sx={{ color: "goldenrod" }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.row.id)}>
                <DeleteOutlineIcon sx={{ color: "red" }} />
              </IconButton>
            </>
          )}
        </Stack>
      ),
    },
  ];

  // https://mui.com/x/react-data-grid/row-definition/
  // The names here should be mattched with the name in the field for the columns
  // Some names are needed for the table and some name are needed for the API
  const rows = products.map((item) => ({
    id: item._id, //! needed for the table, but unnecesaary information for the API
    _id: item._id, // needed for the API to dientify
    name: item.name,
    category: item.categoryId.name, //! needed for the table, but unnecesaary information for the API
    categoryId: item.categoryId._id, // needed for the API to identify which category is selected
    brand: item.brandId.name, // !needed for the table, but unnecesaary information for the API
    brandId: item.brandId._id, // needed for the API to identify which brand is selected
    quantity: item.quantity,
    price: item.price,
  }));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Products
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Product
        </Button>
      </Stack>
      <Container maxWidth="xl">
        <DataGrid
          columns={columns}
          rows={rows}
          // slots to use other component related to the DataGrid
          // toolbar: GridToolbar to add the toolbar with elements columns, filters, density and export
          slots={{ toolbar: GridToolbar }}
          // disable to select the whole row, it is optional
          disableSelectionOnClick
          //! Making the input in table editable
          onCellEditStart={handleCellEditStart}
          onCellEditStop={handleCellEditStop}
        />
      </Container>
      <ProductModal open={open} closeModal={closeModal} edit={edit} />
    </Box>
  );
};

export default Products;
