import API from "../../helpers/api";

export function getKundaliDetails() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_KUNDALI_DETAILS" });
    API.apiGet("saveKundali", `?kundaliType=1`)
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: "SET_KUNDALI_DETAILS",
            payload: response?.data?.response?.customerDetails,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_KUNDALI_DETAILS`, payload: [] });
      });
  };
}

export function getSearchKundali({ querySearch }) {
  return (dispatch) => {
    dispatch({ type: "REQUEST_SEARCH_KUNDALI" });
    API.apiGet("saveKundali", `?kundaliType=1&name=${querySearch}`)
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: "SET_SEARCH_KUNDALI",
            payload: response?.data?.response?.customerDetails,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_SEARCH_KUNDALI`, payload: [] });
      });
  };
}

export function getMatchDetails() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_MATCH_DETAILS" });
    API.apiGet("saveKundali", `?kundaliType=2`)
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: "SET_MATCH_DETAILS",
            payload: response?.data?.response?.customerDetails,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_MATCH_DETAILS`, payload: [] });
      });
  };
}
