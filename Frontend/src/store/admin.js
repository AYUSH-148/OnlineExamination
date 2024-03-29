import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "set_admin",
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
            profession:newdata.profession
        }   
      },
    },
  });
  
export const adminActions = adminSlice.actions;
  
export default adminSlice;