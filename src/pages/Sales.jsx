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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { salesActions } from "../store/sales";
import SaleModal from "../components/Modals/SaleModal";

const Sales = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const sales = useSelector((state) => state.sales.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.getData());
    dispatch(salesActions.getData());
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

    const { _id, productId, quantity, price } = data;

    dispatch(
      uiActions.setModalData({
        _id,
        // Inside productId it will bring the info about the brand and categories
        productId,
        quantity,
        price,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(salesActions.deleteData(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 0.2,
      minWidth: 50,
    },
    { field: "product", headerName: "Product", flex: 1, minWidth: 150 },
    { field: "brand", headerName: "Brand", flex: 1, minWidth: 150 },
    { field: "category", headerName: "Category", flex: 1, minWidth: 150 },
    { field: "quantity", headerName: "Quantity", flex: 1, minWidth: 90 },
    { field: "price", headerName: "Price", flex: 0.5, minWidth: 100 },
    {
      field: "total_price",
      headerName: "Total price",
      flex: 0.5,
      minWidth: 100,
    },
    // Person who has created the sales
    { field: "owner", headerName: "Owner", flex: 0.5, minWidth: 100 },
    { field: "date", headerName: "Date", flex: 0.5, minWidth: 110 },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (params) => (
        <Stack direction="row" spacing={1} mt={1} alignItems={"center"}>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon sx={{ color: "orange" }} />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteOutlineIcon sx={{ color: "red" }} />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows = sales.map((item) => ({
    id: item._id,
    _id: item._id,
    product: item.productId.name,
    productId: item.productId._id,
    brand: item.brandId.name,
    brandId: item.brandId._id,
    // There is no rule how the structure of where is each thing located, it depends on the backend developer who has created
    // Initially the api is not senidng the following information, but it will be got later on, for taht reason it is needed to include the questions marks
    category: item?.productId?.categoryId?.name,
    categoryId: item?.productId?.categoryId?._id,
    quantity: item.quantity,
    price: item.price,
    // Using regex, it can be made more friendly the apparience of the number of total amount
    // For every 3 digits, it adds a coma
    total_price: item.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),
    owner: item.userId.username,
    date: item.createdAt,
  }));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Sales
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Sale
        </Button>
      </Stack>
      <Container maxWidth="xl">
        <DataGrid
          columns={columns}
          rows={rows}
          // slots to use nother component related to the DataGrid
          slots={{ toolbar: GridToolbar }}
          // disable to select the whole row, it is optional
          disableSelectionOnClick
          sx={{ bgcolor: "white" }}
        />
      </Container>
      <SaleModal open={open} closeModal={closeModal} edit={edit} />
    </Box>
  );
};

export default Sales;
