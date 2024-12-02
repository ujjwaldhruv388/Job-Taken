import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from 'path'


const __dirname = path.resolve()




const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const URL = process.env.URL

const corsOptions = {
    origin:URL,
    credentials:true
}
console.log(process.env.URL)

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
