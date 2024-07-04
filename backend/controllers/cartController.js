// import userModel from "../model/userModel.js";

// //add items to the user cart 

// const addToCart=async(req,res)=>{
//     try{
//       let userData=await userModel.findOne({_id:req.body.userId});
//       let cartData=await userData.cartData;
//       if(!cartData[req.body.itemId]){
//         cartData[req.body.itemId]
//       }else{
//         cartData[req.body.itemId]+=1;
//       }
//      await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//      res.json({success:true,message:"Added  To Cart"})
//     }catch(error){
//           console.log(error);
//           res.json({success:false,message:"Error"})
//     }
// }

// //remove items from user cart 
// const removeFromCart=async (req,res)=>{

// }
// //fetch user cartdata 
// const getCart=async(req,res)=>{

// }
// export {addToCart,removeFromCart,getCart};
import userModel from "../model/userModel.js";

// Add items to the user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}


// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
      // Fetch user data by userId
      let userData = await userModel.findById(req.body.userId);
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      // Get the cart data
      let cartData = userData.cartData;
  
      // Check if the item exists in the cart and has a quantity greater than 0
      if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1;
  
        // Remove the item from cart if quantity is less than or equal to 0
        if (cartData[req.body.itemId] <= 0) {
          delete cartData[req.body.itemId];
        }
  
        // Update the user's cart data
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  
        res.json({ success: true, message: "Removed From Cart" });
      } else {
        res.json({ success: false, message: "Item not found in cart or quantity is already zero" });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };
  
                                 
  
  
// Fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export { addToCart, removeFromCart, getCart };
