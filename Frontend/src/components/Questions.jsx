import React, { useContext, useEffect } from 'react';
import ExamContext from '../context/exam/examContext'
import { useParams } from 'react-router-dom';
import QuestionItem from './QuestionItem';
import AddQuestion from './AddQuestion';

export default function Questions() {
  const { id } = useParams();
  const context = useContext(ExamContext);
  const { Qns, getQns_perSub } = context;

  useEffect(() => {
    const fetchData = async () => {
      await getQns_perSub(id);
    };
    fetchData();
  }, []);

  return (
    <div>
      <AddQuestion id={id} />
      <div>
        <span><h2>Questions</h2></span>
        
      </div>
      {Qns.map((qn) => {
        return <QuestionItem key={qn._id} qn={qn} sub_id={id} />
      })}
    </div>
  );
}
