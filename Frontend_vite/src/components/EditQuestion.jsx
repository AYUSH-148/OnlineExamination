import React,{useState,useContext} from 'react';
import { useSelector,useDispatch } from 'react-redux'
import ExamContext from '../context/exam/examContext';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
export default function EditQuestion() {
    const {sub_id} = useParams();
    const qn = useSelector((state) => state.showQns.editdata);
    const context = useContext(ExamContext);
    const { updateQn_perSub} = context;
    const navigate = useNavigate();
    const [Qn, setQn] = useState(qn.qn);
    const [Opt1, setOpt1] = useState(qn.options[0].text);
    const [Opt2, setOpt2] = useState(qn.options[1].text);
    const [Opt3, setOpt3] = useState(qn.options[2].text);
    const [Opt4, setOpt4] = useState(qn.options[3].text);
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const ans = document.getElementById('correctAnswer').value;
        var options = [
            {"text":Opt1 ,"isCorrect":(ans==="option1")?true:false },
            {"text":Opt2,"isCorrect":(ans==="option2")?true:false },
            {"text":Opt3 ,"isCorrect":(ans==="option3")?true:false },
            {"text":Opt4 ,"isCorrect":(ans==="option4")?true:false }
        ];
        
        await updateQn_perSub(sub_id,qn._id,Qn,options);
        navigate(`/questions/${sub_id}`);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Question:</label>
                <input type="text" id="question" name="question" value={Qn} onChange={(e) => setQn(e.target.value)} required />

                <label htmlFor="option1">Option 1:</label>
                <input type="text" id="option1" name="option1" value={Opt1} onChange={(e) => setOpt1(e.target.value)} required />

                <label htmlFor="option2">Option 2:</label>
                <input type="text" id="option2" name="option2" value={Opt2} onChange={(e) => setOpt2(e.target.value)} required />

                <label htmlFor="option3">Option 3:</label>
                <input type="text" id="option3" name="option3" value={Opt3} onChange={(e) => setOpt3(e.target.value)} required />

                <label htmlFor="option4">Option 4:</label>
                <input type="text" id="option4" name="option4" value={Opt4} onChange={(e) => setOpt4(e.target.value)} required />

                <label htmlFor="correctAnswer">Correct Answer:</label>

                <select id="correctAnswer" name="correctAnswer" required>
                    <option value="option1">Option 1 </option>
                    <option value="option2">Option 2 </option>
                    <option value="option3">Option 3 </option>
                    <option value="option4">Option 4 </option>
                </select>
                <button type="submit">Edit</button>
            </form>
        </>
    );
}
