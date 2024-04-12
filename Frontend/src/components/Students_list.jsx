import React, { useContext, useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import ExamContext from '../context/exam/examContext';
import Loader from './Loader';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
const Students_list = () => {
    const context = useContext(ExamContext);
    const { getallStudents, Stds } = context;
    const [tdata, setTdata] = useState({
        cs: new Set(),
        it: new Set(),
        eee: new Set(),
        mnc: new Set()
    });
    useEffect(() => {
        const fetchData = async () => {
            await getallStudents();
        };
        fetchData();
    }, []);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setData();
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [Stds]);

    const setData = () => {
        setTdata(prevState => {
            const newState = {
                cs: new Set(prevState.cs),
                it: new Set(prevState.it),
                eee: new Set(prevState.eee),
                mnc: new Set(prevState.mnc)
            };

            Stds.forEach(std => {

                if (std.rollNo.includes("MnC")) {
                    newState.mnc.add(std);
                } else if (std.rollNo.includes("Cs")) {
                    newState.cs.add(std);
                } else if (std.rollNo.includes("IT")) {
                    newState.it.add(std);
                } else {
                    newState.eee.add(std);
                }

            });

            return newState;
        });
    }
    return (
        <>
            {tdata.cs.size > 0 || tdata.it.size > 0 || tdata.eee.size > 0 || tdata.mnc.size > 0 ? (<>
                <div className="bg-none mx-10 rounded-sm mb-16"><h1 className='pr-32 text-center mt-4 text-3xl font-semibold '>Computer Science</h1>
                    <div className='flex flex-wrap '>

                        <Table >
                            <TableCaption>Updated List of Students</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sr no.</TableHead>
                                    <TableHead >Name</TableHead>
                                    <TableHead>Roll No.</TableHead>
                                    <TableHead >Mail </TableHead>
                                    <TableHead>Contact no.</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from(tdata.cs).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell >{index + 1} </TableCell>
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell>{row.rollNo}</TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell >{row.phoneNo}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </div>
                <hr />

                <br />
                <div className="bg-none mx-10 rounded-sm mb-16"><h1 className=' py-7 pr-32 text-center  text-3xl font-semibold '>Information Technology</h1>
                    <div className='flex flex-wrap bg-none '>
                        <Table >
                            <TableCaption>Updated List of Students</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Sr no.</TableHead>
                                    <TableHead >Name</TableHead>
                                    <TableHead>Roll No.</TableHead>
                                    <TableHead >Mail </TableHead>
                                    <TableHead>Contact no.</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from(tdata.it).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell >{index + 1} </TableCell>
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell>{row.rollNo}</TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell >{row.phoneNo}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <hr />

                <br />
                <div className="bg-none  mx-10 rounded-sm mb-16"><h1 className=' py-7 pr-32 text-center text-3xl font-semibold ' >Electronics Engneering</h1>
                    <div className='flex flex-wrap bg-none '>
                        <Table >
                            <TableCaption>Updated List of Students</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Sr no.</TableHead>
                                    <TableHead >Name</TableHead>
                                    <TableHead>Roll No.</TableHead>
                                    <TableHead >Mail </TableHead>
                                    <TableHead>Contact no.</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from(tdata.eee).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell >{index + 1} </TableCell>
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell>{row.rollNo}</TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell >{row.phoneNo}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <hr />

                <br />
                <div className="bg-none  mx-10 rounded-sm mb-16"><h1 className=' py-7 pr-32 text-center  text-3xl font-semibold '>Mathematics & Computing</h1>
               
                    <div className=' flex flex-wrap '>
                        <Table >
                            <TableCaption>Updated List of Students</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Sr no.</TableHead>
                                    <TableHead >Name</TableHead>
                                    <TableHead>Roll No.</TableHead>
                                    <TableHead >Mail </TableHead>
                                    <TableHead>Contact no.</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from(tdata.mnc).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell >{index + 1} </TableCell>
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell>{row.rollNo}</TableCell>
                                        <TableCell >{row.email}</TableCell>
                                        <TableCell >{row.phoneNo}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div></>)
                : <Loader />}

        </>
    )

}
export default Students_list;
