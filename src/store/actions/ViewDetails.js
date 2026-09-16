import API from "../../helpers/api";

export function getViewDetails() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_VIEW_DETAILS" });
    API.apiGet("getAstrologerDetails")
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: "SET_VIEW_DETAILS",
            payload: response?.data?.response,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_VIEW_DETAILS`, payload: [] });
      });
  };
}

//astrologer list
export function getViewAstrologerList() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_ASTRO_LIST" });
    API.apiGet("viewAstrologer")
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: "SET_ASTRO_LIST",
            payload: response?.data?.response?.astrologerList,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_ASTRO_LIST`, payload: [] });
      });
  };
}

//astro details
export function getViewAstrologerDetails(astroId) {
  return (dispatch) => {
    dispatch({ type: "REQUEST_ASTRO_DETAILS" });
    API.apiGet("viewAstroDetails", `?astroId=${astroId}`)
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: "SET_ASTRO_DETAILS",
            payload: response?.data?.response,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_ASTRO_DETAILS`, payload: [] });
      });
  };
}

export function getCustomerDetails() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_VIEW_CUSTOMER" });
    API.apiGet("getCustomerDetails")
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: "SET_VIEW_CUSTOMER",
            payload: response?.data?.response?.customerDetails,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_VIEW_DETAILS`, payload: [] });
      });
  };
}
