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
  const { getallAdmin, admin,update_admin } = context;
  useEffect(() => {
    getallAdmin();
  }, [])

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
    name:"",email:"",profession:"",phoneNo:""
  }
  value = useSelector((state) => state.set_admin.editdata);
  useEffect(() => {
    setName(value.name || '');
    setEmail(value.email || '');
    setProf(value.profession || '');
    setPhoneNo(value.phoneNo || '');
  }, [value]);

  const handleChanges = async()=>{
    
    await update_admin(admin[0]._id,name,email,phoneNo, prof);
    
    toast({
      title: "Success!",
      description: "Changes are saved. ",
    })
  }
 


  return (
    <div className='mt-9' >
      <Tabs defaultValue="account" className="w-[400px]  border border-black rounded-sm  mx-auto ">
        <TabsList className=" bg-   px-2 mt-1 ml-[100px]" >
          <TabsTrigger className="hover:bg-slate-200 text-black data-[state=active]:bg-slate-400 text-lg border  border-slate-400 " value="account">Profile</TabsTrigger>
          <TabsTrigger className="hover:bg-slate-200 text-black data-[state=active]:bg-slate-400 text-lg border border-slate-400" value="password" onClick={() => handleEdit(admin[0]._id, admin[0].name, admin[0].email, admin[0].phoneNo, admin[0].profession)}>Edit Profile </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className=" rounded-lg  shadow-md p-5    w-full ">
            <div className="flex items-center justify-center mb-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

            </div>
            {admin.length > 0 ? <div className="max-w-md rounded-md ">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 ">{admin[0].name}</h2>
              <div className="mb-2">
                <strong>Email : </strong><br />
                <div className=" border border-black mt-1 rounded p-2 w-full">{admin[0].email}</div>
              </div>
              <div className="mb-2">
                <strong>Profession :</strong><br />
                <div className="border border-black mt-1 rounded p-2 w-full">{admin[0].profession}</div>
              </div>
              <div className="mb-2">
                <strong>ContactNo .</strong><br />
                <div className=" border border-black mt-1 rounded p-2 w-full">{admin[0].phoneNo}</div>
              </div>
              <div className="mb-2">
                <strong>Role :</strong><br />
                <div className=" border border-black mt-1 rounded p-2 w-full">{admin[0].role}</div>
              </div>

            </div> : <Loader />}


          </div>
        </TabsContent>
        <TabsContent value="password" >
          <div className="max-w-md shadow-md rounded-md p-6">
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
            <div className="mb-2">
              <strong>Phone No:</strong><br />
              <input
                type="text"
                className="border bg-slate-100 rounded p-2 w-full"
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

export default View_AdminProfile
