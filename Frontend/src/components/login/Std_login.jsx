import React,{useState} from 'react';
import { useNavigate } from 'react-router';
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
export default function Std_login() {

  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/students/std_login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rollNo,password })

    });
    const json = await response.json();
    // console.log(json.std._id)

    if (json.success) {
      toast({
        title: "Success!",
        description: "Logged in successfully",
      })
      localStorage.setItem('token', json.auth_token); 
      navigate(`/student_home/${json.std._id}`);
      
    }
    else{
      toast({
        variant: "destructive",
        title: "Invalid credentials!",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
     
    }
  };
 

  return (
    
    <form onSubmit={handleSubmit}>
      
      <div>
        <label htmlFor="rollNo">Roll No:</label>
        <input  type="text"   name="rollNo"  value={rollNo}  className="border border-slate-800"
          onChange={(e) => setRollNo(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input  type="password" name="password"  value={password}  className="border border-slate-800"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-black">Submit</button>
    </form>
  );
}
