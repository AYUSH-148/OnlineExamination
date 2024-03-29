import { configureStore } from "@reduxjs/toolkit";
import qnsSlice from "./qns";
import showMarksSlice from "./showMarks";
import adminSlice from "./admin";
import studentSlice from "./student";
const store = configureStore({
  reducer: {
    showQns: qnsSlice.reducer,
    showMarks: showMarksSlice.reducer,
    set_admin: adminSlice.reducer,
    set_student: studentSlice.reducer
  },
});
export default store;