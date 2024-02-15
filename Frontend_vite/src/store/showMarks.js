import { createSlice } from "@reduxjs/toolkit";

const showMarksSlice = createSlice({
    name: "showMarks",
    initialState: {
      showMarks: false
    },
    reducers: {
      setShowMarks(state){
        state.showMarks = !state.showMarks;
      },
      
    },
  });
  
export const marksActions = showMarksSlice.actions;
  
export default showMarksSlice;