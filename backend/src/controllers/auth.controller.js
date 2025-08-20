import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";



export async function register(req,res){
    console.log("✅ /api/auth/register hit");
    console.log("Body:", req.body);
     const {email,password,fullName,username,nativeLanguage, desiredLanguage,bio,city}= req.body
try{
    if(!email || !password || !fullName ||!username||!nativeLanguage||!desiredLanguage||!bio ||!city ){
        return res.status(400).json({message:" All fields are required"});
    }if (!req.file) {
  return res.status(400).json({ message: "Avatar image is required" });
}
    
    if(password.length<6){
        return res.status(400).json({message:"password must be at least 6 characters"});

    }
    const avatar = {
      url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
      mimeType: req.file.mimetype,
      size: req.file.size,
      localPath: req.file.path,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" });
}
const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email already exists, please use a different one" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username already taken, choose a different one" });
    }



    const newUser=await User.create({
        email,fullName,password,bio,city,nativeLanguage,desiredLanguage,username,avatar,
    });
try {
    await upsertStreamUser({
    id:newUser._id.toString(),
    name:newUser.fullName,
    image:newUser.avatar?.url || "",
    bio: newUser.bio,
  nativeLanguage: newUser.nativeLanguage,
  desiredLanguage: newUser.desiredLanguage,

})
console.log(`stream user created for ${newUser.fullName}`);
    
} catch (error) {
    console.log("error creating stream user",error);
}


    // const token= jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,
    //     {expiresIn:"7d"})

    //     res.cookie ("jwt",token,{maxAge:7*24*60*60*1000,
    //         httpOnly:true,
    //         sameSite:"strict",
    //         secure:process.env.NODE_ENV==="production"

    //     })
    
        const userResponse = newUser.toObject();
    delete userResponse.password;
    res.status(201).json({ success: true, user: userResponse });
       
}catch(error){
    console.log("error in register controller",error.message);
    console.error(error.stack);
    res.status(500).json({message:"internal server error"});

}
}
export async  function login(req,res){
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"all fields are required"});

        }
        const user = await User.findOne({ email }).select("+password");

        if(!user) return res.status(401).json({message:"Invalid email or password"});
        const isPasswordCorrect=await user.matchPassword(password)
        if(!isPasswordCorrect) return res.status(401).json({message:"invalid email or password"});
        const token= jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,
        {expiresIn:"7d"})

        res.cookie ("jwt",token,{maxAge:7*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV==="production"

        });
        res.status(200).json({success:true,user});

    }catch(error){
        console.log("error in login controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
export function logout(req,res){
    res.clearCookie("jwt")
    res.status(200).json({success:true,message:"Logout successful"});
}
export async function getCurrentUser(req, res) {
  try {
    // req.user is set by the isAuthenticated middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userResponse = req.user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse });
  } catch (err) {
    console.error("Error in getCurrentUser:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}