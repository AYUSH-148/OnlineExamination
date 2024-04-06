import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
const StudentForm = () => {
  const { toast } = useToast()

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/students/std_signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,rollNo,email,password,phoneNo })

    });
    const json = await response.json();
    // console.log(json)
    if (json.success) {
      toast({
        title: "Signing up!",
        description: "Account created successfully.",
      })
      localStorage.setItem('token', json.auth_token);
      navigate(`/admin_home/${json.admin._id}`);
      navigate("/student_login")
      localStorage.setItem('token', json.auth_token); 
    }
    else{
      toast({
        variant: "destructive",
        title: "Invalid credentials!",
        description: "Failed to create acount.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
     
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input  type="text"   name="name"  value={name} className="border border-slate-800"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="rollNo">Roll No:</label>
        <input  type="text"   name="rollNo"  value={rollNo} className="border border-slate-800"
          onChange={(e) => setRollNo(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input  type="email"   name="email"  value={email} className="border border-slate-800"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNo">Phone No:</label>
        <input  type="text" name="phoneNo"  value={phoneNo} className="border border-slate-800"
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input  type="password"    name="password"  value={password} className="border border-slate-800"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-black">Submit</button>
    </form>
  );
};

export default StudentForm;
