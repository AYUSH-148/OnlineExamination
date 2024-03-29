import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import Loader from '../Loader';

import ExamContext from '../../context/exam/examContext';
const Subject_stats = () => {
  const [tdata, setTdata] = useState([]); 
  const params = useParams();
  const { subId } = params;
  const context = useContext(ExamContext);
  const { sub_marks, getallStudents, Stds, getmarksPerSub } = context;
  useEffect(() => {
    const fetchData = async () => {
      await getmarksPerSub(subId);
      await getallStudents();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setData();
    }, 1000);
  return () => clearTimeout(timeoutId);
    
  }, [Stds,sub_marks]);
  const setData = () =>{
    sub_marks.forEach((marks) => {
      Stds.forEach((std) => {
        if (marks.student === std._id) {

          const row = {
            rollNo: std.rollNo,
            name: std.name,
            count: marks.count_qns,
            score: marks.marks,
            tos: marks.time,
            dos: marks.date,
          };
          setTdata((prevData) => [...prevData, row]);

        }
      });
    });
  }

  return (
    <>
      <Table className="mt-5">
        <TableCaption>Updated List of Students</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">RollNo.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="px-0 w-1/6">Correct answers ( / 5)</TableHead>
            <TableHead className="ml-0 px-0">Score ( / 10)</TableHead>
            <TableHead className="px-0 w-1/6">Time of Submission</TableHead>
            <TableHead>Date of Submission</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tdata.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{row.rollNo}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell className="px-0 w-1/6">{row.count}</TableCell>
              <TableCell className="ml-0 px-0">{row.score}</TableCell>
              <TableCell className="px-0 w-1/6">{row.tos}</TableCell>
              <TableCell>{row.dos}</TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </>
  );
};

export default Subject_stats;
