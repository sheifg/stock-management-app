import { useDispatch } from "react-redux";
import FormModal from "./FormModal";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui";
import { productsActions } from "../../store/products";
import { PropTypes } from "prop-types";

const inputLabels = [
  {
    name: "name",
    label: " Product name",
  },
  {
    name: "categoryId",
    label: "Category",
    arrayName: "categories",
  },
  {
    name: "brandId",
    label: "Brand",
    arrayName: "brands",
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
  name: "",
  categoryId: "",
  brandId: "",
  quantity: "",
  price: "",
};

const ProductModal = ({ open, closeModal, edit }) => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.ui.modalData);

  const initialValues = edit ? modalData : initialState;

  const brands = useSelector((state) => state.brands.data);
  const categories = useSelector((state) => state.categories.data);

  //! If the "dispatch(brandsActions.getData());" and "dispatch(categoriesActions.getData());" inside the useEffect in Product.jsx component to get all the data from categories and brands,
  //! it will be got an empty value for brands and categories here, because yit will be just had the initial values, that they are "" empty values

  // Inside the modal form for Products, there are two dropdwon menu, which include all the categories and all brands, so it is had to define before and take the data with useSelector from the store
  const arrayData = {
    categories,
    brands,
  };

  const handleSubmit = (values, actions) => {
    if (edit) {
      dispatch(productsActions.editData(values));
    } else {
      dispatch(productsActions.createData(values));
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
      title={edit ? "Edit Product" : "New Product"}
      arrayData={arrayData}
    />
  );
};

ProductModal.propTypes = {
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  edit: PropTypes.bool,
};

export default ProductModal;
