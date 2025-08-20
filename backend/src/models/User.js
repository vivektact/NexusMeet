import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema=new mongoose.Schema({
    avatar: {
      type: {
        url: String,
        mimeType: String,
        size: Number,
        localPath: String,
      },
      default: {
       url: "https://placehold.co/600x400",

        mimeType: "",
        size: 0,
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    nativeLanguage: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    desiredLanguage: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false 
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
},{timestamps:true});

//pre hook
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }catch(error){
        next(error);

    }
});

userSchema.methods.matchPassword=async function(enteredPassword){
    const isPasswordCorrect=await bcrypt.compare(enteredPassword,this.password);
    return isPasswordCorrect;
};
const User=mongoose.models.User || mongoose.model("User", userSchema);

export default User;
