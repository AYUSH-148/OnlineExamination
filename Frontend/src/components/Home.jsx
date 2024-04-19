import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useToast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
const dotenv = require('dotenv');
dotenv.config({path:'config.env'});
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog"
export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await fetch(`${process.env.PATH}/api/admin/check-login`, {
            method: 'GET',
            headers: {
              'auth_token': localStorage.getItem('token'),
            },
          });
          const json = await response.json();
          if (json.success) {
            navigate(`/admin_home/${json.admin._id}`);
          }
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      }
    };
  
    checkLoggedIn();
  }, [navigate]);

  const { toast } = useToast()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.PATH}/api/admin/admin_login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })

    });
    const json = await response.json();

    if (json.success) {
      toast({
        title: "Success!",
        description: "Logged in successfully",
      })
      localStorage.setItem('token', json.auth_token);
      navigate(`/admin_home/${json.admin._id}`);

    }
    else {
      toast({
        variant: "destructive",
        title: "Invalid credentials!",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger >
          <i className="text-[32px] text-white z-[100] fa-solid fa-shield-halved absolute right-8 top-4 transition  duration-300 hover:scale-125 "></i>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col justify-center items-center h-[48vh] bg-white">
            <h1 className="text-3xl font-semibold mb-2">Welcome Admin</h1>

            <p className="text-lg text-center mb-2">keep the track of up to date stats.  </p>

            <form onSubmit={handleSubmit} className=" rounded-lg shadow-lg p-8  w-full">
              <div className="mb-4 relative">
                <i className="fa-solid fa-envelope absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400"></i>

                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Roll No:</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder='admin@gmail.com'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='border pl-10 pr-3 border-gray-300 rounded-md mt-1  py-2 w-full'

                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                <div className='relative mt-1'>
                  <i className="fa-solid fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='border  pl-10  pr-3 py-2 w-full  border-gray-300 rounded-md mt-1'

                  />
                </div>

              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 w-full">Verify</button>
            </form>
          </div>
          {/* <div className='bg-slate-200'>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input className="border border-slate-800"
                    type="email" name="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input className="border border-slate-800"
                    type="password" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-black">Submit</button>
              </form>
            </div>

          </div> */}
        </DialogContent>
      </Dialog>
      <div className='relative'>
        <div>
          <h2 className='ml-8 font-bold text-xl mt-5'>User: Student</h2>
          <button className="primary-btn"> <Link to="/student_signup" role="button">New Student </Link></button>
          <button className="primary-btn"><Link to="/student_login" role="button">Have an Account? Sign in  </Link></button>
        </div>


      </div>



    </>
  );
}
