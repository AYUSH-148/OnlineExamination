import React, { useContext } from 'react';
import examContext from '../context/exam/examContext'
import { useNavigate } from 'react-router';

export default function SubjectItem(props) {
    const context = useContext(examContext);
    const navigate = useNavigate();
    const { deleteSubject } = context;
    const { sub } = props;
    const handleDelete = async(sub) => {
        console.log("Deleting...")
        await deleteSubject(sub._id);
    }
    const handleQns = (sub)=>{
        navigate(`/questions/${sub._id}`)
    }
    return (
        <>
            <div className='pl-4 bg-slate-100 hover:bg-slate-200 w-4/5 m-auto my-10 rounded-md py-2 flex justify-between border border-thin'>
                <button className='sub_btn w-2/4 bg-slate-100 text-black hover:bg-slate-100 flex justify-between items-center  pb-4 rounded-md my-auto pr-20'  onClick={() => handleQns(sub)}  >
                    <div className='text-base  '>
                        <div className='mt-2'>Code: {sub.code}</div>
                        <div>Duration: {sub.duration.hours}:{sub.duration.minutes}:{sub.duration.seconds}</div>
                    </div>
                    <h4 className='font-bold text-lg '>{sub.name}</h4>

                </button>
                <button onClick={() => handleDelete(sub)}    className='mt-3 bg-slate-100 hover:bg-slate-200 text-black mb-4 mr-10'  ><i className="fa-solid fa-trash  text-lg "></i></button>

               
            </div>
        </>
    );
}
