import API from "../../helpers/api";

export function getCustomerChatReq() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_CUSTOMER_CHAT" });
    API.apiGet("customerChatReq")
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: "SET_CUSTOMER_CHAT",
            payload: response?.data?.response?.customerDetails,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_CUSTOMER_CHAT`, payload: [] });
      });
  };
}
