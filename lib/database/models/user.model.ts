import { Schema, model, models, Document } from "mongoose";


const UserSchema = new Schema({
    clerkId: { type: String, required: true , unique: true},
    email: { type: String, required: true , unique: true},
    username: { type: String, required: true , unique: true},
    photo: { type: String , required: true},
    firstName: { type: String },
    lastName: { type: String},
    planId: { type: Number, required: true , default: 1},
    creditBalance: { type: Number, required: true , default: 10},
},
{
    timestamps: true,
});


const User = models?.User || model("User", UserSchema);
export default User