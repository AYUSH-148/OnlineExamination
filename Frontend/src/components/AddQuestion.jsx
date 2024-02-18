import React, { useState ,useContext} from 'react';
import { useNavigate } from 'react-router';
import ExamContext from '../context/exam/examContext';
export default function AddQuestion(props) {
    const [Qn,setQn] = useState('');
    const [Opt1,setOpt1] = useState('');
    const [Opt2,setOpt2] = useState('');
    const [Opt3,setOpt3] = useState('');
    const [Opt4,setOpt4] = useState('');
    const {id} =props;

    const context = useContext(ExamContext);
    const { createQn_perSub } = context;
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const ans = document.getElementById('correctAnswer').value;
        var options = [
            {"text":Opt1 ,"isCorrect":(ans==="option1")?true:false },
            {"text":Opt2,"isCorrect":(ans==="option2")?true:false },
            {"text":Opt3 ,"isCorrect":(ans==="option3")?true:false },
            {"text":Opt4 ,"isCorrect":(ans==="option4")?true:false }
        ];
        console.log({"qn":Qn,"options":options})
        await createQn_perSub(id,Qn,options);
        navigate(`/questions/${id}`);
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="question">Question:</label>
            <input className='border border-black mt-2' type="text" id="question" name="question" value={Qn} onChange={(e) => setQn(e.target.value)} required />

            <label htmlFor="option1">Option 1:</label>
            <input  className='border border-black mt-2' type="text" id="option1" name="option1" value={Opt1} onChange={(e) => setOpt1(e.target.value)} required />

            <label htmlFor="option2">Option 2:</label>
            <input  className='border border-black mt-2' type="text" id="option2" name="option2" value={Opt2} onChange={(e) => setOpt2(e.target.value)} required />

            <label htmlFor="option3">Option 3:</label>
            <input  className='border border-black mt-2' type="text" id="option3" name="option3" value={Opt3} onChange={(e) => setOpt3(e.target.value)} required />

            <label htmlFor="option4">Option 4:</label>
            <input  className='border border-black mt-2' type="text" id="option4" name="option4" value={Opt4} onChange={(e) => setOpt4(e.target.value)} required />

            <label htmlFor="correctAnswer">Correct Answer:</label>

            <select  className='border border-black mt-2' id="correctAnswer" name="correctAnswer" required>
                <option value="option1">Option 1 </option>
                <option value="option2">Option 2 </option>
                <option value="option3">Option 3 </option>
                <option value="option4">Option 4 </option>
            </select>
            <button type="submit" className='border border-black bg-sky-600'>Add Question</button>
        </form> 
        </>
  );
}
