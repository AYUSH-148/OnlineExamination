import React, { useContext, useEffect  } from 'react';
import ExamContext from '../../context/exam/examContext';
// import { useSelector} from 'react-redux';
// import Counter from './counter';
import '../../css/counter.css'
import { useToast } from "../ui/use-toast"
import Std_QuestionItem from './std_QuestionItem';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';


export default function Std_questions() {
  const navigate = useNavigate();
  
  const { subId } = useParams();
  const { Qns, getQns_perSub, set_marks } = useContext(ExamContext);
  const { toast } = useToast()
  
  useEffect(() => {
    const fetchData = async () => {
      await getQns_perSub(subId);

    };
    fetchData();
  }, [Qns]);

  useEffect(()=>{
    const timeoutId = setTimeout(async() => {
      await set_marks(subId, 0);
    },3000);
    return () => clearTimeout(timeoutId);
  },[])


  var disable = true;
  let check= 0;
  const checkQnAttempts = ()=>{
      for(let i=0;i<Qns.length;i++){
        if(Qns[i].isAnswered === true){
          check++;
        }
      }
      // console.log(check);
      if(check === Qns.length){
        disable = false;
      }
  }
  const handleClick = async () => {
    checkQnAttempts();
    
    if(disable === false){
      navigate(`/getResponse/${subId}`);
    }
    else{
      toast({
        title: "Failed to Submit!",
        description: "Kindly attend all questions.",
      })
    }
  }
  // const dur = useSelector((state) => state.showQns.counter);
  return (
    <>
      <div>
        {/* <span><Counter subId = {subId} dur = {dur}  /></span> */}
        
        {Qns.length > 0 && subId !== null ? (
          Qns.map((qn) => (
            <Std_QuestionItem key={qn._id} qn={qn} sub_id = {subId}/>
          ))
        ) : (
         <Loader/>
        )}
        
      </div>
      <button onClick={handleClick} >Submit paper </button>
    </>
  );
}
