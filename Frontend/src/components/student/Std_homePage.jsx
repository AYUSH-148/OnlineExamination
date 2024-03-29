import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import ExamContext from '../../context/exam/examContext';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';

import { Link } from 'react-router-dom'
import { badgeVariants } from "../ui/badge"
import Home_Sidebar from './Home_Sidebar'
import Std_submarks from './Std_submarks';
import PerQnStats from './PerQnStats';

const Std_home = () => {
  const { id } = useParams();
  const context = useContext(ExamContext);
  const { Sub, getallSubjects, OneStd, getStudent } = context;
  const navigate = useNavigate();
  const [subjectList, setSubjectList] = useState([]);
  const [subName, setSubName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('token')) {
        await getallSubjects();
        await getStudent();
      } else {
        navigate("/student_login");
      }
    };
    fetchData();
  }, []);
  useEffect(() => {

    setSubList();

  }, [OneStd]);

  const setSubList = () => {
    const list = Sub.filter(sub => {
      if (OneStd && OneStd.rollNo) {
        if (OneStd.rollNo.includes("MnC") && sub.code.includes("MnC")) {
          setSubName("Mathematics And Computing");
          return true;
        } else if (OneStd.rollNo.includes("IT") && sub.code.includes("IT")) {
          setSubName("Information Technology");
          return true;
        } else if (OneStd.rollNo.includes("EEE") && sub.code.includes("EEE")) {
          setSubName("Electronics");
          return true;
        } else if (OneStd.rollNo.includes("Cs") && sub.code.includes("Cs")) {
          return true;
        }
      }
      return false;
    });
    setSubjectList(list);
  };
  return (
    <>
      <Home_Sidebar />
      <h1 className='font-bold text-2xl ml-14 my-5'>{subName}</h1>
      {subjectList.length > 0 ? (
        <div>
          {subjectList.map(sub => (
            <div className="max-w-2xl mb-20 ml-14 border border-slate-400 rounded-lg overflow-hidden" key={sub._id}>
              <div className="px-4 py-5 sm:px-6 flex justify-between">
                <div>
                  <h3 className="text-lg  leading-6 text-gray-800 font-bold">{sub.name}<span className={badgeVariants({ variant: "secondary" })}>{sub.availability}</span></h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">See subject information below</p>
                </div>
                <Link to={`/${id}/std_questions/${sub._id}`} className='text-black mt-3 '>
                  <span className='bg-slate-400 py-3  px-3 rounded-sm  border hover:bg-[#c1d1d8]  border-slate-600'>
                    Give Test
                  </span>
                </Link>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 mt-2">Status</dt>
                    <dd className="mt-1 sm:col-span-2 text-md font-semibold text-indigo-400">NO response!</dd>
                  </div>
                  <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Number of Questions</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{sub.length}</dd>
                  </div>
                  <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Maximum Marks</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{sub.max_marks}</dd>
                  </div>
                  <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Subject Code</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{sub.code}</dd>
                  </div>
                  <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Duration</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2"> {sub.duration.hours}:{sub.duration.minutes}:{sub.duration.seconds} </dd>
                  </div>
                  <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Guidelines</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2"><pre>{sub.description?sub.description:"lorem24k;lj' dslkgkndslgmasg a[kfnaf ag a'akd'g 'dofagm'agm a;gkmaglma a'gka'gmag a'dgl"}</pre></dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>

      ) : <Loader />}
      <hr className='w-[70vw] ml-5 '  />
      <div className='mt-6'>
        <p className='text-lg ml-32 font-semibold ' id="stats" >STATISTICS</p>
        <Std_submarks />
      </div>
      <div>
        <PerQnStats />
      </div>



    </>
  )
}

export default Std_home;
