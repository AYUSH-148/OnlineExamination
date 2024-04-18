import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import ExamContext from '../../context/exam/examContext'
import Loader from '../Loader'
import { adminActions } from '../../store/admin'
import { useToast } from "../ui/use-toast"
const View_AdminProfile = () => {
  const { toast } = useToast()
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [prof, setProf] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const dispatch = useDispatch();
  let context = useContext(ExamContext);
  const { getallAdmin, admin, update_admin } = context;
  useEffect(() => {
    getallAdmin();
  }, [admin])

  const handleEdit = (id, name, email, phoneNo, profession) => {
    let data = {
      _id: id,
      name: name,
      email: email,
      phoneNo: phoneNo,
      profession: profession
    }
    dispatch(adminActions.setEditdata(data));

  }
  let value = {
    name: "", email: "", profession: "", phoneNo: ""
  }
  value = useSelector((state) => state.set_admin.editdata);
  useEffect(() => {
    setName(value.name || '');
    setEmail(value.email || '');
    setProf(value.profession || '');
    setPhoneNo(value.phoneNo || '');
  }, [value]);

  const handleChanges = async () => {

    await update_admin(admin[0]._id, name, email, phoneNo, prof);

    toast({
      title: "Success!",
      description: "Changes are saved. ",
    })
  }



  return (
    <div className='mt-16  '>
      <Tabs defaultValue="account" className="w-[30vw] rounded-sm mx-auto ">
        <TabsList className="bg-white mt-1 mb-6 flex space-x-4">
          <TabsTrigger className=" text-black text-lg border border-slate-400 px-4 py-2 rounded-md w-1/3" value="account">Profile</TabsTrigger>
          <TabsTrigger className=" text-black text-lg border border-slate-400 px-4 py-2 rounded-md w-1/3" value="password" onClick={() => handleEdit(admin[0]._id, admin[0].name, admin[0].email, admin[0].phoneNo, admin[0].profession)}>Edit Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="account" >
          <div className="max-w-md mx-auto  rounded-md p-5 bg-white h-[50vh] shadow-lg">
            <div className="flex items-center justify-center mx-auto my-4 mb-5 ">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            {admin.length > 0 ? <div className=" rounded-md ">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{admin[0].name}</h2>
              <div className="mb-4 flex justify-between">
                <div>
                  <strong>Email :</strong><br />
                  <div className="bg-slate-100 rounded p-2 my-2 w-[180px]">{admin[0].email}</div>
                </div>
                <div>
                  <strong>Profession :</strong><br />
                  <div className="bg-slate-100 rounded p-2 my-2 w-[180px]">{admin[0].profession}</div>
                </div>
              </div>
              <div className="mb-3 flex justify-between">
                <div>
                  <strong>Contact No :</strong><br />
                  <div className="bg-slate-100 rounded p-2 my-2  w-[180px]">{admin[0].phoneNo}</div>
                </div>
                <div>
                  <strong>Role :</strong><br />
                  <div className="bg-slate-100 rounded p-2 my-2 w-[180px]">{admin[0].role}</div>
                </div>
              </div>
            </div> : <Loader />}
          </div>

        </TabsContent>
        <TabsContent value="password">
          <div className="max-w-md shadow-lg rounded-md p-5 ">
            <div className="mb-2">
              <strong>Name:</strong><br />
              <input
                type="text"
                className="border bg-slate-100 rounded p-2 w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <strong>Email:</strong><br />
              <input
                type="text"
                className="border bg-slate-100 rounded p-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <strong>Profession:</strong><br />
              <input
                type="text"
                className="border bg-slate-100 rounded p-2 w-full"
                value={prof}
                onChange={(e) => setProf(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <strong>Phone No:</strong><br />
              <input
                type="text"
                className="border bg-slate-100 rounded p-2 w-full"
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

export default View_AdminProfile
