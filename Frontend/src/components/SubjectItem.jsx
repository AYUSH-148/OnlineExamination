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
            <div>
                <button className='sub_btn'  onClick={() => handleQns(sub)}  >
                    <h4>{sub.name}</h4>
                    <div>code: {sub.code}</div>
                    <div>{sub.duration.hours}:{sub.duration.minutes}:{sub.duration.seconds}</div>
                </button>
               
                <button onClick={() => handleDelete(sub)}>Del</button>
            </div>
        </>
    );
}
