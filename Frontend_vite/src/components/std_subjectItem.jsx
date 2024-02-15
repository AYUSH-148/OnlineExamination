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
                <button className='sub_btn'  onClick={() => handleQns(sub)}  >
                    <h4>{sub.name}</h4>
                    <div>code: {sub.code}</div>
                    <div>{sub.duration.hours}:{sub.duration.minutes}:{sub.duration.seconds}</div>
                </button>
            </div>
        </>
    );
}
