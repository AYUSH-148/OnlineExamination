import React, { useContext, useEffect } from 'react';
import ExamContext from '../../context/exam/examContext';
import { useSelector} from 'react-redux';
import Counter from './counter';
import { useToast } from "../ui/use-toast"
import Std_QuestionItem from './std_QuestionItem';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';


export default function Std_questions() {
  const navigate = useNavigate();

  const { subId, std_id } = useParams();
  const { Qns, getQns_perSub, set_marks } = useContext(ExamContext);
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        await getQns_perSub(subId);
      }

    };
    fetchData();
  }, [Qns, std_id, subId]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      await set_marks(subId, 0);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [])


  var disable = true;
  let check = 0;
  const checkQnAttempts = () => {
    for (let i = 0; i < Qns.length; i++) {
      if (Qns[i].isAnswered === true) {
        check++;
      }
    }
    // console.log(check);
    if (check === Qns.length) {
      disable = false;
    }
  }
  const handleClick = async () => {
    checkQnAttempts();
    
    if (disable === false) {
      setTimeout(() => {
        navigate(`/getResponse/${std_id}/${subId}`);
      }, 3000); 
    }
    else {
      toast({
        title: "Failed to Submit!",
        description: "Kindly attend all questions.",
      })
    }
  }
  const dur = useSelector((state) => state.showQns.counter);
  return (
    <>
      <div >
        <div className='fixed right-4 bottom-7'><Counter subId = {subId} dur = {dur} std_id = {std_id} /></div>

        {Qns.length > 0 && subId !== null ? (
          Qns.map((qn) => (
            <Std_QuestionItem key={qn._id} qn={qn} sub_id={subId} />
          ))
        ) : (
          <Loader />
        )}
        <button className='border bg-sky-600 hover:opacity-90 border-black ml-[27%] w-[700px] rounded-sm mb-16 py-2 text-lg font-sans' onClick={handleClick} >SUBMIT <i className="fa-solid ml-2 fa-check"></i></button>
      </div>
     
    </>
  );
}
