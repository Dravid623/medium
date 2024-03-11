import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Blog{
    "content": string,
            "title": string,
            "id": string,
            "author": {
                "name": string
            }
}

// TODO : Remove this defaultBlog, it is just to bypass type check
//  <FullBlog blog = {blog} /> in Blog.ts and const [blog, setBlog] = useState<Blog>(defaultBlog) in index.ts
const defaultBlog: Blog = {
    "content": "content of blog",
            "title": "Title of blog",
            "id": "Id of blog",
            "author": {
                "name": "Name of author"
            }
};

export const useBlog = ({id}:{id:string})=>{
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>(defaultBlog)

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlog(response.data.post);
            setLoading(false);
        })
    },[id])
    return {
        loading,
        blog
    }
}

export const useBlogs = ()=>{
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlogs(response.data.posts);
            setLoading(false);
        })
    },[])
    return {
        loading,
        blogs
    }
}