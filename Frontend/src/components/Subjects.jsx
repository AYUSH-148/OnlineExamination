import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import examContext from '../context/exam/examContext'
import SubjectItem from './SubjectItem'
import AddSub from './AddSub';

export default function Subjects() {
    const context = useContext(examContext);
    const navigate = useNavigate();
    const { Sub, getallSubjects} = context;

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token')) {
                await getallSubjects();
            } else {
                navigate("/admin_login");
            }
        };
        fetchData();
    }, []);
    return (
        <>
        <AddSub/>
        <hr />
        <div className='pl-40 mt-20 text-2xl font-semibold'>Computer Science (Sc)</div>
        <div >
            {Sub.map((sub) => {
                return <SubjectItem key={sub._id} sub={sub}  />;
            })}
        </div>
        </>
    );
}

