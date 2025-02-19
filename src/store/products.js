import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";

const token = sessionStorage.getItem("token");

const sliceUrl = `${config.BASE_URL}/products`;
const toastMessageTag = "Product";
const sliceName = "products";

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
      state.data = state.data.filter((item) => item._id !== action.payload); // payload ~ answer from api
    },
    update: (state, action) => {
      const index = state.data.findIndex(
        (item) => item._id === action.payload._id
      );
      state.data[index] = action.payload;
    },
  },
});

// ASYNC ACTIONS - CRUD Operations

const getData = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem("token");
    const url = sliceUrl;
    const { data } = await axios({
      url,
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

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

const editData = (input) => async (dispatch) => {
  try {
    const latestDataFromAPI = await getSingleData(input._id);

    if (input?.updatedAt && latestDataFromAPI.updatedAt !== input.updatedAt) {
      const confirm = window.confirm(
        "This data has been updated by another user. Are you sure you want to edit it?"
      );
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

export const productsReducer = slice.reducer;
export const productsActions = {
  getData,
  createData,
  deleteData,
  editData,
};
