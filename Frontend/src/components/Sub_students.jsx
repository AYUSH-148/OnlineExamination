import React,{useContext,useEffect} from 'react';
import { useNavigate } from 'react-router';
import Std_SubjectItem from './std_subjectItem';
import ExamContext from '../context/exam/examContext';
import { useParams } from 'react-router-dom';
export default function Sub_students() {
    const { stdId } = useParams();
    const context = useContext(ExamContext)
    const { Sub, getallSubjects } = context;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token')) {
                await getallSubjects();
            } else {
                navigate("/student_login");
            }
        };
       
        fetchData();
    }, []);
    // console.log(Sub);

    return (
        <div>
            <h3>Subjects</h3>
            <div>
                {Sub.map((sub) => {
                    return <Std_SubjectItem key={sub._id} sub={sub} std_id = {stdId} />;
                })}
            </div>
        </div>
    );
}
