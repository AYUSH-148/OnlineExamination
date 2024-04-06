import React, { useState, useContext } from 'react';
import ExamContext from '../../context/exam/examContext';
import { useToast } from "../ui/use-toast";
export default function AddQuestion(props) {
    const { toast } = useToast();
    const [Qn, setQn] = useState('');
    const [Opt1, setOpt1] = useState('');
    const [Opt2, setOpt2] = useState('');
    const [Opt3, setOpt3] = useState('');
    const [Opt4, setOpt4] = useState('');
    const [weight, setWeight] = useState(0);

    const { id } = props;

    const context = useContext(ExamContext);
    const { createQn_perSub } = context;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const ans = document.getElementById('correctAnswer').value;
        var options = [
            { "text": Opt1, "isCorrect": (ans === "option1") ? true : false },
            { "text": Opt2, "isCorrect": (ans === "option2") ? true : false },
            { "text": Opt3, "isCorrect": (ans === "option3") ? true : false },
            { "text": Opt4, "isCorrect": (ans === "option4") ? true : false }
        ];
        console.log({ "qn": Qn, "options": options, "weight": weight })
        await createQn_perSub(id, Qn, options, weight);
        toast({
            title: "Success!",
            description: "Question is included",
        });
       
    }
    const handleClick = () => {
        setQn('');
        setOpt1('');
        setOpt2('');
        setOpt3('');
        setOpt4('');
        setWeight(0);
    }
    
    
    return (
        <>
            <form onSubmit={handleSubmit} className="flex mx-auto w-2/5 relative flex-col items-center border border-gray-300 rounded-lg p-4 shadow-lg">
                <i onClick={handleClick} className="fa-solid text-lg fa-rotate-right cursor-pointer text-gray-200 absolute top-1 right-2"></i>
                <textarea className='w-full max-w-md px-3 py-2 rounded placeholder-gray-500 border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="question" name="question" value={Qn} onChange={(e) => setQn(e.target.value)} placeholder="Question" required />

                <input className='w-full max-w-md px-3 py-2 rounded placeholder-gray-500 border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="option1" name="option1" value={Opt1} onChange={(e) => setOpt1(e.target.value)} placeholder="Option 1" required />

                <input className='w-full max-w-md px-3 py-2 rounded placeholder-gray-500 border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="option2" name="option2" value={Opt2} onChange={(e) => setOpt2(e.target.value)} placeholder="Option 2" required />

                <input className='w-full max-w-md px-3 py-2 rounded placeholder-gray-500 border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="option3" name="option3" value={Opt3} onChange={(e) => setOpt3(e.target.value)} placeholder="Option 3" required />

                <input className='w-full max-w-md px-3 py-2 rounded placeholder-gray-500 border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' type="text" id="option4" name="option4" value={Opt4} onChange={(e) => setOpt4(e.target.value)} placeholder="Option 4" required />

                <select className='w-full max-w-md px-3 py-2 rounded border border-gray-300 mt-2 focus:outline-none focus:border-gray-500' id="correctAnswer" name="correctAnswer" placeholder="Correct option" required>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                </select>

                <div className="flex items-center mt-2 w-full max-w-md px-3 py-2">
                    <label htmlFor="weight" className="block text-gray-700 mr-4">Weight (marks):</label>
                    <input
                        className='w-full placeholder-gray-500 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-gray-500'
                        type="number"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                        step={2}
                    />
                </div>

                <button type="submit" className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full max-w-md rounded mt-4'>Add Question</button>
            </form>



        </>
    );
}
