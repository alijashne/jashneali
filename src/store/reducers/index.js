import { combineReducers } from "redux";
import ViewDetails from "./ViewDetails";
import KundaliDetails from "./KundaliDetails";
import Chat from "./Chat";
import calender from "./calender";

const appReducer = combineReducers({
  ViewDetails,
  KundaliDetails,
  Chat,
  calender,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
