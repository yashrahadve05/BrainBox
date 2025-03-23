import mongoose from 'mongoose';
import { model, Schema} from 'mongoose';

mongoose.connect("mongodb+srv://yashrahadve:89LRtFhRcZuNN1dt@cluster0.i08s4.mongodb.net/BrainBox")



const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    isVerified: Boolean,
    verificationToken: String
})


const contentSchema = new Schema({

})

const linkSchema = new Schema({

})


export const userModel = model("User", userSchema);
export const contentModel = model("Content", contentSchema);
export const linkModel = model("Share", linkSchema);