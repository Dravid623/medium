import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: string;
  }
}>()

blogRouter.get('/bulk/:pageNumber', async(c) => {
    const {pageNumber} = await c.req.param();
    const pageToSkip = parseInt(pageNumber, 10);
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
const posts = await prisma.post.findMany({
    skip: (pageToSkip - 1) * 10,
    take: 10,
    select: {
        content: true,
        title: true,
        id: true,
        author: {
            select: {
                name:true,
            }
        }
    }
});
return c.json({
    posts
})
})

blogRouter.use("/*", async(c,next)=>{
    const authHeader = c.req.header('authorization') || ""
try {
        const user = await verify(authHeader, c.env.JWT_SECRET)
        if(user){
            c.set("userId", user.id)
            await next()
        } else {
            c.status(403);
            return c.json({
                message: "you are not logged in"
            })
        }
} catch (error) {
    c.status(403);
    return c.json({
        message: "you are not logged in"
    })
}
})

blogRouter.post('/', async(c) => {
    const body = await c.req.json();
    const authorId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
    const post = await prisma.post.create({
    data: {
        title: body.title,
        content: body.content,
        authorId: authorId
    }
})
return c.json({
    id: post.id
})
})

blogRouter.put('/', async(c) => {
   const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
    const post = await prisma.post.update({
        where: {
            id: body.id
        },
    data: {
        title: body.title,
        content: body.content,
    }
})
return c.json({
    id: post.id
})
})


blogRouter.get('/:id', async(c) => {
   const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id:true,
                title: true,
                content:true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
    })
    return c.json({
    post
})
    } catch (error) {
        c.status(411)
        return c.json({
            message: "error while featching"
        })
    }

})

