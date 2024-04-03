import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ExamContext from '../../context/exam/examContext';
import View_stdProfile from '../student/View_stdProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog"
const Navbar = () => {
  const context = useContext(ExamContext);
  const { getStudent, OneStd } = context;

  useEffect(() => {
        const fetchData = async () => {
            if (localStorage.getItem('token') ) {
                await getStudent();
            } else {
                navigate("/student_login");
            }
        };
        fetchData();
    }, [OneStd]);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  let showProfile = false;
  let showLogout = false;
  let showStdList = false;
  let showMarks = false;

  if (pathname.startsWith("/subjects/") || pathname.startsWith("/std_sub/") || pathname.startsWith("/questions/") || pathname.startsWith("/getMarks/") || pathname.startsWith("/admin_profile") || pathname.startsWith("/marks_details") || pathname.startsWith("/admin_profile") || pathname.startsWith("/student_details") || pathname.startsWith("/student_home")) {
    showLogout = true;
  }
  if (pathname.startsWith("/subjects/") || pathname.startsWith("/marks_details") || pathname.startsWith("/student_details")) {
    showProfile = true;
  }
  if (pathname.startsWith("/subjects/") || pathname.startsWith("/admin_profile") || pathname.startsWith("/marks_details")|| pathname.startsWith("/student_home")) {
    showStdList = true;
  }
  if (pathname.startsWith("/subjects/") || pathname.startsWith("/admin_profile") || pathname.startsWith("/student_details")) {
    showMarks = true;
    
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const handleClick = ()=>{
    const section = document.getElementById("stats");
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }

  }
  return (
    <nav className="navbar mb-5">
      <div className="navbar-header">
        <h1 className='text-xl'>OnlineExamination System</h1>
      </div>
      <div className='flex justify-center items-center mr-16'>

       {!OneStd.role === 'student' && <p className='cursor-pointer mx-5'><Link to="/admin_home">Home</Link></p>}    {/*--------> Pending */}

        <DropdownMenu >
          <DropdownMenuTrigger className="hover:bg-[#333] cursor-pointer hover:text-blue-100 mx-5 mb-1">Help ( <i className="fa-solid fa-info  "></i> )</DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel >{OneStd.role === 'student'?"Student section":"Admin Section"}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black" />
            {showProfile && <DropdownMenuItem ><Link to="/admin_profile">Profile</Link> </DropdownMenuItem>}
            {OneStd.role === 'student' &&
              <Dialog>
                <DialogTrigger><div className='my-2 px-2'>Profile </div>
                </DialogTrigger>
                <DialogContent>
                  <View_stdProfile />
                </DialogContent>
              </Dialog>
            }
            {showMarks && <DropdownMenuItem><Link to="/marks_details" >Updated Result </Link></DropdownMenuItem>}
            { OneStd.role === 'student' && <DropdownMenuItem><div  onClick={handleClick}>View Stats </div></DropdownMenuItem>}
            {showStdList && <DropdownMenuItem ><Link to="/student_details">Students List</Link></DropdownMenuItem>}
            <DropdownMenuItem>{showLogout && <button onClick={handleLogout} className='bg-slate-200 py-1 px-2 hover:bg-slate-200 text-black'>Logout</button>}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu >
          <DropdownMenuTrigger className="hover:bg-[#333] cursor-pointer hover:text-blue-100 mx-5 mb-1"><i className="fa-solid fa-user text-lg cursor-pointer text-[#f0f2f4] " ></i></DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel >User </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black" />
            {showProfile && <DropdownMenuItem > <Link to={`/admin_profile`}>View Profile</Link></DropdownMenuItem>}
            <DropdownMenuItem>{OneStd.role === 'student'?<Link to="/s_change_password" >Change Password </Link>:<Link to="/change_password" >Change Password </Link>}</DropdownMenuItem>
            {OneStd.role === 'student' &&<DropdownMenuItem ><Link to="/forgot_password">Forgot Password?</Link></DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>


      </div>

    </nav>
  );
};

export default Navbar;
