import {
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  productListReset,
} from "../slices/productListSlice";
import axios from "axios";

export const getProductList = async (dispatch, search = "") => {
  dispatch(productListReset());
  dispatch(updateProductStart());

  try {
    const result = await axios.get(
      `http://localhost:4000/product/getall/?search=${search}`
    );
    console.log(result);
    dispatch(updateProductSuccess(result.data.products));
  } catch (error) {
    dispatch(
      updateProductFailed(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
