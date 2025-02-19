import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";

const token = sessionStorage.getItem("token");

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
  },
  // reducers are the responsible only to update the state

  reducers: {
    // update the state

    setCategories: (state, action) => {
      // this reducer will update the entire state data
      state.data = action.payload;
    },
    // add a new category, push something to the state
    addCategory: (state, action) => {
      // this reducer will add a new category to the state
      state.data.push(action.payload);
    },

    // remove caegory
    removeCategory: (state, action) => {
      // this reducer will remove a category from the state
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    // update a category
    updateCategory: (state, action) => {
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
// the data should come automatically with the function, it is not necessary to notify it was successful, there is no user interaction for that reason it is not necessary the toast notification
export const getCategories = () => async (dispatch) => {
  try {
    const url = `${config.BASE_URL}/categories`;
    const { data } = await axios({
      url,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // here it is got all the categories from the server
    // now it is needed to set them in our state
    // It is had a reducer for this action
    // so it is needed to dispatch it

    dispatch(categoriesSlice.actions.setCategories(data.data));
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
// Create/add a category
export const addCategory = (category) => async (dispatch) => {
  try {
    const url = `${config.BASE_URL}/categories`;
    const { data } = await axios({
      url,
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: category,
      // The structure of API for the inputLabels should be followed
      // data:{name: category.name}
      // For other examples with more values, like firms
      // Following the structure and naming from API
      // data: firms
      // Not following the api naming, it would be necesry to do it as follow:
      // data:{name: frims.name, address: firms.address, phone: firms.phone, image: firms.image}
      // data:{name: category.categoryName, description:category.categoryDescription, image: category: category.categoryImage}
    });

    // With this dispatch, one category is added and afterwards the same category is added to the state
    // The categories are inside data and data is inside the data: data.data
    dispatch(categoriesSlice.actions.addCategory(data.data));
    toast.success("Category added succesfully");
    // If this application is used by multiple users, there is a possibility that there may be more categories added by them
    // The following function can be used to get all categories from the server
    // If there are multiple users using this application and updating the categories, we need to get all the categories again to have the latest updated info
    dispatch(getCategories());
    // This dispatch is not mandatory, but it better to have it, because it will be had the latest updated info
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// Delete a category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const url = `${config.BASE_URL}/categories/${id}`;
    const { data } = await axios({
      url,
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    dispatch(categoriesSlice.actions.removeCategory(id));
    toast.success("Category deleted successfully");

    dispatch(getCategories());
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

// Update a category
// Using editCategory to try not getting confused with the reducer for update that it calls updateCategory
export const editCategory = (category) => async (dispatch) => {
  try {
    const url = `${config.BASE_URL}/categories/${category._id}`;
    const { data } = await axios({
      url,
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: category,
    });

    dispatch(categoriesSlice.actions.updateCategory(data.data));
    toast.success("Category updated successfully");

    dispatch(getCategories());
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const categoriesReducer = categoriesSlice.reducer;
