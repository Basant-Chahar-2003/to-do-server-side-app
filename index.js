const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5500' }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,username,password,authorization');
    next();
});
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser());
app.use("/user", userRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
