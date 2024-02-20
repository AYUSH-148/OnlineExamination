import React, { useContext, useEffect } from 'react';
import ExamContext from '../context/exam/examContext';
import Counter from './counter';
import '../css/counter.css'
import { useToast } from "../../src/components/ui/use-toast"
import { ToastAction } from "../../src/components/ui/toast"
import Std_QuestionItem from './std_QuestionItem';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Std_questions() {
  const navigate = useNavigate();
  const { subId } = useParams();
  const { Qns, getQns_perSub, set_marks,get_subject,Sub } = useContext(ExamContext);
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      await getQns_perSub(subId);
      await set_marks(subId, 0);
      await get_subject(subId);
    };
    fetchData();
  }, []);
  // console.log(Qns);
  var disable = true;
  let check= 0;
  const checkQnAttempts = ()=>{
      for(let i=0;i<Qns.length;i++){
        if(Qns[i].isAnswered === true){
          check++;
        }
      }
      console.log(check);
      if(check === Qns.length){
        disable = false;
      }
  }
  const handleClick = async () => {
    checkQnAttempts();
    
    if(disable === false){
      navigate(`/getMarks/${subId}`);
    }
    else{
      toast({
        title: "Failed to Submit!",
        description: "Kindly attend all questions.",
      })
    }
  }

  
  return (
    <>
      <div>
        <span><Counter dur = {Sub.duration} subId = {subId}/></span>

        {Qns.length > 0 && subId !== null ? (
          Qns.map((qn) => (
            <Std_QuestionItem key={qn._id} qn={qn} sub_id = {subId}/>
          ))
        ) : (
          <p>LOADING</p>
        )}
      </div>
      <button onClick={handleClick} >Submit paper </button>
    </>
  );
}
