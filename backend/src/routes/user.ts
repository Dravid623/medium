import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput, signinInput} from "@dravid/medium-common"
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()

userRouter.post('/signup', async(c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body)
if(!success){
  c.status(411);
  return c.json({
    message: "input not correct",
    status: 411,
  })
}
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try {
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name
    }
  })
  const jwt = await sign({
    id: user.id,
  }, c.env.JWT_SECRET)
    return c.text(jwt)
} catch (error) {
  c.status(411);
  return c.json({
    message: "Invalid credintial",
    status: 411,
    error:error
  })
}

})
// Todo : zod validation
userRouter.post('/signin', async(c) => {
  const body = await c.req.json();
    const { success } = signinInput.safeParse(body)
if(!success){
  c.status(411);
  return c.json({
    message: "input not correct"
  })
}
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

try {
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    }
  })
  if(!user){
    c.status(403); // unauthorized
    return c.json({
      message:'Invalid credintial',
      status: 403,
    })
  }
  const jwt = await sign({
    id: user.id,
  }, c.env.JWT_SECRET)
    return c.text(jwt)
} catch (error) {
  c.status(411);
  return c.json({
      message:'Invalid credintial',
      status: 411,
      error:error
    })
}
})

