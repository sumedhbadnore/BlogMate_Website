const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    }, 
    email:{
        type: String,
        require: true,
        max: 30,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);