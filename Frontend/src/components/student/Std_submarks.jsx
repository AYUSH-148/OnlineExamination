import React, { useContext, useEffect, useState } from 'react'
import ExamContext from '../../context/exam/examContext'
import { useParams } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
} from "../ui/table"
const Std_submarks = () => {
    const params = useParams();
    const context = useContext(ExamContext);
    const { id } = params;
    const { getallSubjects, Sub, get_marks, marks } = context;
    const [data, setData] = useState([]);
    const [total,setTotal] = useState(0);
    const [max_marks,setMax_marks] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            await getallSubjects();
            await get_marks();
        };
        fetchData();
    }, []);
    let counter = 0
    let total_marks = 0
    useEffect(() => {
        const newData = [];

        // Iterate over Sub and marks arrays
        Sub.forEach(sub => {
            const matchedMark = marks.find(mark => mark.subject === sub._id && mark.student === id);
            if (matchedMark) {
                // Construct the JSON object
                counter = counter + matchedMark.marks; 
                total_marks = total_marks + sub.max_marks;
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
        setMax_marks(total_marks)
        // Update the data state
        setData(newData);
    }, [Sub, marks, id]);

    return (
        <div className='w-[70vw]'>
           { data.length>0?<Table  >
                <TableCaption>A list of recent marks updates.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead >Subject</TableHead>
                        <TableHead >Correct Attempts</TableHead>
                        <TableHead >Total (Questions)</TableHead>
                        <TableHead >Max. Marks <bold>({max_marks})</bold> </TableHead>
                        <TableHead  className="text-auto">Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell >{item.correct_attempts}</TableCell>
                            <TableCell>{item.total_qns}</TableCell>
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
            </Table>: 
            <p className='text-xl my-10 ml-32 text-red-600 bg-slate-400 text-center ' > Give tests to see stats </p>
        }
        </div>

    );

}

export default Std_submarks
