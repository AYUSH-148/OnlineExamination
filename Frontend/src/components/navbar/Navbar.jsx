import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../../css/navbar.css';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let showAdminProfile = true;
  let showLogout = true;
  let showStdList = true;
  let showMarks = false;
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



  if (!localStorage.getItem('token') || pathname.startsWith('/student_details')||pathname.startsWith('/std_questions')||pathname.startsWith('/student_login')||pathname.startsWith('/student_signup')) {
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
  const handleBurger = ()=>{
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
   <nav className={`mb-5 z-50 bg-gray-900 flex px-5 py-4 text-white sticky top-0 ${isMenuOpen ? 'flex-col ok justify-around transition-all duration-500' : 'items-center justify-between'}`}>


      <div className="navbar-header">
        <h1 className='text-xl mb-3'>OnlineExamination System</h1>
      </div>
      {showNavComp && <div className={`flex  ${isMenuOpen ? 'flex-col items-start gap-y-4 visible' : ' justify-center items-center  mr-16 navcomp '} `}>


        <DropdownMenu >
          <DropdownMenuTrigger className="hover:bg-[#333] cursor-pointer hover:text-blue-100 mx-6  mb-1">Help ( <i className="fa-solid fa-info  "></i> )</DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4" >
            {/* <DropdownMenuLabel >"Student section Admin Section"</DropdownMenuLabel> */}
            {showAdminProfile && <DropdownMenuItem className="flex justify-between"><Link to={`/admin_profile`} className='border-b border-gray-200'>Profile</Link> <i className="fa-solid fa-user mr-2"></i>  </DropdownMenuItem>}
            <DropdownMenuItem >
            {showStd_profile &&
              <Dialog>
                <DialogTrigger className='flex justify-between w-full  items-center' ><div className='my-2  border-b  border-gray-200 '>Profile </div> <i className="fa-solid fa-user mr-2"></i>  </DialogTrigger>
                <DialogContent>
                  <View_stdProfile />
                </DialogContent>
              </Dialog>
            }
            </DropdownMenuItem>
           
            {showMarks && <DropdownMenuItem><Link to={`/marks_details`} className='border-b border-gray-200 w-full' >Updated Result </Link> <i className="fa-solid fa-file-pen mr-1"></i></DropdownMenuItem>}
            {view_Stdstats && <DropdownMenuItem className="flex justify-between items-center mr-2"><div onClick={handleClick} className='border-b border-gray-200 w-full'>View Stats </div> <i className="fa-solid fa-chart-simple"></i></DropdownMenuItem>}
            {showStdList && <DropdownMenuItem className="flex justify-between items-center"><Link to="/student_details" className='border-b border-gray-200  w-full'>Students List</Link> <i class="fa-solid fa-list mr-2"></i></DropdownMenuItem>}
            <DropdownMenuItem>{showLogout && <button onClick={handleLogout} className=' py-1 px-2 flex justify-between w-full items-center'><p>Logout</p> <i class="fa-solid fa-right-from-bracket"></i></button>}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu >
          <DropdownMenuTrigger className="hover:bg-[#333] cursor-pointer hover:text-blue-100 mx-5 mb-1"><i className="fa-solid fa-user text-lg cursor-pointer text-[#f0f2f4] " ></i></DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel >User </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-black" />
            {showAdminProfile && <DropdownMenuItem > <Link to={`/admin_profile`}>View Profile</Link></DropdownMenuItem>}
            {chPass_forstd && <DropdownMenuItem className="border-b text-gray-200"><Link to="/s_change_password" >Change Password </Link></DropdownMenuItem>}
            {chPass_foradmin && <DropdownMenuItem><Link to={`/change_password`} >Change Password </Link></DropdownMenuItem>}
            {forgetPass && <DropdownMenuItem ><Link to="/forgot_password">Forgot Password?</Link></DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
       

      </div>}
      <i className="fa-solid fa-bars text-xl hidden absolute top-4 right-5" onClick={handleBurger}></i>
    </nav>
    
    <style jsx>
      {`
      
            @media (max-width: 1030px){
                .hidden{
                  display: inline;
                }
                .navcomp{
                  display: none;
                }
            }
            @media (min-width: 1030px){
              
               .justify-around{
                justify-content: space-between;
               }
               nav{
                  height:60px;
               }
            }
      `}
          
    </style>
    </>
  );
};

export default Navbar;
