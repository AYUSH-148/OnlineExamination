import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: "set_student",
    initialState: {
      editdata:{},
    },
    
    reducers: {
   
      setEditdata(state,action){
        const newdata = action.payload;
        state.editdata = {
            _id:newdata._id,
            name:newdata.name,
            email:newdata.email,
            phoneNo:newdata.phoneNo,
            rollNo:newdata.rollNo
        }   
      },
    },
  });
  
export const studentActions = studentSlice.actions;
  
export default studentSlice;