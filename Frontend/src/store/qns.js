import { createSlice } from "@reduxjs/toolkit";

const qnsSlice = createSlice({
    name: "showQns",
    initialState: {
      AnsArray:[],
      editdata:{}
    },
    
    reducers: {
      setAnsArray(state, action) {
        const { qn_id, ans } = action.payload;
        if(state.AnsArray.length>0){
          const index = state.AnsArray.findIndex(item => item.qn_id === qn_id);
          if (index !== -1) {
            // If qn_id exists, update ans value
            state.AnsArray[index].ans = ans;
          } else {
            // If qn_id doesn't exist, add new JSON object
            state.AnsArray.push({ qn_id, ans });
          }
        }
        else{
            state.AnsArray.push({ qn_id, ans });
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
      }
    },
  });
  
export const qnsActions = qnsSlice.actions;
  
export default qnsSlice;