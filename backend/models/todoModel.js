import mongoose from 'mongoose'

const todo = mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Todo = new mongoose.model('Todo', todo);
export default Todo;