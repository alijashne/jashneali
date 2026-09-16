import API from "../../helpers/api";

export function getViewAppointment() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_VIEW_APPOINT" });
    API.apiGet("viewAppointment")
      .then((response) => {
        if (response?.data) {
          dispatch({
            type: "SET_VIEW_APPOINT",
            payload: response?.data?.response?.appointmentList,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_VIEW_APPOINT`, payload: [] });
      });
  };
}
