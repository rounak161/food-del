// import jwt from "jsonwebtoken"
// const authMiddleware=async(req,res)=>{
//     const {token}=req.headers;
//     if(!token){
//         return res.json({success:false,message:"Not authorized again "})
//     }
//     try{
//         const token_decode=jwt.verify(token,env.JWT_SECRET);
//         req.body.userId=token_decode.id;
//         next();
//     }catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }
// export default authMiddleware;


import jwt from "jsonwebtoken";
import env from "dotenv"; // make sure to configure dotenv

env.config();

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export default authMiddleware;
