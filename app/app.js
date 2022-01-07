const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const realestateRouter = require("./routes/realestates");
const registerUserRouter = require("./routes/registerUser");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const messageRouter = require("./routes/messages");
const tokenRouter = require("./routes/token");
const imageRouter = require("./routes/images");
const registerAgentRouter = require("./routes/registerAgent");
const companyRouter = require("./routes/companies");
const reviewRouter = require("./routes/review");
const agentOverviewRouter = require("./routes/agentOverview");
const profileRouter = require("./routes/profile");
const rateRouter = require("./routes/feedbacks");
const dataAnalysisRouter = require('./routes/dataAnalysis');
const favouritesRouter = require("./routes/favourites");

const router = express.Router();

//config file
dotenv.config({ path: "./config/.env" });
const env = process.env;

//express
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//socket
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connect");
  // create room
  socket.on("create", function (room) {
    socket.join(room);
    console.log("create room " + room);
    socket.broadcast.emit("check", {
      room,
    });
  });

  //rejoin room
  socket.on("rejoin", function (room) {
    console.log("rejoin room " + room);
    socket.join(room);
  });

  //send notification and message
  socket.on(
    "message",
    ({ Content, SenderId, Sender, ReceiverId, ContextId }) => {
      socket.to(String(ContextId)).emit("notify");
      socket.to(String(ContextId)).emit("message", {
        Content,
        SenderId,
        Sender,
        ReceiverId,
        ContextId,
      });
    }
  );
});

//routes
router.use("/realestates", realestateRouter);
router.use("/registerUser", registerUserRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/messages", messageRouter);
router.use("/token", tokenRouter);
router.use("/images", imageRouter);
router.use("/companies", companyRouter);
router.use("/registerAgent", registerAgentRouter);
router.use("/review", reviewRouter);
router.use("/agentOverview", agentOverviewRouter);
router.use("/profile", profileRouter);
router.use("/feedbacks", rateRouter);
router.use('/dataAnalysis', dataAnalysisRouter);
router.use('/favourites', favouritesRouter);

app.use("/api", router);

//static folders
app.use("/images", express.static(path.join(__dirname, "./public/images")));
app.use(express.static(path.join(__dirname, "../frontend/build")));

//production
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

//port
const PORT = env.PORT || 8000;

httpServer.listen(
  PORT,
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}.`)
);
