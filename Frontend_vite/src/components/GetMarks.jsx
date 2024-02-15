import React,{useContext} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ExamContext from '../context/exam/examContext';
// import { qnsActions } from '../store/qns';
export default function GetMarks(){
    // const dispatch = useDispatch();
    const context = useContext(ExamContext);
    const {sub_marks,update_marks} = context;
    const params= useParams();
    const {subId} = params;
    const ansArray = useSelector((state) => state.showQns.AnsArray);
    // console.log(ansArray);
    var marks =0
    for(let i=0;i<ansArray.length;i++){
        if(ansArray[i].ans == 'true'){
            marks+=2;
        }
    }
    const get_marks = async(subId,marks) => {
        await update_marks(subId,marks);
        console.log({"Subject marks":sub_marks});
    }
    get_marks(subId,marks);

    return (
        <div>
            <h1>Result: </h1>
            <h3>Marks Obtained: {sub_marks}</h3> 
        </div>
    )
}
