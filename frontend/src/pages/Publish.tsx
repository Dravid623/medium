
import { ChangeEvent, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    return <div>
        <Appbar />
        <div className="flex justify-center mt-4">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e)=>{setTitle(e.target.value)}} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:outline-none block w-full p-2.5" placeholder="Title" />
                <TextEditor onChange={(e)=>{setContent(e.target.value)}} />
                        <button onClick={async()=>{
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                                title,
                                content,        
                            },{
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            });
                            navigate(`/blog/${response.data.id}`)
                        }} type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Publish Post</button>
            </div>

        </div>
    </div>
}

function TextEditor({onChange}:{onChange: (e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
    return <div className="mt-4">
        <textarea onChange={onChange} className="bg-gray-50 h-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5" placeholder="Write an artical" />
    </div>
}