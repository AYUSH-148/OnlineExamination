import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { qnsActions } from '../../store/qns';
import ExamContext from '../../context/exam/examContext';
import { useToast } from "../ui/use-toast"
import Loader from '../Loader';

const Std_QuestionItem = React.memo((props) => {
  const { toast } = useToast();
  const context = useContext(ExamContext)
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { qn, sub_id } = props;
  const { updateQn_perSub, set_marksPerQn } = context;

  useEffect(() => {
    const run = () => {
      dispatch(qnsActions.setAnsArrayNull());
    };
    run();
  }, []);





  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };
  const handleSubmit = async (e) => {
    // console.log("hello");
    e.preventDefault();
    await updateQn_perSub(sub_id, qn._id, qn.qn, qn.options, true, qn.weight);
    console.log(selectedAnswer);
    if (selectedAnswer === 'true') {
      console.log(qn.weight);
      set_marksPerQn(sub_id, qn._id, qn.weight, qn.weight);
    }
    else {
      set_marksPerQn(sub_id, qn._id, 0, qn.weight);
    }
    if (selectedAnswer === 'true') {
      dispatch(qnsActions.setAnsArray({ qn_id: qn._id, ans: selectedAnswer, marks: qn.weight }));
    }
    else {
      dispatch(qnsActions.setAnsArray({ qn_id: qn._id, ans: selectedAnswer, marks: 0 }));

    }
    toast({
      title: "Answer Saved",

      description: "",
    })

    // Your logic here
  };


  return (
    <>
      {qn.weight !== undefined ? <div className="question-container">
        <p className='text-lg ml-2 absolute top-2 right-5 border-black border-b-2 '>{qn.weight} M</p>
        <div className="question text-xl  mb-5 pt-1 ">{qn.qn}</div>
        <hr />
        <ul className="options">
          {qn.options.map((option) => (
            <li className="option" key={option._id}>
              <input
                type="radio"
                id={`option-${option._id}`}
                className='radio cursor-pointer'
                name="selectedAnswer"
                value={option.isCorrect}
                onChange={handleOptionChange}
              />
              <label htmlFor={`option-${option._id}`}>{option.text}</label>
            </li>
          ))}
        </ul>
          <hr />
        <button className='bg-sky-700  mt-4 w-1/5 py-1 rounded-sm ' onClick={handleSubmit}>
          Save
        </button>

      </div> : <Loader />}


    </>
  );
});

export default Std_QuestionItem;
