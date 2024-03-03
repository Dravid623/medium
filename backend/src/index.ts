import { Hono } from 'hono'
import {userRouter} from './routes/user'
import {blogRouter} from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()

app.route('/api/v1/user',userRouter)
app.route('/api/v1/blog',blogRouter)

export default app

// DATABASE_URL="postgresql://dravid1001:V6deJMa4ATXU@ep-empty-frog-a1v735gs-pooler.ap-southeast-1.aws.neon.tech/test?sslmode=require"
// prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDlmMWJiODEtMTFmMS00MGZlLWI2NWItMzk5NjViMzg1NmExIiwidGVuYW50X2lkIjoiYWVlZTc1OWFlZDUxMzFlNjJhM2ZiZjE5NDZhZGIzMmIxZTNhNTQzM2Q4ZTFmY2MyNzZhN2UwODRjODQ2YmI0NSIsImludGVybmFsX3NlY3JldCI6ImU5MThjZmE0LWVlYjgtNGE0NC1iM2M4LTZiZDM5ZmU4NDU2NSJ9.PFYtbSQbkwMCfEX2x8IN8AJFxR5vvG0Mvx84VtrGzRk