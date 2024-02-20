import React, { useContext } from 'react';
import { useDispatch } from "react-redux";
import { qnsActions } from "../store/qns"
import { useNavigate } from 'react-router';

import ExamContext from '../context/exam/examContext';


export default function QuestionItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { qn, sub_id } = props;
  const context = useContext(ExamContext);
  const { deleteQn_perSub } = context;
  const handleDelete = async (sub_id, qn_id) => {
    await deleteQn_perSub(sub_id, qn_id);
  }
  const handleEdit = () => {
    dispatch(qnsActions.setEditdata(qn));
    navigate(`/${sub_id}/edit_qn/${qn._id}`);
  }
  const correctAns = ()=>{
    let ans = ""
    for(let i=0;i<4;i++){
      if(qn.options[i].isCorrect===true){
        ans = qn.options[i].text;
        break;
      }
    }
    return ans;
  }
  return (
    <div className="question-container">
      <button onClick={() => handleDelete(sub_id, qn._id)}>Delete</button>
      <button onClick={() => handleEdit()}>Edit</button>

      <div className="question mt-8 text-xl font-medium font-sans" >- {qn.qn}</div>
      <ul className="px-10 list-disc">
        <li className=" text-lg my-3">{qn.options[0].text} </li>
        <li className=" text-lg my-3 ">{qn.options[1].text}</li>
        <li className=" text-lg my-3 "> {qn.options[2].text} </li>
        <li className=" text-lg my-3 "> {qn.options[3].text}</li>
      </ul>
      <hr />
      <div className='text-xl mt-6 font-semibold'>Ans. {correctAns()}</div>

    </div>
  );
}
