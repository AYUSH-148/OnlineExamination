import React, { useContext, useEffect, useState } from 'react';
import ExamContext from '../../context/exam/examContext';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
} from "../ui/table";

const StdSubmarks= (props) => {
    const context = useContext(ExamContext);
    const { Sub, id } = props;
    const { get_marks, marks } = context;
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            await get_marks();
        };
        fetchData();
    }, [get_marks, marks]);

    useEffect(() => {
        let counter = 0;
        let total_marks = 0;
        const newData = [];

        Sub.forEach(sub => {
            const matchedMark = marks.find(mark => mark.subject === sub._id && mark.student === id);
            if (matchedMark) {
                counter += matchedMark.marks;
                total_marks += sub.max_marks;

                const newDataItem = {
                    name: sub.name,
                    correct_attempts: matchedMark.count_qns,
                    total_qns: sub.length,
                    max_marks: sub.max_marks,
                    score: matchedMark.marks
                };
                newData.push(newDataItem);
            }
        });

        setTotal(counter);
        setData(newData);
    }, [Sub, marks, id]);

    return (
        <div className='w-[70vw]'>
            {data.length > 0 ? (
                <Table>
                    <TableCaption>A list of recent marks updates.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Total (Questions)</TableHead>
                            <TableHead>Correct Attempts</TableHead>
                            <TableHead>Max. Marks</TableHead>
                            <TableHead className="text-auto">Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.total_qns}</TableCell>
                                <TableCell>{item.correct_attempts}</TableCell>
                                <TableCell>{item.max_marks}</TableCell>
                                <TableCell className="text-auto">{item.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total Score</TableCell>
                            <TableCell className="text-auto">{total}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            ) : (
                <div className='text-3xl text-white py-8 bg-gray-500 my-8 h-28 ml-14  rounded-md border-2 border-black text-center'>
                    <p>Give tests to see stats ...</p>
                </div>
            )}
        </div>
    );
};

export default StdSubmarks;
