const INITIAL_STATE = {
  loading: false,
  viewdetails: [],
  customer: [],
  astrolist: [],
  astrodetails: [],
};

const ViewDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_VIEW_DETAILS":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_VIEW_CUSTOMER":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_ASTRO_LIST":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_ASTRO_DETAILS":
      return {
        ...state,
        loading: true,
      };

    case "SET_VIEW_DETAILS":
      return {
        ...state,
        loading: false,
        viewdetails: action.payload,
      };
    case "SET_ASTRO_LIST":
      return {
        ...state,
        loading: false,
        astrolist: action.payload,
      };
    case "SET_ASTRO_DETAILS":
      return {
        ...state,
        loading: false,
        astrodetails: action.payload,
      };
    case "SET_VIEW_CUSTOMER":
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };

    default:
      return state;
  }
};

export default ViewDetails;
