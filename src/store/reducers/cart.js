const INITIAL_STATE = {
  loading: false,
  viewcart: [],
  viewaddress: [],
};

const ViewCart = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_VIEW_CART":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_VIEW_ADDRESS":
      return {
        ...state,
        loading: true,
      };
    case "SET_VIEW_CART":
      return {
        ...state,
        loading: false,
        viewcart: action.payload,
      };
    case "SET_VIEW_ADDRESS":
      return {
        ...state,
        loading: false,
        viewaddress: action.payload,
      };
    default:
      return state;
  }
};

export default ViewCart;
