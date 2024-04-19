import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import {  useNavigate } from 'react-router-dom';
import ExamContext from '../../context/exam/examContext';

const PerQnStats = (props) => {
    const navigate = useNavigate();
   
    const context = useContext(ExamContext);
    const {Sub,id} = props;
    const { get_marksPerStd, Qnmarks} = context;

    useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token')) {
                await get_marksPerStd();
            } else {
                navigate("/student_login");
            }
        };
        fetchData();
    },[Qnmarks]);

    const [data, setData] = useState({});
    const [totalScores, setTotalScores] = useState({});

    useEffect(() => {
        if (Sub.length > 0 && Qnmarks.length > 0) {
            const newData = {};
            const newTotalScores = {};
            Sub.forEach(sub => {
                const qnData = Qnmarks.filter(qn => qn.subject === sub._id && qn.student === id)
                    .map((qn, index) => ({ qn_nos: index + 1, score: qn.marks, max_marks: qn.max_marks }));

                if (qnData.length > 0) {
                    newData[sub.name] = qnData;
                    // Calculate total score for the subject
                    const totalScore = qnData.reduce((acc, curr) => acc + curr.score, 0);
                    newTotalScores[sub.name] = totalScore;
                }
            });
            setData(newData);
            setTotalScores(newTotalScores);
        }
    }, [ Qnmarks ]);


    return (
        <>
        <div className='ml-16 w-[80vw] flex flex-wrap gap-5  '>
            
            {Object.keys(data).length > 0 && Object.keys(data).map((subjectName, index) => (
                <div key={index} className='w-1/4 overflow-x-hidden'>
                    <Table >
                        <TableCaption><h2 className='font-semibold text-black'>{subjectName}</h2></TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Qno.</TableHead>
                                <TableHead>Max_marks</TableHead>
                                <TableHead>Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data[subjectName].map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{item.qn_nos}</TableCell>
                                    <TableCell>{item.max_marks}</TableCell>
                                    <TableCell>{item.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={2} className="text-sm">Total </TableCell>
                                <TableCell className="text-left">{totalScores[subjectName]}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            ))}
        </div>
        </>
    );

};

export default PerQnStats;
