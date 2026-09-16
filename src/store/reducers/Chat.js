const INITIAL_STATE = {
  loading: false,
  chatrequest: [],
};

const Chat = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_CUSTOMER_CHAT":
      return {
        ...state,
        loading: true,
      };

    case "SET_CUSTOMER_CHAT":
      return {
        ...state,
        loading: false,
        chatrequest: action.payload,
      };

    default:
      return state;
  }
};

export default Chat;
