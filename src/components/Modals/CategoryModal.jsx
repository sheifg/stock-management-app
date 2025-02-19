import { useDispatch } from "react-redux";
import FormModal from "./FormModal";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui";
import { categoriesActions} from "../../store/categories";
import { PropTypes } from 'prop-types';

// It will be used for the info inside of the input, for categories. There is just one input, but for example for other pages, it will be had more inputs, so it will be needed more object inisde the inputsLabels. Eg. in product it will be had product name, brand and category. It can be used name or another name as it is wanted, it should be the same in the initialValues
//It is like a template to use it, so for other pages it can be used it and not repeat 
const inputLabels = [{ 
  // key: value -> key can be called whatever it is wanted, but the value should be the same as appears in the API, if not when it is used the name, it should be identified 
  name: "name", 
  label: "Category name" }];

const CategoryModal = ({open, closeModal, edit, 
  // Using way-2
  // modalValues
}) => {

  const dispatch = useDispatch();
  const modalData =  useSelector((state) => state.ui.modalData);
  console.log("modalData: ",modalData);

  // Here it is necessary to check if it is being edited or not
  // The initial value will have different values depending on it there is edit mode or not
  // If edit is true, initial value will be modalValues
  // If edit is false, initial value will be an empty object
    const initialValues = edit 

    ? modalData // Using way-1

    // ? modalValues // Using way-2: in that specific example it is easier to use way-2(because there are just 2 pages: page and modal), but it is being used way-1, because it is being implemented Redux

    // data sent: modalData
    // modalValues is a prop that it is passed from the parent component to implement way-2
    // modalData is state in our Redux store to implement way-1

    : {
      name: '', // This name should be the same as in inputLabels
    };

    const handleSubmit = (values, actions) => {
      if (edit) {
        dispatch(categoriesActions.editData(values));
      } else {
        dispatch(categoriesActions.createData(values));
      }
      actions.resetForm();
      actions.setSubmitting(false);
      closeModal();
    };
  
    const handleClose = () => {
        // To clear the content when the modal is closed
        dispatch(uiActions.setModalData({}));
        closeModal();
    };

    return <FormModal 
      open={open}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      inputLabels={inputLabels}
      title={edit ? 'Edit Category' : 'New Category'}
      // With "New Category": it will appear the modal with empty input and add category button
      // With "Edit Category": it will appear input with info to edit and edit category button
      arrayData={null}
    />
  };

CategoryModal.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    edit: PropTypes.bool,
  };
  
  export default CategoryModal;

