import React, { useState, useContext } from 'react';
import examContext from '../context/exam/examContext'


export default function AddSub() {
    const context = useContext(examContext);
    const { createSubject} = context;

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('00:00:00');
   
   
    const handleSubmit =async (e) => {
        const fixDuration = (duration)=>{
            const [hours, minutes, seconds] = duration.split(':');
            let newduration = {hours, minutes, seconds};
            return newduration
        }
        e.preventDefault();
        let dur = fixDuration(duration);
        console.log("chl ja");
        console.log(dur);
        await createSubject(code, name,dur);
    };

    return (
        <>
            <form className='add_sub' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="code">Subject Code:</label>
                    <input
                        type="text" id="code" name="code" value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Subject Name:</label>
                    <input
                        type="text" id="name" name="name" value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                <label htmlFor="duration">Duration:</label>
                    <input type="text" id="duration" name="duration" placeholder="hh:mm:ss"
                     pattern="[0-9]{2}:[0-5][0-9]:[0-5][0-9]" 
                     title="Please enter a valid duration in the format hh:mm:ss" 
                     onChange={(e) => setDuration(e.target.value)}
                     value={duration} 
                     required/>
                </div>

                <button type="submit">Add</button>
            </form>

        </>
    );
}
