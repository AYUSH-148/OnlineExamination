import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Dialog,
  DialogContent,
 
 
  DialogTrigger,
} from "../ui/dialog"
import View_stdProfile from './View_stdProfile'

const Home_Sidebar = () => {

  return (
    <div className='border px-8 border-l-4 border-slate-400  fixed top-[10vh] right-0 h-full overflow-y-auto'>
      <h1 className='text-lg  my-2 font-bold '>Created by</h1><hr />
      <div className="mb-16">
        <div className=''>
          <div className="  my-8 ">
            <div className="items-center justify-center ml-16 mb-4 ">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className=''>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 "></h2>
              <p className="text-lg font-semibold text-slate-800 mb-2"> <b>Ramu Don</b> </p>
              <p className="text-lg font-semibold text-gray-600 mb-2"><b>Email: </b> ramu@gmail.com</p>
              <p className="text-lg font-semibold text-gray-600 mb-2"><b>PhoneNo: </b> 1231812947</p>
              <p className="text-lg font-semibold text-gray-600 mb-2"><b>Role: </b> Admin</p>
            </div>
          </div>
        </div>
        <hr />
        <Dialog>
          <DialogTrigger><div className='py-2 px-2 mx-4 bg-slate-400 w-full mt-2  rounded'>View your profile </div>
          </DialogTrigger>
          <DialogContent>
            <View_stdProfile />
          </DialogContent>
        </Dialog>

        <div className="container mx-auto px-4 py-8 ">
          <table className="w-full">
            <thead>
              <tr >
                <th className="pl-0 py-2">SUBJECTS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Data 1</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Data 2</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Data 3</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Data 3</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Home_Sidebar
