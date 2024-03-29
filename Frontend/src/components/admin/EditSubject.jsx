import React,{useState,useContext} from 'react'
import ExamContext from '../../context/exam/examContext';
import { useToast } from "../ui/use-toast"
import { ToastAction } from "../ui/toast"
const EditSubject = (props) => {
    const { toast } = useToast()
    const context = useContext(ExamContext)
    const {edit_subject} = context;
    const {sub} = props;
    const [formData, setFormData] = useState({
        code: sub.code,
        sub_name: sub.name,
        duration: {
            hours: sub.duration.hours,
            minutes: sub.duration.minutes,
            seconds: sub.duration.seconds
        },
        description: sub.description,
        sub_status: sub.status,
        availability: sub.availability
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const { code, sub_name, duration, description, sub_status, availability } = formData;
        await edit_subject(sub._id,code, sub_name, duration, description,sub_status,availability);
        window.location.reload();
        toast({
            title: "Suject updated!",
            description: "Changes saved successfully.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      
    }

    return (
        <div className=" mx-auto" onSubmit={handleSubmit}>
            <form className=" ">
                <div className="mb-4">
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
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        name="sub_name"
                        value={formData.sub_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <div className="flex">
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="sub_status"
                                value="No response (..Give test!)"
                                checked={formData.sub_status === 'No response (..Give test!)'}
                                onChange={handleChange}
                            />
                            <span className="ml-2">No response (..Give test!)</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sub_status"
                                value="Your response is saved."
                                checked={formData.sub_status === 'Your response is saved.'}
                                onChange={handleChange}
                            />
                            <span className="ml-2">Your response is saved.</span>
                        </label>
                    </div>
                </div>
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
                <button type='submit' className='mt-2 bg-slate-200'>Save Changes</button>
            </form>
        </div>
    )
}

export default EditSubject
