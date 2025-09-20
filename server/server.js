const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectdb = require('./config/db');
const { Server } = require('socket.io');
const http = require('http');

const userRouter = require('./router/userRoute');
const projectRouter = require('./router/projectRoute');
const taskRouter = require('./router/taskRoute');
const commentRouter = require('./router/commentRoute');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://project-managerapp.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

app.use(cors({
    origin: ['https://project-managerapp.vercel.app'],
    method: ['get','post','delete','put'],
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

dotenv.config();
connectdb();

app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/comments', commentRouter);

server.listen(process.env.PORT || 3000);