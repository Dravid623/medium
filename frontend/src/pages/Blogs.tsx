import { useState } from "react";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const [pageNumber, setPageNumber] = useState(0)
    const {loading, blogs} = useBlogs(pageNumber);
    
    if(loading){
        return <div>
            <Appbar />
        <div className="flex flex-col gap-4 justify-center">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />

        </div>
        </div>
    }
    return <div>
        <Appbar />
    <div className="flex justify-center">
        <div>
            {blogs.map((blog, index) => 
        <BlogCard key={index}
        id={blog.id}
        autherName={blog.author.name || 'Anonymous'}
        title={blog.title}
        content={blog.content}
        publishedDate={blog.createdAt}/>)}
        <div>
        <button onClick={()=>{setPageNumber((pageNumber+1))}} className=" mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Load More</button>
    </div>

    </div>
     
    </div>
    </div>
}