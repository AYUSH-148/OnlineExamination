import React, { useContext,useEffect } from 'react'
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import ExamContext from '../../context/exam/examContext';
export default function GetResponse() {
    const context = useContext(ExamContext);
    const {  update_marks ,update_marksPerQn} = context;
    const params = useParams();
    const { subId } = params;
    const ansArray = useSelector((state) => state.showQns.AnsArray);
    
    var marks = 0;
    var count = 0;
    
    useEffect(() => {
        const run = async() => {
            for (let i = 0; i < ansArray.length; i++) {
                await update_marksPerQn(subId,ansArray[i].qn_id,ansArray[i].marks);
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
            <div className='text-center text-4xl mt-10 font-bold  mb-8'> Your response is recorded!</div>
            <div className='mt-20 ml-10 font-semibold'>
                <p>Date of Submission: {currentDate}</p>
                <p>Time of Submission: {currentTime}</p>
            </div>

        </>
    )
}
