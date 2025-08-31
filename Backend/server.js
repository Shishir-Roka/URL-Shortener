import express from "express"
import userRouter from "./Routes/user.routes.js"
import { authMiddleware } from "./Middleware/authMiddleware.js";
import urlRouter from "./Routes/url.routes.js"
import cors from 'cors'; 

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(authMiddleware);


app.use("/users",userRouter)
app.use(urlRouter);

app.get("/",(req,res)=>{
  res.status(200).json({message:"Server is up"})
})

app.listen(port,()=>{
  console.log(`Server is running in ${port}`);
})
