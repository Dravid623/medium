import { Link } from "react-router-dom";

interface BlogCardprops{
    autherName?: string;
    title: string;
    content: string;
    publishedDate: string;
    id:string | number
}

export const BlogCard = ({
    autherName ='ana',
    title,
    content,
    publishedDate,
    id
}: BlogCardprops)=>{
    return <Link to={`/blog/${id}`}>
    <div className="p-4 border-b-2 border-slate-400 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="">
            <Avatar name={autherName} size='small' />
        </div>
        <div className="pl-2 font-medium text-sm flex justify-center flex-col">
            {autherName}
        </div>
        <div className="flex justify-center flex-col pl-2">
            <Circle />
        </div>
        <div className="pl-2 font-extralight text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
        </div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
        {`${Math.ceil(content.length / 100)} minutes`}
        </div>
    </div>
    </Link>
}

export function Circle(){
    return <div className=" w-1 h-1 bg-gray-100 rounded-full bg-gray-600">
</div>
}

export function Avatar({name, size="small"}:{name:string, size: 'small' | 'big'}){
    return <div className={`inline-flex items-center justify-center bg-gray-100 rounded-full bg-gray-600 ${size === 'small'? 'w-6 h-6' : 'w-10 h-10'}`}>
    <span className={`${size === 'small' ? 'text-xs' : 'text-md'} font-medium text-gray-600 dark:text-gray-300`}>
        {`${name[0]}`}
    </span>
</div>

}