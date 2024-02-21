import React from 'react';
import { useNavigate } from 'react-router';

export default function Std_SubjectItem(props) {
   
    const navigate = useNavigate();
    const { sub,std_id } = props;
    const handleQns = (sub)=>{
        navigate(`/${std_id}/std_questions/${sub._id}`);
    }
    return (
        <>
            <div>
                <button className='  bg-slate-100 w-4/5 m-auto mt-10 rounded-md py-2 flex justify-between text-black items-center hover:bg-slate-200 border border-thin'  onClick={() => handleQns(sub)}  >
                    <div>
                        <div > Duration: {sub.duration.hours}:{sub.duration.minutes}:{sub.duration.seconds}</div>
                        <div className='mt-2'>{sub.code}</div>
                    </div>
                    <h2 className='font-bold text-lg'>{sub.name}</h2>
                    <h2>Nos of Questions: 5</h2>
                </button>
            </div>
        </>
    );
}
