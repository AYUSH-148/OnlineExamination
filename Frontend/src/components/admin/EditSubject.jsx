import React, { useState, useContext } from 'react';
import ExamContext from '../../context/exam/examContext';
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

const EditSubject = (props) => {
    const { toast } = useToast();
    const context = useContext(ExamContext);
    const { edit_subject } = context;
    const { sub } = props;
    
    const [formData, setFormData] = useState({
        code: sub.code,
        sub_name: sub.name,
        description: sub.description,
        length: sub.length,
        duration:"00:00:00",
        availability: sub.availability,
        max_marks: sub.max_marks
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { code, sub_name, duration, description, max_marks, length, availability } = formData;
        const fixDuration = (duration) => {
            const [hours, minutes, seconds] = duration.split(':');
            return { hours, minutes, seconds };
        };
        const dur = fixDuration(duration);
        await edit_subject(sub._id, code, sub_name, dur, description, max_marks, length, availability);
        toast({
            title: "Subject updated!",
            description: "Changes saved successfully.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
    };

    return (
        <form className="shadow-md rounded w-full px-8 pb-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                        Code
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="code"
                        type="text"
                        placeholder="Code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sub_name">
                        Subject
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sub_name"
                        type="text"
                        placeholder="Subject"
                        name="sub_name"
                        value={formData.sub_name}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nosofqns">
                        Nos of Questions
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nosofqns"
                        type="number"
                        placeholder="Nos of Questions"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="max_marks">
                        Max Marks
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="max_marks"
                        type="number"
                        placeholder="Max Marks"
                        name="max_marks"
                        value={formData.max_marks}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
                        Availability
                    </label>
                    <div className="flex">
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="availability"
                                value="Active"
                                checked={formData.availability === 'Active'}
                                onChange={handleChange}
                            />
                            <span className="ml-2">Active</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="availability"
                                value="Expired"
                                checked={formData.availability === 'Expired'}
                                onChange={handleChange}
                            />
                            <span className="ml-2">Expired</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                        Duration
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="duration"
                        type="text"
                        placeholder="hh:mm:ss"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        pattern="[0-9]{2}:[0-5][0-9]:[0-5][0-9]"
                        title="Please enter a valid duration in the format hh:mm:ss"
                        required
                    />
                </div>

            </div>

            <button type='submit' className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                Save Changes
            </button>
        </form>
    );
};

export default EditSubject;
