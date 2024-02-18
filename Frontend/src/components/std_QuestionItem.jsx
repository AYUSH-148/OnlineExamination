import React, { useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { qnsActions } from '../store/qns';
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

const Std_QuestionItem = React.memo((props) => {
  const dispatch = useDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const run = () => {
      dispatch(qnsActions.setAnsArrayNull());
      // console.log(selectedAnswer);
    };
    run();
  }, []);

  const { qn } = props;
  const handleOptionChange = (event) => {
    setSelectedAnswer(event.target.value);
  };
  const handleSubmit = async (e) => {
    console.log({ qn_id: qn._id, ans: selectedAnswer });
    dispatch(qnsActions.setAnsArray({ qn_id: qn._id, ans: selectedAnswer }));
  };
  return (
    <>

      <div className="question-container">
        <div className="question text-xl mb-5 pt-0">{qn.qn}</div>
        <hr />
        <ul className="options">
          {qn.options.map((option) => (
            <li className="option" key={option._id}>
              <input
                type="radio"
                id={`option-${option._id}`}
                className='radio'
                name="selectedAnswer"
                value={option.isCorrect}
                onChange={handleOptionChange}
              />
              <label htmlFor={`option-${option._id}`}>{option.text}</label>
            </li>
          ))}
        </ul>

        <button type="button" className='bg-sky-700 ml-2 w-1/5 ' onClick={() => handleSubmit()}>
          Save
        </button>

      </div>


    </>
  );
});

export default Std_QuestionItem;
