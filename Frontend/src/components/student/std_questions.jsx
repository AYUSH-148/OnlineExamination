import React, { useContext, useEffect, useState } from 'react';
import ExamContext from '../../context/exam/examContext';
import { useSelector } from 'react-redux';
import Counter from './counter';
import { useToast } from "../ui/use-toast"
import Std_QuestionItem from './std_QuestionItem';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import {
  Dialog,
  DialogContent,
  DialogClose,

  DialogTrigger,
} from "../ui/dialog"



export default function Std_questions() {


  const navigate = useNavigate();
  const { subId, std_id } = useParams();
  const { Qns, getQns_perSub, set_marks } = useContext(ExamContext);
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false);

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
      setSubmitted(true);
      setTimeout(() => {
        window.history.replaceState(null, '', window.location.href);
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
      {!submitted && (
        <>
        <div className='px-10  border-b py-4'>
          <p className='text-lg font-semibold mb-4'> GUIDELINES</p>
          <ul className='list-disc ml-4'>
            <li>
              Once the submit button is clicked your response is saved and you cant navigate back.
            </li>
            <li>
              Your repsonse will be automatically submitted after time limit. Keep track at it!
            </li>
            <li>
              Click the ' save ' button to save your  answer for each question.
            </li>
          </ul>
        </div>
        <div>
            <div className='fixed right-9  top-2 z-[500] '><Counter subId={subId} dur={dur} std_id={std_id} /></div>

            {Qns.length > 0 && subId !== null ? (
              Qns.map((qn) => (
                <Std_QuestionItem key={qn._id} qn={qn} sub_id={subId} />
              ))
            ) : (
              <Loader />
            )}
            <Dialog>
              <DialogTrigger className='ml-[27%]'><button className='border bg-sky-600 hover:opacity-90 border-black  w-[700px] rounded-sm mb-16 py-2 text-lg font-sans' >SUBMIT AND SAVE <i className="fa-solid ml-2 fa-check"></i></button>

              </DialogTrigger>
              <DialogContent>
                <div >
                  <p className='text-center text-lg mb-3 font-semibold '>Are you sure you want to submit ?</p>
                  <div className='flex items-center justify-center'>
                    
                    <DialogClose><button className="bg-gray-500 hover:bg-gray-600  text-white py-2 px-4 rounded-lg mx-6 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      Go back
                    </button>
                    </DialogClose>
                    <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 mx-2 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
                      Confirm
                    </button>
                  </div>

                </div>
              </DialogContent>
            </Dialog>

          </div></>)
      }
    </>
  );
}
