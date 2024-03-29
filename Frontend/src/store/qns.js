import { createSlice } from "@reduxjs/toolkit";

const qnsSlice = createSlice({
    name: "showQns",
    initialState: {
      AnsArray:[],
      editdata:{},
      counter:{},
    },
    
    reducers: {
      setAnsArray(state, action) {
        const { qn_id, ans, marks } = action.payload;
        if(state.AnsArray.length>0){
          const index = state.AnsArray.findIndex(item => item.qn_id === qn_id);
          if (index !== -1) {
            // If qn_id exists, update ans value
            state.AnsArray[index].ans = ans;
            state.AnsArray[index].marks = marks;
          } else {
            // If qn_id doesn't exist, add new JSON object
            state.AnsArray.push({ qn_id, ans , marks});
          }
        }
        else{
            state.AnsArray.push({ qn_id, ans , marks});
        }
        
      },
      setEditdata(state,action){
        const newdata = action.payload;
        state.editdata = {
            _id:newdata._id,
            subject:newdata.subject,
            qn:newdata.qn,
            options:newdata.options
        }   
      },
      setAnsArrayNull(state){
        state.AnsArray = [];
      },
      
      setTimer(state,action){
        const newdata = action.payload;
        state.counter = {
          hours: newdata.hours,
          minutes: newdata.minutes,
          seconds: newdata.seconds
        }
      },
      
    },
  });
  
export const qnsActions = qnsSlice.actions;
  
export default qnsSlice;