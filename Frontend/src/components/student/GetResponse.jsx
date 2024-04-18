import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams,Link } from 'react-router-dom';
import ExamContext from '../../context/exam/examContext';
export default function GetResponse() {
    const context = useContext(ExamContext);
    const { update_marks, update_marksPerQn } = context;
    const params = useParams();
    const { subId, std_id } = params;
    const ansArray = useSelector((state) => state.showQns.AnsArray);

    var marks = 0;
    var count = 0;

    useEffect(() => {
        const run = async () => {
            for (let i = 0; i < ansArray.length; i++) {
                await update_marksPerQn(subId, ansArray[i].qn_id, ansArray[i].marks);
            }
        };
        run();
    }, []);

    for (let i = 0; i < ansArray.length; i++) {
        if (ansArray[i].ans == 'true') {
            marks += ansArray[i].marks;
            count++;
        }
    }
    const get_marks = async (subId, marks, count) => {
        await update_marks(subId, marks, count);
    }
    get_marks(subId, marks, count);
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    return (
        <>
            <div className='flex w-1/2 mx-auto gap-x-44 mt-20  items-center '>
                <div className='text-center text-4xl mt-10 font-bold  mb-8'> Your response is recorded!</div>
                <Link to={`/student_home/${std_id}`}>
                    <i className="fa-solid fa-house text-2xl mt-2"></i>
                </Link>
            </div>

            <div className='mt-20 ml-[25%] text-lg '>
                <p><span className='font-semibold'>Date of Submission: </span>  {currentDate}</p>
                <p><span className='font-semibold'> Time of Submission:</span> {currentTime}</p>
                <p className='mt-4'>Thanks for attempting test! <i className="fa-solid fa-face-smile" style={{color: "#FFD43B"}}></i></p>
            </div>


        </>
    )
}
