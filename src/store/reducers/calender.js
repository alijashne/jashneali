const INITIAL_STATE = {
  loading: false,
  viewappoint: [],
};

const calender = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_VIEW_APPOINT":
      return {
        ...state,
        loading: true,
      };

    case "SET_VIEW_APPOINT":
      return {
        ...state,
        loading: false,
        viewappoint: action.payload,
      };

    default:
      return state;
  }
};

export default calender;
