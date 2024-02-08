import React, { useContext, useState,useEffect } from 'react';
import ExamContext from '../context/exam/examContext';
import {  useDispatch } from 'react-redux';
import { qnsActions } from '../store/qns';
export default function Std_QuestionItem(props) {
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };
  useEffect(() => {
    const run = () => {
      dispatch(qnsActions.setAnsArrayNull());
    };
    run();
  }, []);

  const { qn } = props;
  
  const handleSubmit = async () => {
    console.log({qn_id:qn._id,ans:selectedAnswer});
    dispatch(qnsActions.setAnsArray({qn_id:qn._id,ans:selectedAnswer}));
  };
  return (
    <>
      <div className="question-container">
        <div className="question">{qn.qn}</div>
        <ul className="options">
          {qn.options.map((option) => (
            <li className="option" key={option._id}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={option.isCorrect}
                  onChange={handleOptionChange}
                  checked={selectedAnswer === option.isCorrect}
                />
                {option.text}
              </label>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => handleSubmit()}>
          Save
        </button>
      
      </div>
    </>
  );
}
