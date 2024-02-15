import { configureStore } from "@reduxjs/toolkit";
import qnsSlice from "./qns";
import showMarksSlice from "./showMarks";

const store = configureStore({
  reducer: {
    showQns:qnsSlice.reducer,
    showMarks:showMarksSlice.reducer,
  },
});
export default store;