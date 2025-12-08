const express = require("express");
require('dotenv').config()
// const itemRoutes = require('./routes/item.routes')
const cors = require("cors");
const axios = require("axios");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const db = require('./database-mysql');
const PatientRouter = require("./routes/Patient.router");
const Doctorinf = require("./routes/doctorinf.router");
const review = require("./routes/review.router");
const todayapp = require("./routes/todayapp.router");
const doctorRouter = require('./routes/doctor.router');
const AppointmentRouter = require('./routes/Appointment.router');
const RatingCommentsRouter = require('./routes/ratingComments.router');
const roomRouter = require('./routes/roomRouter');
const userRouter = require('./routes/userrouters');
const Authentication = require('./routes/loginrouters');
const nodeMailer = require('./controllers/nodeMailer');
const cloudinary = require('cloudinary');
const BlogRouter = require('./routes/Blog.routes');
const ProductRouter = require('./routes/product.router');
const CommentRouter = require('./routes/blogComments.router');
const SpecialityRouter=require('./routes/Speciality.router')
const fileUpload = require('express-fileupload');
const http = require('http');
const { Server } = require('socket.io');
const app = express();


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});
const PORT = 3002
cloudinary.v2.config({
  cloud_name: 'duekcetwe',
  api_key: '313496654712626',
  api_secret: 'LTs6VHjFAjSIorhnPJ-w8iqwffo',
  secure: true,
});
app.use(cors())
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.post('/api/add', async (req, res) => {
  const url = "https://developers.flouci.com/api/generate_payment";
  const pay = {
    "app_token": "3ae91c05-02b2-4f92-9de8-bfcd08847afb",
    "app_secret": "6a2f00e1-f15d-451c-82ba-149a5c5b4afb",
    "amount": req.body.amount,
    "accept_card": "true",
    "session_timeout_secs": 1200,
    "success_link": "http://localhost:3001/paymentfail",
    "fail_link": "http://localhost:3001/paymentsuccess",
    "developer_tracking_id": "37b1502a-131d-4641-8151-eaa945e4bd5a"
  };
  try {
    const result = await axios.post(url, pay);
    res.send(result.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/api/verify/:id', async (req, res) => {
  try {
    const result = await axios.get(`https://developers.flouci.com/api/verify_payment/${req.params.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'apppublic': '3ae91c05-02b2-4f92-9de8-bfcd08847afb',
          'appsecret': '6a2f00e1-f15d-451c-82ba-149a5c5b4afb'
        }
      });
    res.send(result.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
/////////////////////////////////////////
app.use("/api/auth", Authentication);
app.use('/api/doctors', doctorRouter);
app.use("/api/Appointment", AppointmentRouter);
app.use("/api/ratingComments", RatingCommentsRouter);
app.use("/api/users", userRouter);
app.use('/api/blogs', BlogRouter);
app.use('/api/comments', CommentRouter);
app.use('/api/products', ProductRouter);
app.use('/api/speciality', SpecialityRouter);
app.use('/api/patients', PatientRouter);
app.use('/api/doctorinf', Doctorinf);
app.use('/api/review', review);
app.use('/api/todayapp', todayapp);
app.use('/api/chat', roomRouter);
app.post('/api/upload', async (req, res) => {
  try {
    const fileStr = req.files.file.data.toString('base64'); 
    const uploadResponse = await cloudinary.uploader.upload("data:image/jpeg;base64," + fileStr, { 
      upload_preset: 'enojnrjf',
    });
    res.json({ imageUrl: uploadResponse.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
app.post('/api/sendmail', nodeMailer.sendMail);
io.on("connection", (socket) => {
  console.log("A user connected with id:", socket.id);

  
  socket.on("send_message", (data) => {
      
      console.log(data);
      
      io.emit("new_message", data); 
  });

  socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
  });
});
server.listen(PORT, function () {
  console.log("Server is running on port", PORT);
});