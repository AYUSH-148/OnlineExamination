import React, { useState, useEffect, useContext } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import ExamContext from '../../context/exam/examContext';
import Loader from '../Loader';


const Stds_marks = () => {

  const [tdata, setTdata] = useState({
    cs: new Set(),
    it: new Set(),
    eee: new Set(),
    mnc: new Set()
  });

  const context = useContext(ExamContext);
  const { marks, get_marks, getallStudents, Stds, getallSubjects, Sub } = context;
  useEffect(() => {
    const fetchData = async () => {
      await get_marks();
      await getallStudents();
      await getallSubjects();
    };
    fetchData();
  }, []);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setData();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [marks, Stds, Sub]);

  const setData = () => {
    setTdata(prevState => {
      const newState = {
        cs: new Set(prevState.cs),
        it: new Set(prevState.it),
        eee: new Set(prevState.eee),
        mnc: new Set(prevState.mnc)
      };

      marks.forEach(mark => {
        const sub = Sub.find(sub => sub._id === mark.subject);
        const std = Stds.find(std => std._id === mark.student);

        if (sub && std) {
          const row = {
            rollNo: std.rollNo,
            name: std.name,
            subject: sub.name,
            code: sub.code,
            count: mark.count_qns,
            score: mark.marks,
            tos: mark.time,
            dos: mark.date,
          };

          if (sub.code.startsWith("MnC")) {
            newState.mnc.add(row);
          } else if (sub.code.startsWith("Cs")) {
            newState.cs.add(row);
          } else if (sub.code.startsWith("IT")) {
            newState.it.add(row);
          } else {
            newState.eee.add(row);
          }
        }
      });

      return newState;
    });
  };



  return (
    <>
      {tdata.cs.size >0 ||tdata.it.size > 0 ||tdata.eee.size >0 ||tdata.mnc.size > 0  ? (<><h1 className='pr-32 text-center my-10 text-2xl font-semibold'>Computer Science</h1><Table className="mt-5 ">
        <TableCaption>Updated List of Students</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">RollNo.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-[130px]">Subject</TableHead>
            <TableHead className="w-[140px]">Correct answers ( / 5)</TableHead>
            <TableHead className=" px-10 w-[120px] ">Score ( / 10)</TableHead>
            <TableHead className="text-center w-[200px]">Time of Submission</TableHead>
            <TableHead>Date of Submission</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(tdata.cs).map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium w-[140px]">{row.rollNo}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell className="w-[130px]">{row.subject} <span> ({row.code})</span></TableCell>
              <TableCell className="w-[140px]">{row.count}</TableCell>
              <TableCell className=" px-10 w-[120px] ">{row.score}</TableCell>
              <TableCell className="text-center w-[200px]">{row.tos}</TableCell>
              <TableCell>{row.dos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table><hr /><h1 className='pr-32 text-center my-10 text-2xl font-semibold'>Electroincs Engineering</h1><Table className="mt-5 ">
          <TableCaption>Updated List of Students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">RollNo.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[130px]">Subject</TableHead>
              <TableHead className="w-[140px]">Correct answers ( / 5)</TableHead>
              <TableHead className=" px-10 w-[120px] ">Score ( / 10)</TableHead>
              <TableHead className="text-center w-[200px]">Time of Submission</TableHead>
              <TableHead>Date of Submission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from(tdata.eee).map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium w-[140px]">{row.rollNo}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell className="w-[130px]">{row.subject} <span> ({row.code})</span></TableCell>
                <TableCell className="w-[140px]">{row.count}</TableCell>
                <TableCell className=" px-10 w-[120px] ">{row.score}</TableCell>
                <TableCell className="text-center w-[200px]">{row.tos}</TableCell>
                <TableCell>{row.dos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table><hr /><h1 className='pr-32 text-center my-10 text-2xl font-semibold'>Mathematics & Computing</h1><Table className="mt-5 ">
          <TableCaption>Updated List of Students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">RollNo.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[130px]">Subject</TableHead>
              <TableHead className="w-[140px]">Correct answers ( / 5)</TableHead>
              <TableHead className=" px-10 w-[120px] ">Score ( / 10)</TableHead>
              <TableHead className="text-center w-[200px]">Time of Submission</TableHead>
              <TableHead>Date of Submission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from(tdata.mnc).map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium w-[140px]">{row.rollNo}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell className="w-[130px]">{row.subject} <span> ({row.code})</span></TableCell>
                <TableCell className="w-[140px]">{row.count}</TableCell>
                <TableCell className=" px-10 w-[120px] ">{row.score}</TableCell>
                <TableCell className="text-center w-[200px]">{row.tos}</TableCell>
                <TableCell>{row.dos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table><hr /><h1 className='pr-32 text-center my-10 text-2xl font-semibold'>Information Texhnology</h1><Table className="mt-5 ">
          <TableCaption>Updated List of Students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">RollNo.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[130px]">Subject</TableHead>
              <TableHead className="w-[140px]">Correct answers ( / 5)</TableHead>
              <TableHead className=" px-10 w-[120px] ">Score ( / 10)</TableHead>
              <TableHead className="text-center w-[200px]">Time of Submission</TableHead>
              <TableHead>Date of Submission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from(tdata.it).map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium w-[140px]">{row.rollNo}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell className="w-[130px]">{row.subject} <span> ({row.code})</span></TableCell>
                <TableCell className="w-[140px]">{row.count}</TableCell>
                <TableCell className=" px-10 w-[120px] ">{row.score}</TableCell>
                <TableCell className="text-center w-[200px]">{row.tos}</TableCell>
                <TableCell>{row.dos}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </>) : <Loader />}
      
      </>
  )
}

export default Stds_marks
