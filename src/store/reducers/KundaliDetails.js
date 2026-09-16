const INITIAL_STATE = {
  loading: false,
  kundalidetails: [],
  matchdetails: [],
  searchkundali: [],
};

const KundaliDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_KUNDALI_DETAILS":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_MATCH_DETAILS":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_SEARCH_KUNDALI":
      return {
        ...state,
        loading: true,
      };
    case "SET_KUNDALI_DETAILS":
      return {
        ...state,
        loading: false,
        kundalidetails: action.payload,
      };

    case "SET_MATCH_DETAILS":
      return {
        ...state,
        loading: false,
        matchdetails: action.payload,
      };
    case "SET_SEARCH_KUNDALI":
      return {
        ...state,
        loading: false,
        searchkundali: action.payload,
      };

    default:
      return state;
  }
};

export default KundaliDetails;
