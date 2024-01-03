const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://username:password@cluster0.ouwygjh.mongodb.net/Todo-app');

// Define schemas
const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    todolist: [TodoSchema],
});

const User = mongoose.model('Users', UserSchema);

module.exports = { User };
