import { useState } from "react";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = ()=>{
    const [pageNumber, setPageNumber] = useState(1)
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
        publishedDate={"2 march 2003"}/>)}

    </div>
    <div>
        <button onClick={()=>{setPageNumber((pageNumber+1))}}>Load More</button>
    </div> 
    </div>
    </div>
}