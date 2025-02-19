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
import { firmsActions } from "../store/firms";
import { purchasesActions } from "../store/purchases";
import PurchaseModal from "../components/Modals/PurchaseModal";

const Purchases = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const purchases = useSelector((state) => state.purchases.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.getData());
    dispatch(firmsActions.getData());
    dispatch(purchasesActions.getData());
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

    const { _id, productId, firmId, quantity, price } = data;

    dispatch(
      uiActions.setModalData({
        _id,
        productId,
        firmId,
        quantity,
        price,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(purchasesActions.deleteData(id));
  };

  const columns = [
    {
      field: "id",
      headerName: "#",
      flex: 0.2,
      minWidth: 50,
    },
    { field: "product", headerName: "Product", flex: 1, minWidth: 150 },
    { field: "firm", headerName: "Firm", flex: 1, minWidth: 150 },
    { field: "quantity", headerName: "Quantity", flex: 1, minWidth: 100 },
    { field: "price", headerName: "Price", flex: 0.5, minWidth: 100 },
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

  const rows = purchases.map((item) => ({
    id: item._id,
    _id: item._id,
    firm: item.firmId.name,
    firmId: item.firmId._id,
    product: item.productId.name,
    productId: item.productId._id,
    quantity: item.quantity,
    price: item.price,
  }));

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={5}>
        <Typography component="h1" variant="h5" color="inherit" noWrap>
          Purchases
        </Typography>
        <Button variant="contained" onClick={openModal}>
          New Purchase
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
      <PurchaseModal open={open} closeModal={closeModal} edit={edit} />
    </Box>
  );
};

export default Purchases;

