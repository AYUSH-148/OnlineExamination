import React, { useContext } from 'react';
import { useDispatch } from "react-redux";
import { qnsActions } from "../../store/qns"
import { useNavigate } from 'react-router';

import ExamContext from '../../context/exam/examContext';


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
    <div className="question-container border border-gray-300 rounded-lg p-4 mb-8">
    <div className="flex justify-between ">
        <div className=' text-lg font-bold border px-3 py-1 rounded border-black'>{qn.weight} marks</div>
        <div>
        <button onClick={() => handleDelete(sub_id, qn._id)} className="bg-red-500 hover:bg-red-600 text-white  py-2 w-20 rounded mr-2">Delete</button>
        <button onClick={() => handleEdit()} className="bg-blue-500 hover:bg-blue-600 text-white  py-2 w-20 rounded">Edit</button>
        </div>
        
    </div>
    
    <div className="question mt-8 py-3 text-xl font-medium font-sans border-b-2 border-black">Q. {qn.qn}</div>
    <ul className="px-10 list-disc">
        <li className="text-lg my-3">{qn.options[0].text}</li>
        <li className="text-lg my-3">{qn.options[1].text}</li>
        <li className="text-lg my-3">{qn.options[2].text}</li>
        <li className="text-lg my-3">{qn.options[3].text}</li>
    </ul>
    <div className='text-xl mt-6 font-semibold border-t-4 pt-2 '>Ans. {correctAns()}</div>
</div>

  );
}
