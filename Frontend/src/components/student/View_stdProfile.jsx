import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ExamContext from '../../context/exam/examContext';
import Loader from '../Loader';
import { useToast } from "../ui/use-toast";
import { studentActions } from '../../store/student';

const View_stdProfile = () => {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const dispatch = useDispatch();

    let context = useContext(ExamContext);
    const { OneStd, getStudent, update_std } = context;

    useEffect(() => {
        getStudent();
    }, [OneStd]);

    const handleEdit = (id, name, rollNo, email, phoneNo) => {
        let data = {
            _id: id,
            name: name,
            email: email,
            phoneNo: phoneNo,
            rollNo: rollNo
        }
        dispatch(studentActions.setEditdata(data));
    }

    let value = useSelector((state) => state.set_student.editdata);
    useEffect(() => {
        setName(value.name || '');
        setEmail(value.email || '');
        setRollNo(value.rollNo || '');
        setPhoneNo(value.phoneNo || '');
    }, [value]);

    const handleChanges = async () => {
        await update_std(name,rollNo,email,phoneNo);
        toast({
            title: "Success!",
            description: "Changes are saved.",
        })
    }

    return (
        <div className='mt-9'>
            <Tabs defaultValue="profile" className="w-[400px] border border-black rounded-sm mx-auto">
                <TabsList className="bg-[#E5E7EB] px-2 mt-1 ml-[100px]">
                    <TabsTrigger className="hover:bg-slate-200 text-black data-[state=active]:bg-slate-400 text-lg border border-slate-400" value="profile">Profile</TabsTrigger>
                    <TabsTrigger className="hover:bg-slate-200 text-black data-[state=active]:bg-slate-400 text-lg border border-slate-400" value="edit" onClick={() => { handleEdit(OneStd._id, OneStd.name, OneStd.rollNo, OneStd.email, OneStd.phoneNo) }}>Edit Profile</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <div className="rounded-lg shadow-md p-5 w-full">
                        <div className="flex items-center justify-center mb-5">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        {OneStd && <div className="max-w-md rounded-md ">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-5">{OneStd.name}</h2>
                            <div className="mb-2">
                                <strong>RollNo : </strong><br />
                                <div className="border border-black mt-1 rounded p-2 w-full">{OneStd.rollNo}</div>
                            </div>
                            <div className="mb-2">
                                <strong>Email : </strong><br />
                                <div className="border border-black mt-1 rounded p-2 w-full">{OneStd.email}</div>
                            </div>
                            <div className="mb-2">
                                <strong>ContactNo :</strong><br />
                                <div className="border border-black mt-1 rounded p-2 w-full">{OneStd.phoneNo}</div>
                            </div>
                            <div className="mb-2">
                                <strong>Role :</strong><br />
                                <div className="border border-black mt-1 rounded p-2 w-full">{OneStd.role}</div>
                            </div>
                        </div>}
                    </div>
                </TabsContent>
                <TabsContent value="edit">
                    <div className="max-w-md shadow-md rounded-md p-6">
                        <div className="mb-2">
                            <strong>Name:</strong><br />
                            <input
                                type="text"
                                className="border bg-[#E5E7EB] rounded p-2 w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <strong>RollNo:</strong><br />
                            <input
                                type="text"
                                className="border bg-[#E5E7EB] rounded p-2 w-full"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <strong>Email:</strong><br />
                            <input
                                type="text"
                                className="border bg-[#E5E7EB] rounded p-2 w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <strong>Phone No:</strong><br />
                            <input
                                type="text"
                                className="border bg-[#E5E7EB] rounded p-2 w-full"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>
                        <button className='bg-slate-400 w-full mx-0 text-black font-bold hover:bg-slate-500' onClick={handleChanges}>SAVE CHANGES</button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default View_stdProfile;
