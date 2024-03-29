import React, { useContext, useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import ExamContext from '../context/exam/examContext';
import Loader from './Loader';

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
                <div  className="bg-none mx-10 rounded-sm mb-16"><h1 className='pr-32 text-center py-7 text-2xl font-semibold underline'>Computer Science</h1>
                    <hr />
                    <div className='flex flex-wrap '>
                        {Array.from(tdata.cs).map((row) => (

                            <div className=" rounded-lg shadow-md p-6  my-8 md:w-1/4 mx-10 bg-slate-50">
                                <div className="flex items-center justify-center mb-4">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                </div>
                                <div >
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">{row.name}</h2>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Roll No:</b> {row.rollNo}</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Email: </b>{row.email}</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Address: </b>123 Main Street, City</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Phone No:</b> {row.phoneNo}</p>
                                </div>
                            </div>


                        ))}
                    </div>
                </div>
               
                <br />
                <div className="bg-none mx-10 rounded-sm mb-16"><h1 className=' py-7 pr-32 text-center  text-2xl font-semibold underline'>Information Technology</h1>
                <hr />
                    <div className='flex flex-wrap bg-none '>
                        {Array.from(tdata.it).map((row) => (

                            <div className=" rounded-lg shadow-md p-6 mx-10 my-8 md:w-1/4 bg-slate-50">
                                <div className="flex items-center justify-center mb-4">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                </div>
                                <div >
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">{row.name}</h2>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Roll No: </b>{row.rollNo}</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Email: </b>{row.email}</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Address:</b> 123 Main Street, City</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Phone No:</b> {row.phoneNo}</p>
                                </div>
                            </div>


                        ))}
                    </div>
                </div>
               
                <br />
                <div className="bg-none  mx-10 rounded-sm mb-16"><h1 className=' py-7 pr-32 text-center text-2xl font-semibold underline' >Electronics Engneering</h1>
                <hr />
                    <div className='flex flex-wrap bg-none '>
                        {Array.from(tdata.eee).map((row) => (

                            <div className=" rounded-lg shadow-md p-6 mx-10 my-8 md:w-1/4 bg-slate-50">
                                <div className="flex items-center justify-center mb-4">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                </div>
                                <div >
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">{row.name}</h2>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Roll No: </b>{row.rollNo}</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Email:</b> {row.email}</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Address: </b>123 Main Street, City</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Phone No:</b> {row.phoneNo}</p>
                                </div>
                            </div>


                        ))}
                    </div>
                </div>
               
                <br />
                <div className="bg-none  mx-10 rounded-sm mb-16"><h1 className=' py-7 pr-32 text-center  text-2xl font-semibold underline'>Mathematics & Computing</h1>
                <hr />
                    <div className=' flex flex-wrap '>
                        {Array.from(tdata.mnc).map((row) => (

                            <div className=" rounded-lg shadow-md p-6 mx-10 my-8 md:w-1/4 bg-slate-50">
                                <div className="flex items-center justify-center mb-4">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                </div>
                                <div >
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2 ">{row.name}</h2>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Roll No:</b> {row.rollNo}</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Email: </b>{row.email}</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Address:</b> 123 Main Street, City</p>
                                    <p className="text-lg font-semibold text-gray-600 mb-2"><b>Phone No:</b> {row.phoneNo}</p>
                                </div>
                            </div>


                        ))}
                    </div>
                </div></>)
                : <Loader />}

        </>
    )

}
export default Students_list;
