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
  cors: { origin: "*" } // allow frontend
});

// When client connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join project room (so comments are scoped per project)
  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`User joined project ${projectId}`);
  });

  // Listen for new comment
  socket.on("newComment", (comment) => {
    // broadcast to everyone in this project
    io.to(comment.projectId).emit("commentAdded", comment);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

app.use(cors({
    origin: ['http://localhost:5173'],
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