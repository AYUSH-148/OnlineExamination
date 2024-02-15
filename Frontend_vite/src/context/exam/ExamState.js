import React, { useState } from "react";
import ExamContext from "./examContext";
 
const ExamState = (props) => {

    const host = "http://localhost:7000";
    const admin = {}
    const qns_initial = [];

    let [Qns, setQns] = useState(qns_initial);
    const attempts_init = [];
    const attempt_init = {};
    let [isAttempts, setisAttempts] = useState(attempts_init);
    let [isAttempt, setisAttempt] = useState(attempt_init);
    const students_initial = [];
    let [Stds, setStds] = useState(students_initial);
    let get_onestd = {}
    const subject_initial = [];
    let [Sub, setSub] = useState(subject_initial);
    let [marks, setMarks] = useState(0);
    let [sub_marks, setSub_marks] = useState(0);

    const getallAdmin = async () => {
        try {
            const response = await fetch(`${host}/api/admin/get_admin`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();
            admin = json
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

    const createQn_perSub = async (id, qn, options) => {
        try {
            const response = await fetch(`${host}/api/questions/create_qns/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
                body: JSON.stringify({ id, qn, options })
            });
            const json = await response.json();
            if(json.success == true){
                var new_qn = {
                    "_id": json.newQuestion._id,
                    "subject": json.newQuestion.subject,
                    "qn": json.newQuestion.qn,
                    "options": json.newQuestion.options,
                    "__v": 0
                }
                setQns([...Qns, new_qn]);
                
            }
            else{
               
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
            if(json.msg == "Success"){
                console.log("deleteing");
                const newQns = Qns.filter((qn) => qn._id !== qn_id);
                setQns(newQns);
               
            }

            

        } catch (error) {
            console.error('Error in creating Question:', error);
        }
    }

    const updateQn_perSub = async (sub_id, qn_id, qn, options) => {
        try {
            const response = await fetch(`${host}/api/questions/update_qn/${sub_id}/${qn_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
                body: JSON.stringify({ sub_id, qn_id, qn, options })

            });
            if (!response.ok) {
                throw new Error(`Failed to update note with ID ${qn_id}`);
            }
            const json = await response.json(); 
            if(json.success == true){
                for (let index = 0; index < Qns.length; index++) {
                    if (Qns[index]._id === qn_id) {
                        Qns[index].qn = qn;
                        Qns[index].options = options;
                        break;
                    }
                }
                const newQns = Qns.filter((qn) => qn._id !== qn_id);
                setQns(newQns);
              
    
            }

           
        } catch (error) {
            console.error('Error in creating Question:', error);
        }
    }


    const getallAttempts = async () => {
        try {
            const response = await fetch(`${host}/api/isAttempted/get_all_attempts`, {
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

    const getAttempt = async (std_id, sub_id) => {
        try {
            const response = await fetch(`${host}/api/isAttempted/get_attempt/${std_id}/${sub_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setisAttempt(json)
        } catch (error) {
            console.error('Error fetching attempts:', error);
        }
    }

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
                body: JSON.stringify({ std_id, sub_id, isAttempted })
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
            get_onestd = json;

        } catch (error) {
            console.error('Error fetching students:', error);
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
            setSub(json);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    }

    const createSubject = async (code, name,duration) => {
        try {
            const response = await fetch(`${host}/api/subjects/create_sub`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
                body: JSON.stringify({ code, name ,duration})
            });
            const json = await response.json();
            if(json.success ==true){
                setSub(prevState => {
                    var sub = {
                        "_id": json.sub._id,
                        "code": json.sub.code,
                        "name": json.sub.name,
                        "duration":json.sub.duration,
                        "__v": 0
                    };
                    return [sub, ...prevState];
                });  
                
            }
            else{
                 
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
            if(json.msg == "Success"){
                const newSub = Sub.filter((sub) => sub._id !== id);
                setSub(newSub);
                
            }
            

            

        } catch (error) {
            console.error('Error in deleting subject:', error);
        }
    }

    const update_marks = async (sub_id, marks) => {
        try {
            const response = await fetch(`${host}/api/marks/update_marks/${sub_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')

                },
                body: JSON.stringify({ marks })

            });
            if (!response.ok) {
                throw new Error(`Failed to update marks of std_if `);
            }
            const json = await response.json(); // Wait for the JSON response
            if (json.marks != undefined) {
                setSub_marks(json.marks);
                // console.log({"Subject Marks": sub_marks})
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
                    'auth_token': localStorage.getItem('token')
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to get marks of std_if }`);
            }
            const json = await response.json(); // Wait for the JSON response
            if (json.response.marks != undefined) {
                setSub_marks(json.response.marks);
            }
            else {
                console.log("gand mara");
            }
            setMarks(json.marks)
            // console.log(finalsub_marks);

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
                body: JSON.stringify({})

            });
            if (!response.ok) {
                throw new Error(`Failed to get marks of std_id `);
            }
            const json = await response.json(); // Wait for the JSON response
            setMarks(json.marks)

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
            // console.log(json.marks);
            // console.log({"data":json,"marks":marks});


        } catch (error) {
            console.error('Error in getting  marks', error);

        }
    }

    const set_marksPerQn = async (sub_id, qn_id, marks) => {
        try {
            const response = await fetch(`${host}/api/marksPerQn/set_marksPerQn/${sub_id}/${qn_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
                body: JSON.stringify({ sub_id, qn_id, marks })
            });
            if (!response.ok) {
                throw new Error(`Failed to set marks of std_id`);
            }
            const json = await response.json(); // Wait for the JSON response

        } catch (error) {
            console.error('Error in getting  marks', error);

        }
    }

    const [Qnmarks, setQnMarks] = useState(0);
    const get_marksPerQn = async (sub_id, qn_id) => {
        try {
            const response = await fetch(`${host}/api/marksPerQn/get_marksPerQn/${sub_id}/${qn_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem('token')
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to get marks of std_if }`);
            }
            const json = await response.json(); // Wait for the JSON response
            console.log({ "sub": json.response.subject, "qn": json.response.question });
            console.log({ "oringinal marks": json.response.marks })
            setQnMarks(json.response.marks);
            console.log({ "Qnmarks": Qnmarks });


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
            const json = await response.json(); // Wait for the JSON response

            setQnMarks(_ => json.marks);


        } catch (error) {
            console.error('Error in updating  marks', error);
        }
    }


   
    return (
        <ExamContext.Provider value={{
            admin, getallAdmin, Qns, getQns_perSub, createQn_perSub, deleteQn_perSub, updateQn_perSub,
            isAttempt, isAttempts, getallAttempts, getAttempt, createAttempt, changeAttempt,
            Stds, get_onestd, getStudent, getallStudents,
            Sub, getallSubjects,get_subject, createSubject, deleteSubject, marks, getmarksPerSub, update_marks, get_marks, set_marks, Qnmarks,
            sub_marks, set_marksPerQn, get_marksPerQn, update_marksPerQn
        }}>
            {props.children}
        </ExamContext.Provider>
    )
}
export default ExamState;