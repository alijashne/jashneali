import API from "../../helpers/api";

export function getViewCart() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_VIEW_CART" });
    API.apiGet("viewCart")
      .then((response) => {
        if (response.data) {
          dispatch({
            type: "SET_VIEW_CART",
            payload: response?.data?.response?.data,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_VIEW_CART`, payload: [] });
      });
  };
}

export function getViewAddress() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_VIEW_ADDRESS" });
    API.apiGet("viewAddress")
      .then((response) => {
        if (response.data) {
          dispatch({
            type: "SET_VIEW_ADDRESS",
            payload: response?.data?.response?.data?.userDeliveryAddresses,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_VIEW_ADDRESS`, payload: [] });
      });
  };
}
