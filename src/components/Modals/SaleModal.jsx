import { useDispatch } from "react-redux";
import FormModal from "./FormModal";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui";
import { salesActions } from "../../store/sales";

const inputLabels = [
  {
    name: "productId",
    label: "Product",
    arrayName: "products",
  },
  {
    name: "quantity",
    label: "Quantity",
  },
  {
    name: "price",
    label: "Price",
  },
];

const initialState = {
  productId: "",
  quantity: "",
  price: "",
};

const SaleModal = ({ open, closeModal, edit }) => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.ui.modalData);

  const initialValues = edit ? modalData : initialState;

  const products = useSelector((state) => state.products.data);

  const arrayData = {
    products,
  };

  const handleSubmit = (values, actions) => {
    if (edit) {
      dispatch(salesActions.editData(values));
    } else {
      console.log("SaleModal values:", values);
      dispatch(salesActions.createData(values));
    }
    actions.resetForm();
    actions.setSubmitting(false);
    closeModal();
  };

  const handleClose = () => {
    dispatch(uiActions.setModalData({}));
    closeModal();
  };
   
  return (
    <FormModal
      open={open}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      inputLabels={inputLabels}
      title={edit ? "Edit Sale" : "New Sale"}
      arrayData={arrayData}
    />
  );
};

export default SaleModal;
