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
        <div >
        <Tabs defaultValue="profile" className="w-[400px] rounded-sm mx-auto h-[58vh]">
          <TabsList className="bg-white  mt-1  flex space-x-4">
            <TabsTrigger className="hover:bg-slate-200 text-black text-lg border border-slate-400 px-4 py-2 rounded-md w-1/3 " value="profile">Profile</TabsTrigger>
            <TabsTrigger className="hover:bg-slate-200 text-black text-lg border border-slate-400 px-4 py-2 rounded-md w-1/3 " value="edit" onClick={() => { handleEdit(OneStd._id, OneStd.name, OneStd.rollNo, OneStd.email, OneStd.phoneNo) }}>Edit</TabsTrigger>
          </TabsList>
          <TabsContent value="profile"  >
            <div className="rounded-lg p-5">
              <div className="flex items-center justify-center my-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              {OneStd && 
              <div className="max-w-md rounded-md ">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{OneStd.name}</h2>
                <div className="mb-4 flex justify-between ">
                  <div>
                    <strong>RollNo :</strong><br />
                    <div className="bg-[#E5E7EB] rounded p-2 w-[150px]">{OneStd.rollNo}</div>
                  </div>
                  <div>
                    <strong>Email :</strong><br />
                    <div className="bg-[#E5E7EB] rounded p-2 w-[180px]">{OneStd.email}</div>
                  </div>
                </div>
                <div className="mb-3 flex justify-between">
                  <div>
                    <strong>Contact No :</strong><br />
                    <div className="bg-[#E5E7EB] rounded p-2 w-[150px]">{OneStd.phoneNo}</div>
                  </div>
                  <div>
                    <strong>Role :</strong><br />
                    <div className="bg-[#E5E7EB] rounded p-2 w-[180px]">{OneStd.role}</div>
                  </div>
                </div>
              </div>}
            </div>
          </TabsContent>
          <TabsContent value="edit">
            <div className="max-w-md rounded-md p-5">
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
              <div className="mb-6">
                <strong>Phone No:</strong><br />
                <input
                  type="text"
                  className="border bg-[#E5E7EB] rounded p-2 w-full"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <button className='bg-slate-400 w-full mx-0 text-black font-bold hover:bg-slate-500 py-2 rounded-md' onClick={handleChanges}>SAVE CHANGES</button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
}

export default View_stdProfile;
