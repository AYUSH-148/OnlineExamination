import './css/navbar.css';
import './css/question.css';
import './css/R_addsub.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import  Toaster  from "../src/components/ui/toaster"

import ExamState from './context/exam/ExamState';

import Home from './components/Home';
import Std_signup from './components/signup/Std_signup'
import Std_login from './components/login/Std_login'
import Subjects from './components/admin/Subjects';
import Questions from './components/admin/Questions';
import EditQuestion from './components/admin/EditQuestion';
import Std_questions from './components/student/std_questions';
import GetResponse from './components/student/GetResponse';
import Navbar from './components/navbar/Navbar';
import Subject_stats from './components/admin/Subject_stats';
import Stds_marks from './components/admin/Stds_marks';
import Students_list from './components/Students_list';
import View_AdminProfile from './components/admin/View_AdminProfile';
import Std_home from './components/student/Std_homePage';
import Admin_home from './components/admin/Admin_home';
import ChangePassword from './components/admin/ChangePassword';
import StdChangePassword from './components/student/StdChangePassword';
import Forgot_Password from './components/student/Forgot_Password';
import Reset_password from './components/student/Reset_password';
function App() {
  return (
    <>
   
      <ExamState>
                <Router>
                  <Navbar/>
                  <div>
                    
                    <Routes>
                      <Route exact path='/' element={<Home/>} />
                      <Route exact path='/student_signup' element={<Std_signup/>} />
                      <Route exact path='/student_login' element={<Std_login/>} />
                      <Route exact path='/subjects/:id' element={<Subjects/>} />
                      <Route exact path='/questions/:id' element={<Questions/>} />
                      <Route exact path='/:sub_id/edit_qn/:id' element={<EditQuestion/>} />
                      <Route exact path='/std_questions/:std_id/:subId' element={<Std_questions/>} />
                      <Route exact path='/getResponse/:std_id/:subId' element={<GetResponse/>} />
                      <Route exact path='/sub_stats/:subId' element={<Subject_stats/>} />
                      <Route exact path='/marks_details' element={<Stds_marks/>} />
                      <Route exact path='/student_details' element={<Students_list/>} />
                      <Route exact path='/admin_profile' element={<View_AdminProfile/>} />
                      <Route exact path='/student_home/:id' element={<Std_home/>} />
                      <Route exact path='/admin_home/:id' element={<Admin_home/>} />
                      <Route exact path='/change_password' element={<ChangePassword />} />
                      <Route exact path='/s_change_password' element={<StdChangePassword />} />
                      <Route exact path='/forgot_password' element={<Forgot_Password />} />
                      <Route exact path='/reset-password/:id/:token' element={<Reset_password />} />
                      
                    </Routes>
                    <Toaster />
                  </div> 
                </Router>
      </ExamState>
              
    </>
  );
}

export default App;
