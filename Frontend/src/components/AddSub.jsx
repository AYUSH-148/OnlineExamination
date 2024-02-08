import React, { useState, useContext } from 'react';
import examContext from '../context/exam/examContext'


export default function AddSub() {
    const context = useContext(examContext);
    const { createSubject,Sub,set_marks } = context;

    const [code, setCode] = useState('');
    const [name, setName] = useState('');

    const handleSubmit =async (e) => {
        e.preventDefault();
     
        await createSubject(code, name);
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
                <button type="submit">Add</button>

            </form>

        </>
    );
}
