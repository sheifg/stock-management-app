import { useDispatch } from 'react-redux';
import FormModal from './FormModal';
import { useSelector } from 'react-redux';
import { uiActions } from '../../store/ui';
import { brandsActions } from '../../store/brands';

const inputLabels = [
  {
    name: 'name',
    label: 'Brand Name',
  },
  {
    name: 'image',
    label: 'Brand Image',
  },
];

const initialState = {
  name: '',
  image: '',
};

const BrandModal = ({ open, closeModal, edit }) => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.ui.modalData);

  const initialValues = edit ? modalData : initialState;

  const handleSubmit = (values, actions) => {
    if (edit) {
      dispatch(brandsActions.editData(values));
    } else {
      dispatch(brandsActions.createData(values));
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
      title={edit ? 'Edit Brand' : 'New Brand'}
      arrayData={null}
    />
  );
};

export default BrandModal;
