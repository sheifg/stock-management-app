import { useDispatch } from "react-redux";
import FormModal from "./FormModal";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui";
import { firmsActions } from "../../store/firms";

const inputLabels = [
  {
    name: "name",
    label: "Firm Name",
  },
  {
    name: "image",
    label: "Firm Image",
  },
  {
    name: "address",
    label: "Address",
  },
  {
    name: "phone",
    label: "Phone",
  },
];

const initialState = {
  name: "",
  image: "",
  address: "",
  phone: "",
};

const FirmModal = ({ open, closeModal, edit, modalValues }) => {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.ui.modalData);

  const initialValues = edit ? modalData : initialState;

  const handleSubmit = (values, actions) => {
    if (edit) {
      dispatch(firmsActions.editData(values));
    } else {
      dispatch(firmsActions.createData(values));
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
      title={edit ? "Edit Firm" : "New Firm"}
      // Avoiding to have an error
      arrayData={null}
    />
  );
};

export default FirmModal;
