import React, { useContext, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Dialog,
  DialogContent,


  DialogTrigger,
} from "../ui/dialog"
import View_stdProfile from './View_stdProfile'
import ExamContext from '../../context/exam/examContext'


const HomeSidebar = (props) => {
  const context = useContext(ExamContext);
  const { getallAdmin, admin } = context;
  const { subjectList } = props;
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        await getallAdmin();
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, [])

  return (
    <>
      <div className='hidden bg-slate-200 mx-2 rounded'>
        <div className="mb-16  flex items-center justify-center">
          <div className="my-8 text-center ">
            <div className="mb-4">
              <div className="items-center justify-center">
                <Avatar className="h-20 w-20 mx-auto mb-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              {admin[0] &&
                <div>
                  <p className="text-lg font-semibold text-slate-800 mb-2"><b>{admin[0].name}</b></p>
                  <p className="text-lg font-semibold text-gray-600 mb-2"><b>Email: </b>{admin[0].email}</p>
                  <p className="text-lg font-semibold text-gray-600 mb-2"><b>PhoneNo: </b>{admin[0].phoneNo}</p>
                  <p className="text-lg font-semibold text-gray-600 mb-2"><b>Role: </b>{admin[0].role}</p>
                </div>
              }
            </div>
          </div>
        </div>

      </div>


      <div className='border top-0  px-4 bg-slate-100  fixed right-0  h-[100%] '>
        <div className=''>
          <h1 className='text-lg  w-[60%] inline-block  mt-20 my-2 font-bold '>Created by</h1>

        </div>
        <hr />
        <div className="mb-16">
          <div className=''>
            <div className="  my-8 ">
              <div className="items-center justify-center ml-16 mb-4 ">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              {admin[0] && <div className=''>
                <p className="text-lg font-semibold text-slate-800 mb-2"> <b>{admin[0].name}</b> </p>
                <p className="text-lg font-semibold text-gray-600 mb-2"><b>Email: </b> {admin[0].email}</p>
                <p className="text-lg font-semibold text-gray-600 mb-2"><b>PhoneNo: </b> {admin[0].phoneNo}</p>
                <p className="text-lg font-semibold text-gray-600 mb-2"><b>Role: </b>{admin[0].role}</p>
              </div>}
            </div>
          </div>
          <hr />
          <Dialog>
            <DialogTrigger><div className='py-2 px-2 mx-6 bg-slate-400 w-full mt-6 text-white  rounded'>View your profile </div>
            </DialogTrigger>
            <DialogContent>
              <View_stdProfile />
            </DialogContent>
          </Dialog>

          <div className="container mx-auto px-4 py-4  mt-2 ">
            <table className="w-full">
              <thead>
                <tr >
                  <th className="pl-0 py-2">SUBJECTS</th>
                </tr>
              </thead>

              <tbody>
                {subjectList.length > 0 &&
                  subjectList.map((sub, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{sub.code}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>

        </div>
      </div>
      <style jsx>{`
          @media (max-width: 1150px){
            .fixed{
              display:none;
            }
            .hidden{
              display:block;
            }
          }
      `}
      </style>
    </>
  )
}

export default HomeSidebar;
