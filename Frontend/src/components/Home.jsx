import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Admin_login from './login/Admin_login';
import { useToast } from "./ui/use-toast"
import { ToastAction } from "./ui/toast"
import {
  Dialog,
  DialogContent,
  DialogClose,

  DialogTrigger,
} from "./ui/dialog"
export default function Home() {
  const { toast } = useToast()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/admin/admin_login", {
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
          <div className='bg-slate-200'>
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

          </div>
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
