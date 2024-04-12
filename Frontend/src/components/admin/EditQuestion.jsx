import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux'
import ExamContext from '../../context/exam/examContext';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
export default function EditQuestion() {
    const { sub_id } = useParams();
    const qn = useSelector((state) => state.showQns.editdata);
    const context = useContext(ExamContext);
    const { updateQn_perSub } = context;
    const navigate = useNavigate();
    const [Qn, setQn] = useState(qn.qn);
    const [Opt1, setOpt1] = useState(qn.options[0].text);
    const [Opt2, setOpt2] = useState(qn.options[1].text);
    const [Opt3, setOpt3] = useState(qn.options[2].text);
    const [Opt4, setOpt4] = useState(qn.options[3].text);
    const [weight, setWeight] = useState(qn.weight);
    const handleClick = () => {
        setQn('');
        setOpt1('');
        setOpt2('');
        setOpt3('');
        setOpt4('');
        setWeight(0);
    }
    const handleBack = ()=>{
        navigate(`/questions/${sub_id}`);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const ans = document.getElementById('correctAnswer').value;
        var options = [
            { "text": Opt1, "isCorrect": (ans === "option1") ? true : false },
            { "text": Opt2, "isCorrect": (ans === "option2") ? true : false },
            { "text": Opt3, "isCorrect": (ans === "option3") ? true : false },
            { "text": Opt4, "isCorrect": (ans === "option4") ? true : false }
        ];

        await updateQn_perSub(sub_id, qn._id, Qn, options, false, weight);
        navigate(`/questions/${sub_id}`);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='flex mx-auto w-2/5 relative flex-col items-center border border-gray-300 rounded-lg p-4 shadow-lg mt-14'>
                <i onClick={handleClick} className="fa-solid text-lg fa-rotate-right cursor-pointer text-gray-200 absolute top-1 right-2"></i>

                <textarea className='w-full max-w-md mb-3 px-3 py-2 rounded placeholder-gray-500 border-b-2 border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="question" name="question" value={Qn} onChange={(e) => setQn(e.target.value)} required />


                <input className='w-full max-w-md px-3 py-2 rounded placeholder-gray-500 border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="option1" name="option1" value={Opt1} onChange={(e) => setOpt1(e.target.value)} required />


                <input className='w-full max-w-md px-3 py-2 rounded placeholder-gray-500 border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="option2" name="option2" value={Opt2} onChange={(e) => setOpt2(e.target.value)} required />


                <input className='w-full max-w-md px-3 py-2 rounded placeholder-gray-500 border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="option3" name="option3" value={Opt3} onChange={(e) => setOpt3(e.target.value)} required />

                <input className='w-full max-w-md px-3 py-2 rounded placeholder-gray-500 border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="option4" name="option4" value={Opt4} onChange={(e) => setOpt4(e.target.value)} required />


                <div className='relative mt-1 w-full max-w-md'>
                    <i className="fa-solid fa-check absolute left-3 top-[64%] transform -translate-y-1/2 text-gray-400"></i>
                    <select className='w-full max-w-md pl-10 pr-3 py-2 rounded border border-gray-300 mt-4 focus:outline-none focus:border-gray-500' id="correctAnswer" name="correctAnswer" required>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </select>
                </div>

                <div className="relative mt-1 w-full max-w-md">
                    <span htmlFor="weight" className="absolute left-3 top-[63%] transform -translate-y-1/2 text-gray-400  w-[80px] text-lg">Weight: </span>
                    <input
                        className='w-full max-w-md pl-20 pr-3 py-2 rounded border border-gray-300 mt-4 focus:outline-none focus:border-gray-500'
                        type="number"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                        step={2}
                    />
                </div>
                <div className='mt-5 max-w-md  w-full flex justify-around mb-3'>
                    <button className='bg-gray-500 w-[40%] rounded-md py-1' onClick={handleBack}>Go Back</button>
                    <button className='bg-sky-600 w-[40%] rounded-md py-1' type="submit">Edit and Save</button>
                </div>
            </form>
        </>
    );
}
