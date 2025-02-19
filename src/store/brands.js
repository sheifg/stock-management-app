import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";

const token = sessionStorage.getItem("token");

const sliceUrl = `${config.BASE_URL}/brands`;
const toastMessageTag = "Brand";
const sliceName = "brands";

const slice = createSlice({
  name: sliceName,
  initialState: {
    data: [],
  },
  reducers: {
    set: (state, action) => {
      state.data = action.payload;
    },
    add: (state, action) => {
      state.data.push(action.payload);
    },
    remove: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
    },
    update: (state, action) => {
      // this reducer will update a category from the state
      // so it is necessary to find the one that it is wanted to update

      // In terms of funcionality, the 3 ways are the same:
      // Way-1 : find the index of the one we want to update
      // After the index is found, It can be updated it directly
      const index = state.data.findIndex(
        (item) => item._id === action.payload._id
      );
      // It is necessary to update just one thing, the id
      state.data[index] = action.payload;

      // Way-2 : finding the one that it is wanted to update and update it directly
      // item = state.data.find((item) => item._id === action.payload._id);
      // item = action.payload;

      // Way-3 : mapping on data and whenever it is been on the exact item it can be updated it
      // state.data = state.data.map((item) =>
      //   item._id === action.payload._id ? action.payload : item
      // );
    },
  },
});

// Actions are the responsibles to interactuate with the API
// ASYNC ACTIONS - CRUD Operatios

// Get all the brands
// The data should come automatically with the function, it is not necessary to notify that it was successful, there is no user interaction. For that reason the toast notification is not needed

const getData = () => async (dispatch) => {
  try {
    // To ensure tohave the latest version of the token in the session storage
    const token = sessionStorage.getItem("token");
    const url = sliceUrl;
    const { data } = await axios({
      url,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // Here all the categories from the server are got
    // Now it is necessary to set them in the state
    // The reducer is used for this action
    // So it is needed to dispatch it
    dispatch(slice.actions.set(data.data));
  } catch (error) {
    console.log(error);
    toast.error(
      error.response.data?.details ||
        error.response.data?.message ||
        error.message
    );
  }
};

// Create/Add a brand
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
    });

    dispatch(slice.actions.add(data.data));
    toast.success(`${toastMessageTag} added successfully`);
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

// Delete a brand
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
    toast.success(`${toastMessageTag} deleted successfully`);

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

// Update a brand
const editData = (input) => async (dispatch) => {
  try {
    // It is also necessary to check if another user has updated the info while another user is updating at the same time and this user has not the latest version
    // Getting the latest version of the data that it is wanted to update
    const latestDataFromAPI = await getSingleData(input._id);

    // This is to check if the data it is wanted to update has been updated by another user
    // To do so the updatedAt field is used
    // updatedAt field will always be different if the data has been updated by another user
    // input?.updatedAt: if it is updted info inside the input filed
    // Some default values from api don't have . updated
    if (input?.updatedAt && latestDataFromAPI.updatedAt !== input.updatedAt) {
      // Warn the user about this change
      const confirm = window.confirm(
        "This data has been updated by another user. Are you sure you want to edit it?"
      );
      // If the user doesn't want to edit the data, it is not wanted to update it
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

export const brandsReducer = slice.reducer;
export const brandsActions = {
  getData,
  createData,
  deleteData,
  editData,
};
