import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import examContext from '../../context/exam/examContext'
import SubjectItem from './SubjectItem'
import AddSub from './AddSub';


export default function Subjects() {
    let subjectList = [[], [], [], []]
    const context = useContext(examContext);
    const navigate = useNavigate();
    const { Sub, getallSubjects } = context;

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token')) {
                await getallSubjects();
            } else {
                navigate("/admin_login");
            }
        };
        fetchData();
    }, [Sub]);
    Sub.map((sub) => {
        if (sub.code.startsWith("MnC")) {
            subjectList[3].push(sub);
        }
        else if (sub.code.startsWith("IT")) {
            subjectList[2].push(sub);
        }
        else if (sub.code.startsWith("EEE")) {
            subjectList[1].push(sub);
        }
        else {
            subjectList[0].push(sub);
        }

    })
    return (
        <>
            <AddSub />
            <hr />
            <div className='ml-20'>
                <div className='pl-10 mt-20 text-2xl font-semibold'>Computer Science (Sc)</div>
                <div className='flex flex-wrap gap-x-3 ' >
                    {subjectList[0].map((sub) => {
                        return <SubjectItem key={sub._id} sub={sub} />;
                    })}
                </div>

                <div className='pl-10 mt-20 text-2xl font-semibold'>Electronics Enginnering (EEE)</div>
                <div className='flex flex-wrap  gap-x-3' >
                    {subjectList[1].map((sub) => {
                        return <SubjectItem key={sub._id} sub={sub} />;
                    })}
                </div>
                <div className='pl-10 mt-20 text-2xl font-semibold'>Insformation Technology(IT)</div>
                <div className='flex flex-wrap gap-x-3' >
                    {subjectList[2].map((sub) => {
                        return <SubjectItem key={sub._id} sub={sub} />;
                    })}
                </div>
                <div className='pl-10 mt-20 text-2xl font-semibold'>Mathematics And Computing(MnC)</div>
                <div className='flex flex-wrap gap-x-3' >
                    {subjectList[3].map((sub) => {
                        return <SubjectItem key={sub._id} sub={sub} />;
                    })}
                </div>

            </div>

        </>
    );
}

