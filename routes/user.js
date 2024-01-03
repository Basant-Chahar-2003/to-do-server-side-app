const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const userMiddleware = require("../middleware/user");
const { User } = require("../db");
const authMiddleware = require("../middleware/auth");
const JWT_SECRET_KEY = "basant"


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    console.log(username , password, email)
    User.create({
        username: username,
        email : email,
        password: password
    })

    res.json({
        msg : "User created sucessfully"
    })
});

router.post('/signin',  async function (req,res){
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ username: username });

        if (user) {
                // Generate a JWT token
                const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET_KEY, {
                    expiresIn: '10h', // Token expiration time (adjust as needed)
                });
                
                res.cookie('jwt', token, { maxAge: 900000, httpOnly: true });
                res.status(200).json({
                    token: token,
                    message: 'Sign-in successful',
                });
        } else {
            res.status(403).json({
                msg: 'User does not exist',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Internal server error',
        });
    }
})

router.post('/addTodos', authMiddleware,async (req, res) => {
    // Implement course purchase logic
    const { title, description } = req.body;
    const username = req.headers.username 
    const user = await User.findOne({
        username: username
    })
    if (!user) {
            return res.status(404).json({ message: 'User not found' });
    }

        // Add the new to-do list to the user's todolist array
    user.todolist.push({
            title,
            description,
    });

        // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'To-do list added successfully', user });
});

router.get('/getTodos', authMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username
    const user = await User.findOne({
        username: username
    })
    console.log(user)
    console.log(user.todolist)
    res.status(200).json({ msg : user.todolist})

});

module.exports = router