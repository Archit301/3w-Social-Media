import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user_routes.js"
import path from 'path';

const app=express()

app.use(cors())
app.use(express.json())
const PORT=3000;
const MONGO="mongodb+srv://archit:arcmak1@cluster0.t1gfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
 mongoose
      .connect(MONGO)
      .then(()=>{
        console.log("Database is connected");
      })
      const __dirname = path.resolve()
app.listen(PORT,()=>{
 console.log(`server is running on port ${PORT}`)
})

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  })
app.use('/backend/user',userRoutes)
