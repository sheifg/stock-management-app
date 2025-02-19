import { useDispatch } from 'react-redux';
import FormModal from './FormModal';
import { useSelector } from 'react-redux';
import { uiActions } from '../../store/ui';
import { purchasesActions } from '../../store/purchases';

const inputLabels = [
  {
    name: 'firmId',
    label: 'Firm',
    arrayName: "firms",
  },
  {
    name: 'productId',
    label: 'Product',
    arrayName: "products",
  },
  {
    name: 'quantity',
    label: 'Quantity',
  },
  {
    name: 'price',
    label: 'Price',
  },
];

const initialState = {
    firmId: '',
    productId: '',
    quantity: '',
    price: '',
};

const PurchaseModal = ({ open, closeModal, edit}) => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.ui.modalData);

  const initialValues = edit ? modalData : initialState;

  const firms = useSelector((state) => state.firms.data);
  const products = useSelector((state) => state.products.data);

// Inside the modal form for Products, there are two dropdwon menu, which include all the categories and all brands, so it is had to define before and take the data with useSelector from the store
  const arrayData = {
    firms,
    products,
  };

  const handleSubmit = (values, actions) => {
    if (edit) {
      dispatch(purchasesActions.editData(values));
    } else {
      dispatch(purchasesActions.createData(values));
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
      title={edit ? 'Edit Purchse' : 'New Purchase'}
      arrayData={arrayData}
    />
  );
};

export default PurchaseModal;
