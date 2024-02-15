import React,{useContext} from 'react';
import { useDispatch } from "react-redux";
import { qnsActions } from "../store/qns"
import { useNavigate } from 'react-router';

import ExamContext from '../context/exam/examContext';
export default function QuestionItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { qn,sub_id } = props;
  const context = useContext(ExamContext);
  const {deleteQn_perSub} = context;
  const handleDelete = async(sub_id,qn_id)=>{
    await deleteQn_perSub(sub_id,qn_id);
  }
  const handleEdit = ()=>{
    dispatch(qnsActions.setEditdata(qn));
    navigate(`/${sub_id}/edit_qn/${qn._id}`);
  }
  return (
    <div className="question-container">
      <button onClick={()=>handleDelete(sub_id,qn._id)}>Delete</button>
      <button onClick={()=>handleEdit()}>Edit</button>

      <div className="question">{qn.qn}</div>
      <ul className="options">
        <li className="option">
          <label>
            <input type="radio" name="answer" defaultChecked = {qn.options[0].isCorrect}  />
            {qn.options[0].text}
          </label>
        </li>
        <li className="option">
          <label>
            <input type="radio" name="answer" defaultChecked = {qn.options[1].isCorrect} />
            {qn.options[1].text}
          </label>
        </li>
        <li className="option">
          <label>
            <input type="radio" name="answer" defaultChecked = {qn.options[2].isCorrect} />
            {qn.options[2].text}
          </label>
        </li>
        <li className="option">
          <label>
            <input type="radio" name="answer" defaultChecked = {qn.options[3].isCorrect}/>
            {qn.options[3].text}
          </label>
        </li>
      </ul>
    </div>
  );
}
