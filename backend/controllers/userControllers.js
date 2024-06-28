// import userModel from "../model/userModel.js";
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'
// import validator from 'validator'


// //login user
// const loginUser=async(req,res)=>{
  
// }
// const createToken=(id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET)
// }
// //register user
// const registerUser=async(req,res)=>{
//     const {name,password,email}=req.body;
//     try{
//         //checking is user already exists 
//         const exists=await userModel.findOne({email});
//         if(exists){
//             return res.json({success:false,message:"User already exists"})
//         }
//         //valdating email for an strong password 
//         if(validator.isEmail(email)){
//             return res.json({success:false,message:"Please provide  a valid email"})
//         }
//         //passswors length 
//         if(password.length<8){
//             return res.json({success:false,message:"Please provide a strong password"})
//         }
//         //hashing  user password 
//         const salt=await bcrypt.genSalt(10);
//         const hashedPassword=await bcrypt.hash(password,salt);
//         const newUser=new userModel({
//             name:name,
//             email:email,
//             password:hashedPassword,
//         })
//         const user=await newUser.save()
//         const token=createToken(user._id);
//         res.json({success:true,token})

//     }catch(error){
//            console.log(error)
//            res.json({success:false,message:"error"})
//     }
// }


// export { loginUser, registerUser };

// import userModel from "../model/userModel.js";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import validator from 'validator';

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET);
// };
 

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       // Check if email and password are provided
//       if (!email || !password) {
//         return res.status(400).json({ success: false, message: "Please provide email and password" });
//       }
  
//       // Find user by email
//       const user = await userModel.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
  
//       // Compare hashed password
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(401).json({ success: false, message: "Invalid credentials" });
//       }
  
//       // Generate JWT token
//       const token = createToken(user._id);
  
//       // Respond with success and token
//       res.json({ success: true, token });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: "Internal server error" });
//     }
//   };


// const registerUser = async (req, res) => {
//   const { name, password, email } = req.body;
//   try {
//     // Check if user already exists
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "User already exists" });
//     }

//     // Validate email format
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ success: false, message: "Please provide a valid email" });
//     }

//     // Check password length
//     if (password.length < 8) {
//       return res.status(400).json({ success: false, message: "Please provide a strong password (at least 8 characters)" });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const newUser = new userModel({
//       name: name,
//       email: email,
//       password: hashedPassword,
//     });

//     // Save user to database
//     const user = await newUser.save();

//     // Generate JWT token
//     const token = createToken(user._id);

//     // Respond with success and token
//     res.json({ success: true, token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// export { registerUser,loginUser };


import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate request
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = createToken(user._id);

    // Respond with success and token
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email" });
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please provide a strong password (at least 8 characters)" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const user = await newUser.save();

    // Generate JWT token
    const token = createToken(user._id);

    // Respond with success and token
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { registerUser, loginUser };
