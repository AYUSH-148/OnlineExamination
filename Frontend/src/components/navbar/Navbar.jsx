import React from 'react';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

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
  
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  let showAdminProfile = true;
  let showLogout = true;
  let showStdList = true;
  let showMarks = false;
  let showAdminHome = false;
  let showNavComp = true;
  let showStd_profile = false;
  let view_Stdstats = false;
  let chPass_forstd = false;
  let forgetPass = false;
  let chPass_foradmin = false;
  if (pathname.includes('/std_questions/')) {
    showLogout = false;
  }
  if (pathname.includes('/std_questions/') || pathname.startsWith('/getResponse') || pathname.startsWith('/admin_profile') || pathname.startsWith('/student_home') || pathname.startsWith('/s_change_password') || pathname.startsWith('/forgot_password') || pathname.startsWith('/reset-password')) {
    showAdminProfile = false;
  }
  if (pathname.includes('/std_questions/') || pathname.startsWith('/student_details')) {
    showStdList = false;
  }
  if (pathname.startsWith("/subjects/") || pathname.startsWith("/admin_profile") || pathname.startsWith("/student_details") || pathname.startsWith('/questions') || pathname.startsWith('/admin_home') ) {
    showMarks = true;
    chPass_foradmin = true;
  }
  // if (pathname.startsWith("/subjects/") || pathname.startsWith("/questions/") || pathname.includes('/edit_qn') || pathname.startsWith('/sub_stats') || pathname.startsWith('/marks_details') || pathname.startsWith('/admin_profile') || pathname.startsWith('/change_password')) {
  //   showAdminHome = true;
  // }
  if (pathname.startsWith("/getResponse/") || pathname.startsWith('/s_change_password') || pathname.startsWith('/forgot_password') || pathname.startsWith('/reset-password') || pathname.startsWith('/student_home')) {
    if (!pathname.startsWith("/student_details")) {
      showStd_profile = true;
    }
    if (!(pathname.startsWith('/forgot_password') || pathname.startsWith('/reset-password'))) {
      forgetPass = true;
    }
    if (!(pathname.startsWith('/s_change_password'))) {
      chPass_forstd = true;
    }
  }
  if (pathname.startsWith('/student_home')) {
    view_Stdstats = true;
  }



  if (!localStorage.getItem('token') || pathname.startsWith('/student_details')||pathname.startsWith('/std_questions')) {
    showNavComp = false;
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const handleClick = () => {
    const section = document.getElementById("stats");
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <nav className="navbar mb-5 z-50">
      <div className="navbar-header">
        <h1 className='text-xl'>OnlineExamination System</h1>
      </div>
      {showNavComp && <div className='flex justify-center items-center mr-16'>

        {/* {showAdminHome && <p className='cursor-pointer mx-5'><Link to={`/admin_home/${id}`}>Home</Link></p>}    --------> Pending */}

        <DropdownMenu >
          <DropdownMenuTrigger className="hover:bg-[#333] cursor-pointer hover:text-blue-100 mx-5 mb-1">Help ( <i className="fa-solid fa-info  "></i> )</DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel >"Student section Admin Section"</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black" />
            {showAdminProfile && <DropdownMenuItem ><Link to={`/admin_profile`}>Profile</Link> </DropdownMenuItem>}
            {showStd_profile &&
              <Dialog>
                <DialogTrigger><div className='my-2 px-2'>Profile </div>
                </DialogTrigger>
                <DialogContent>
                  <View_stdProfile />
                </DialogContent>
              </Dialog>
            }
            {showMarks && <DropdownMenuItem><Link to={`/marks_details`} >Updated Result </Link></DropdownMenuItem>}
            {view_Stdstats && <DropdownMenuItem><div onClick={handleClick}>View Stats </div></DropdownMenuItem>}
            {showStdList && <DropdownMenuItem ><Link to="/student_details">Students List</Link></DropdownMenuItem>}
            <DropdownMenuItem>{showLogout && <button onClick={handleLogout} className='bg-slate-200 py-1 px-2 hover:bg-slate-200 text-black'>Logout</button>}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu >
          <DropdownMenuTrigger className="hover:bg-[#333] cursor-pointer hover:text-blue-100 mx-5 mb-1"><i className="fa-solid fa-user text-lg cursor-pointer text-[#f0f2f4] " ></i></DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel >User </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black" />
            {showAdminProfile && <DropdownMenuItem > <Link to={`/admin_profile`}>View Profile</Link></DropdownMenuItem>}
            {chPass_forstd && <DropdownMenuItem><Link to="/s_change_password" >Change Password </Link></DropdownMenuItem>}
            {chPass_foradmin && <DropdownMenuItem><Link to={`/change_password`} >Change Password </Link></DropdownMenuItem>}
            {forgetPass && <DropdownMenuItem ><Link to="/forgot_password">Forgot Password?</Link></DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>


      </div>}

    </nav>
  );
};

export default Navbar;
