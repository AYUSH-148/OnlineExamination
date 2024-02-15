import React, { useContext, useEffect } from 'react';
import ExamContext from '../context/exam/examContext';
import Counter from './counter';
import '../css/counter.css'

import Std_QuestionItem from './std_QuestionItem';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
export default function Std_questions() {
  const alert = useAlert();
  const navigate = useNavigate();
  const { subId } = useParams();
  const { Qns, getQns_perSub, set_marks,get_subject,Sub } = useContext(ExamContext);

  useEffect(() => {
    const fetchData = async () => {
      await getQns_perSub(subId);
      await set_marks(subId, 0);
      await get_subject(subId);
    };
    fetchData();
  }, []);
  // console.log(Qns);
  const handleClick = async () => {
    alert.info('Your response is recorded!', {
      timeout: 5000, // custom timeout just for this one alert
      type: 'info',
    })
    navigate(`/getMarks/${subId}`);

  }
  return (
    <>
      <div>
        <span><h2>Questions </h2></span>
        <span><Counter dur = {Sub.duration}/></span>

        {Qns.length > 0 && subId !== null ? (
          Qns.map((qn) => (
            <Std_QuestionItem key={qn._id} qn={qn} />
          ))
        ) : (
          <p>LOADING</p>
        )}
      </div>
      <button onClick={handleClick}>Submit paper </button>
    </>
  );
}
