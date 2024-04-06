import React, { useState } from "react";
import ExamContext from "./examContext";
import { useDispatch } from "react-redux";
import { qnsActions } from "../../store/qns";
const ExamState = (props) => {
    const dispatch = useDispatch();
    const host = "http://localhost:7000";
    let [admin,setAdmin] = useState({})
    const qns_initial = [];

    let [Qns, setQns] = useState(qns_initial);
    const attempts_init = [];
    const attempt_init = {};
    let [isAttempts, setisAttempts] = useState(attempts_init);
    let [isAttempt, setisAttempt] = useState(attempt_init);
    const students_initial = [];
    let [Stds, setStds] = useState(students_initial);
    const subject_initial = [];
    let [Sub, setSub] = useState(subject_initial);
    let [marks, setMarks] = useState([]);
    let [sub_marks, setSub_marks] = useState([]);

    const getallAdmin = async () => {
        try {
            const response = await fetch(`${host}/api/admin/get_admin`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();
            setAdmin(json);
        } catch (error) {
            console.error('Error fetching admin:', error);
        }
    }
    const update_admin = async (id,name,email,phoneNo, profession) => {
        try {
            const response = await fetch(`${host}/api/admin/edit_admin/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name,email,phoneNo, profession })
            });
            const json = await response.json();
            if(json.success){
                console.log("changed!");
            }

            
        } catch (error) {
            console.error('Error fetching admin:', error);
        }
    }
   
    const getQns_perSub = async (id) => {
        try {
            if (id) {
                const response = await fetch(`${host}/api/questions/qns/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const json = await response.json();
                setQns(json);
            }
            else {
                console.log(id);
                console.error('Invalid id:', id);
            }

        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    const createQn_perSub = async (id, qn, options,weight) => {
        try {
            const response = await fetch(`${host}/api/questions/create_qns/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
                body: JSON.stringify({ qn, options ,weight})
            });
            const json = await response.json();
            if (json.success == true) {
                var new_qn = {
                    "_id": json.newQuestion._id,
                    "subject": json.newQuestion.subject,
                    "qn": json.newQuestion.qn,
                    "options": json.newQuestion.options,
                    "isAnswered": json.newQuestion.isAnswered,
                    "weight": json.newQuestion.weight,
                    "__v": 0
                }
                setQns([...Qns, new_qn]);

            }
            else {

            }

        } catch (error) {
            console.error('Error in creating Question:', error);
        }
    }

    const deleteQn_perSub = async (sub_id, qn_id) => {
        try {
            const response = await fetch(`${host}/api/questions/delete_qn/${sub_id}/${qn_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
            });
            const json = await response.json(); // Wait for the JSON response
            console.log("Started deleting")
            if (json.msg == "Success") {
                console.log("deleteing");
                const newQns = Qns.filter((qn) => qn._id !== qn_id);
                setQns(newQns);

            }



        } catch (error) {
            console.error('Error in creating Question:', error);
        }
    }

    const updateQn_perSub = async (sub_id, qn_id, qn, options, isAnswered = false,weight) => {
        try {
            const response = await fetch(`${host}/api/questions/update_qn/${sub_id}/${qn_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
                body: JSON.stringify({qn, options, isAnswered, weight})

            });
            if (!response.ok) {
                throw new Error(`Failed to update note with ID ${qn_id}`);
            }
            const json = await response.json();
            // console.log(json);
            if (json.success == true) {
                for (let index = 0; index < Qns.length; index++) {
                    if (Qns[index]._id === qn_id) {
                        Qns[index].qn = qn;
                        Qns[index].options = options;
                        Qns[index].isAnswered = isAnswered;
                        Qns[index].weight = weight;
                        break;
                    }
                }
            }
            else{
                console.log("failed to update");
            }


        } catch (error) {
            console.error('Error in creating Question:', error);
        }
    }


    const getAttemptsPerStd = async (std_id) => {
        try {
            const response = await fetch(`${host}/api/isAttempted/getAttempts/${std_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setisAttempts(json);
        } catch (error) {
            console.error('Error fetching attempts:', error);
        }
    }

    // const getAttempt = async (std_id, sub_id) => {
    //     try {
    //         const response = await fetch(`${host}/api/isAttempted/get_attempt/${std_id}/${sub_id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         const json = await response.json();
    //         setisAttempt(json)
    //     } catch (error) {
    //         console.error('Error fetching attempts:', error);
    //     }
    // }

    const createAttempt = async (std_id, sub_id, isAttempted) => {
        try {
            const response = await fetch(`${host}/api/isAttempted/create_attempt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ std_id, sub_id, isAttempted })
            });
            const json = await response.json();
            var new_att = {
                "_id": json._id,
                "subject": json.sub_id,
                "student": json.std_id,
                "isAttempted": json.isAttempted,
                "__v": 0
            }
            setisAttempt(new_att);
        } catch (error) {
            console.error('Error in creating Question:', error);
        }
    }

    const changeAttempt = async (std_id, sub_id, isAttempted) => {
        try {
            const response = await fetch(`${host}/api/isAttempted/change_attempt/${std_id}/${sub_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  isAttempted })
            });
            if (!response.ok) {
                throw new Error(`Failed to change attempt with subject ID ${sub_id}`);
            }
            setisAttempt(response);
        } catch (error) {
            console.error('Error in changing attempt:', error);
        }
    }
    const getallStudents = async () => {
        try {
            const response = await fetch(`${host}/api/students/get_all_stds`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setStds(json);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }
    //'auth_token': localStorage.getItem('token')
    let [OneStd, setOneStd] = useState({});
    const getStudent = async () => {
        try {
            const response = await fetch(`${host}/api/students/get_std`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
            });
            const json = await response.json();

            setOneStd(json);

        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }
    const update_std = async (name,rollNo,email,phoneNo) => {
        try {
            const response = await fetch(`${host}/api/students/update_std`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')

                },
                body: JSON.stringify({ name,rollNo,email,phoneNo })
            });
            const json = await response.json();
            if(json.success){
                console.log(json.new_std);
                setOneStd(json.new_std);
            }
            
        } catch (error) {
            console.error('Error fetching admin:', error);
        }
    }

    const getallSubjects = async () => {
        try {
            const response = await fetch(`${host}/api/subjects/get_all_sub`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setSub(json);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    }
    const get_subject = async (id) => {
        try {
            const response = await fetch(`${host}/api/subjects/get_sub/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            dispatch(qnsActions.setTimer(json.duration));
            setSub(json);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    }

    const createSubject = async (code, name, duration, description) => {
        try {
            const response = await fetch(`${host}/api/subjects/create_sub`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
                body: JSON.stringify({ code, name, duration, description })
            });
            const json = await response.json();
            if (json.success == true) {
                setSub(prevState => {
                    var sub = {
                        "_id": json.sub._id,
                        "code": json.sub.code,
                        "name": json.sub.name,
                        "duration": json.sub.duration,
                        "description": json.sub.description,
                        "__v": 0
                    };
                    return [sub, ...prevState];
                });

            }

        } catch (error) {
            console.error('Error in creating subject:', error);
        }
    }

    const deleteSubject = async (id) => {
        try {
            const response = await fetch(`${host}/api/subjects/delete_sub/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
            });
            const json = await response.json(); // Wait for the JSON response
            console.log(`Deleting a subject with id ${id}`, json);
            if (json.msg == "Success") {
                const newSub = Sub.filter((sub) => sub._id !== id);
                setSub(newSub);

            }




        } catch (error) {
            console.error('Error in deleting subject:', error);
        }
    }

    const edit_subject = async (id,code, name, duration, description,max_marks,length, availability) => {
        try {
            const response = await fetch(`${host}/api/subjects/update_sub/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
                body: JSON.stringify({ code, name, duration, description,max_marks,length, availability })

            });
            const json = await response.json(); 
            if(json.success === true){
                for (let index = 0; index < Sub.length; index++) {
                    if (Sub[index]._id === id ) {
                        Sub[index].code = json.sub.code;
                        Sub[index].name = json.sub.name;
                        Sub[index].duration = json.sub.duration;
                        Sub[index].description = json.sub.description;
                        Sub[index].max_marks = json.sub.max_marks;
                        Sub[index].length = json.sub.length;
                        break;
                    }
                }
            }
            




        } catch (error) {
            console.error('Error in deleting subject:', error);
        }
    }

    const update_marks = async (sub_id, marks, count_qns) => {
        try {
            const response = await fetch(`${host}/api/marks/update_marks/${sub_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')

                },
                body: JSON.stringify({ marks, count_qns })

            });
            if (!response.ok) {
                throw new Error(`Failed to update marks of std_if `);
            }
            const json = await response.json(); // Wait for the JSON response
            if (json.marks != undefined) {

                for (let index = 0; index < sub_marks.length; index++) {
                    if (sub_marks[index].subject === sub_id && sub_marks[index].student ===  json.student) {
                        sub_marks[index].marks = marks;
                        sub_marks[index].count_qns = count_qns;
                        sub_marks[index].time = json.time;
                        break;
                    }
                }

            }
            else {
                console.log("gand mara");
            }

            // console.log(json.marks);

        } catch (error) {
            console.error('Error in updating  marks', error);
        }
    }

    const getmarksPerSub = async (sub_id) => {
        try {
            const response = await fetch(`${host}/api/marks/get_marks/${sub_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to get marks of std_if }`);
            }
            const json = await response.json(); // Wait for the JSON response
            setSub_marks(json);
            

        } catch (error) {
            console.error('Error in getting  marks', error);

        }
    }

    const get_marks = async () => {
        try {
            const response = await fetch(`${host}/api/marks/get_marks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to get marks of std_id `);
            }
            const json = await response.json(); 
            setMarks(json)

        }
        catch (error) {
            console.error('Error in getting  marks', error);

        }

    }
    const get_marksAll = async () => {
        try {
            const response = await fetch(`${host}/api/marks/get_marksAll`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to get marks of std_id `);
            }
            const json = await response.json(); 
            setMarks(json)

        }
        catch (error) {
            console.error('Error in getting  marks', error);

        }

    }

    const set_marks = async (sub_id, marks) => {
        try {
            const response = await fetch(`${host}/api/marks/set_marks/${sub_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')

                },
                body: JSON.stringify({ sub_id, marks })

            });
            if (!response.ok) {
                throw new Error(`Failed to set marks of std_if `);
            }
            const json = await response.json(); // Wait for the JSON response
            setSub_marks(prevState => {
                var marks = {
                    "_id": json._id,
                    "student": json.student,
                    "subject": sub_id,
                    "marks": json.marks,
                    "date": json.date,
                    "time": json.time,
                    "count_qns": json.count_qns
                };
                return [marks, ...prevState];
            });


        } catch (error) {
            console.error('Error in getting  marks', error);

        }
    }
    const set_marksPerQn = async (sub_id, qn_id, marks,max_marks) => {
        try {
            const response = await fetch(`${host}/api/marksPerQn/set_marksPerQn/${sub_id}/${qn_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
                body: JSON.stringify({ marks,max_marks })
            });
            if (!response.ok) {
                throw new Error(`Failed to set marks of std_id`);
            }
            const json = await response.json();
            if(json.success === true){
                console.log(json.newResponse);
            }
            else{
                console.log({update_required: json.require_update});
            }
            

        } catch (error) {
            console.error('Error in getting  marks', error);

        }
    }

    const [Qnmarks, setQnMarks] = useState([]);
    const get_marksPerStd = async () => {
        try {
            const response = await fetch(`${host}/api/marksPerQn/get_marksPerStd`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to get marks of std_if }`);
            }
            const json = await response.json(); 
            setQnMarks(json);

        } catch (error) {
            console.error('Error in getting  marks', error);

        }
    }

    const update_marksPerQn = async (sub_id, qn_id, marks) => {
        try {
            const response = await fetch(`${host}/api/marksPerQn/update_marksPerQn/${sub_id}/${qn_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')

                },
                body: JSON.stringify({ sub_id, qn_id, marks })

            });
            if (!response.ok) {
                throw new Error(`Failed to update marks of std_if }`);
            }
            const json = await response.json(); 
            console.log(json);


        } catch (error) {
            console.error('Error in updating  marks', error);
        }
    }



    return (
        <ExamContext.Provider value={{
            admin, getallAdmin,update_admin, Qns, getQns_perSub, createQn_perSub, deleteQn_perSub, updateQn_perSub,
            isAttempt, isAttempts, getAttemptsPerStd, createAttempt, changeAttempt,
            Stds, OneStd, getStudent, getallStudents,update_std ,
            Sub,edit_subject, getallSubjects, get_subject, createSubject, deleteSubject, marks, getmarksPerSub, update_marks, get_marks,get_marksAll, set_marks, Qnmarks,
            sub_marks, set_marksPerQn, get_marksPerStd, update_marksPerQn
        }}>
            {props.children}
        </ExamContext.Provider>
    )
}
export default ExamState;