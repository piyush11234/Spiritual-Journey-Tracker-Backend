import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import placeRoutes from './routes/placeRoutes.js'

dotenv.config()

const app=express();
const PORT=process.env.PORT ||3000


//default middleware
app.use(express.json());

// app.use(cors({
//     origin:'https://spiritual-journey-tracker.vercel.app',
//     credentials:true
// }))

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://spiritual-journey-tracker.vercel.app",
        "http://localhost:5173"
      ];

      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


//user route
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/place',placeRoutes);

app.get('/',(req , res )=>{
    res.send("Backend is running")
})

connectDb()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})