import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";

// When it si reached this line, there is no token inside the session storage
// so when the CRUD operations want to use the token inside, they find a problem, because the value is null, so it is not possible to acces to the pages
// For that reason it is include a token inside the getData of every page to ensure to have the latest token
const token = sessionStorage.getItem("token");
//---
const sliceUrl = `${config.BASE_URL}/categories`;
const toastMessageTag = "Category";
const sliceName = "categories";

const slice = createSlice({
  name: sliceName,
  initialState: {
    data: [],
  },
  // reducers are the responsible only to update the state

  reducers: {
    // update the state

    set: (state, action) => {
      // this reducer will update the entire state data
      state.data = action.payload;
    },
    // add a new category, push something to the state
    add: (state, action) => {
      // this reducer will add a new category to the state
      state.data.push(action.payload);
    },

    // remove a category
    remove: (state, action) => {
      // this reducer will remove a category from the state
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    // update a category
    update: (state, action) => {
      // this reducer will update a category from the state
      // so it is needed to find the one it is wanted to update

      // In terms of funcionality, the 3 ways are the same:
      // Way-1: find index of the one it is wanted to update
      // after it is found the index, it can be updated it directly
      const index = state.data.findIndex(
        (item) => item._id === action.payload._id
      );
      // it is needed to update just one thing, the id
      state.data[index] = action.payload;

      // Way-2: find the one it is wanted to updte and update it directly
      // item = state.data.find((item) => item._id === action.payload._id);
      // item = action.payload

      // Way-3: map on data and whenever it is been on the each item, it can be updated it
      // state.data = state.data.map((item) =>
      //   item._id === action.payload._id ? action.payload : item
      // );
    },
  },
});

// Actions are the responsibles to interactuate with the API
// ASYNC ACTIONS - CRUD Operations

// Get all categories
// the data should come automatically with the function, it is not needed to notify it was successful, there is no user interaction for that reason it is not needed the toast notification
const getData = () => async (dispatch) => {
  try {
    // Way-1: including the const token with the latest version of it, to ensure that there is no null value
    // to ensure to have the latest version of the token in the session storage. But for that you have to include this const tokn in all slice of the store

    // Way-2: creating a helper file naming theAxios.js, where the latest version of token is added for every new request, so it will be just necessary to change the structure of the axios function and not necessary to include the const token for every getData function in every Slice
    const token = sessionStorage.getItem("token");
    //-----
    const url = sliceUrl;
    const { data } = await axios({
      url,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // Here it is got all the categories from the server
    // now it is needed to set them in The state
    // it is had a reducer for this action
    // so it is needed to dispatch it

    dispatch(slice.actions.set(data.data));
  } catch (error) {
    console.log(error);

    //! This is not same all the time. It depends on the API response structure
    // To provide a more detailed error message, it is needed to check the API response structure and provide a more detailed error message
    toast.error(
      error.response.data?.details ||
        error.response.data?.message ||
        error.message
    );
    // error.message will always exist and it can always be used it
  }
};

// Create/add a category
const createData = (input) => async (dispatch) => {
  try {
    const url = sliceUrl;
    const { data } = await axios({
      url,
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: input,
      // if it is not followed the structure of API for the inputLabels, it should be done it
      // data:{name: category.name}
      // for other examples with more values, like firms
      // Following the structure and anming from API
      // data: firms
      // Not following the api naming you would need to do it as follows
      // data:{name: frims.name, address: firms.address, phone: firms.phone, image: firms.image}
      // data:{name: category.categoryName, description:category.categoryDescription, image: category: category.categoryImage}
    });

    // With this dispatch, it is added one category and afterwards it is added the same category to the state
    // The categories are inside data and data is inside the data: data.data
    dispatch(slice.actions.add(data.data));
    toast.success(`${toastMessageTag} added succesfully`);

    // If this application is used by multiple users, there is a possibility that there may be more categories added by them
    // It can be used the following function to get all categories from the server
    // if there are multiple users using this application and updating the categories, it is needed to get all the categories again to have the latest updated info ->
    dispatch(getData());
    // this dispatch is not mandatory, but it better to have it, because it will be had the latest updated info
  } catch (error) {
    console.log(error);
    toast.error(
      error.response.data?.details ||
        error.response.data?.message ||
        error.message
    );
  }
};

// Delete a category
const deleteData = (id) => async (dispatch) => {
  try {
    const url = `${sliceUrl}/${id}`;
    const { data } = await axios({
      url,
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    dispatch(slice.actions.remove(id));
    toast.success(`${toastMessageTag} deleted succesfully`);

    dispatch(getData());
  } catch (error) {
    console.log(error);
    toast.error(
      error.response.data?.details ||
        error.response.data?.message ||
        error.message
    );
  }
};

// Update the category
// using editCategory to try not getting confused with th reducer for update that it calls updateCategory
const editData = (input) => async (dispatch) => {
  try {
    // it is also necessary to check if another user has updated the info while it is being updated and it is not had the latest data
    // here it is got the latest version of the data it is wanted to update
    const latestDataFromApi = await getSingleData(input._id);
    // this is to check if the data it is wanted to update has been updated by another user
    // to do so it is used the updatedAt field
    // updatedAt field will always be different if the data has been updated by another user
    // input?.updatedAt: if you have updted info inside the input filed
    // some default values from api dont have . updated
    if (input?.updatedAt && latestDataFromApi.updatedAt !== input.updatedAt) {
      // warn the user about this change
      const confirm = window.confirm(
        "This data has been updated by another user. Are you sure you want to edit it?"
      );
      // if the user doesn't want to edit the data, it is not wanted to update it
      if (!confirm) return;
    }
    const url = `${sliceUrl}/${input._id}`;
    const { data } = await axios({
      url,
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: input,
    });

    dispatch(slice.actions.update(data.data));
    toast.success(`${toastMessageTag} updated successfully`);

    dispatch(getData());
  } catch (error) {
    console.log(error);
    toast.error(
      error.response.data?.details ||
        error.response.data?.message ||
        error.message
    );
  }
};

// It is just needed this function here, for that reason it is not being used disptach
// Get a single data
// It is possible to check if someone has updated the info while it is being updated and it is not had the latest version of the data
const getSingleData = async (id) => {
  try {
    const url = `${sliceUrl}/${id}`;
    const { data } = await axios({
      url,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    toast.error(
      error.response.data?.details ||
        error.response.data?.message ||
        error.message
    );
  }
};

export const categoriesReducer = slice.reducer;
// Creating this variable, it will get more clear that is inside of categoriesActions and it will be used the same structure of exportion for the rest of the pages
export const categoriesActions = {
  getData,
  createData,
  deleteData,
  editData,
};
