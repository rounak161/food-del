// import React, {   useState } from 'react'
// import './Add.css'
// import { assets } from '../../assets/assets'
// const Add = () => {
//     const[image,setImage]=useState(false);
//     const[data,setData]=useState({
//         name:"",
//         description:"",
//         price:"",
//         category:"Salad",
//     })
//     const onChangeHandler=(event)=>{
//         const name=event.target.name;
//         const value=event.target.value;
//         setData(data=>({...data,[name]:value}))
//     }
     
// const onSubmitHandler=async(event)=>{

// }

//   return (
//    <div className="add">
//     <form className='flex-col' onSubmit={onSubmitHandler}>
//         <div className="add-img-upload flex-col">
//             <p>Upload image </p>
//             <label htmlFor="image">
//                 <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
//             </label>
//             <input onChange={(e)=>setImage(e.target.files[0])}type="file" id="image" hidden required />
//         </div>
//         <div className="add-product-name flex-col">
//                 <p>Product Name</p>
//                 <input onChange={onChangeHandler} value={data.name} type="text" name ='name' placeholder='Type here' />
//         </div>
//         <div className="add-product-description flex-col">
//                 <p>Product description</p>
//                  <textarea  onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here ' required/> 
//         </div>
//         <div className="add-catgory-price">
//               <div className="add-category flex-col">
//                <p>Product category</p>
//                <select  onChange={onChangeHandler}  name='category'>
//                     <option value="Salad">Salad</option>
//                     <option value="Rolls">Rolls</option>
//                     <option value="Deserts">Deserts</option>
//                     <option value="Sandwich">Sandwich</option>
//                     <option value="Cake">Cake</option>
//                     <option value="Pure Veg">Pure Veg</option>
//                     <option value="Pasta">Pasta</option>
//                     <option value="Noodles">Noodles</option>
//                </select>
//               </div>
//                <div className="add-price flex-col">
//                     <p>Product price</p>
//                     <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
//                </div>
//         </div>
//         <button type='submit' className='add-btn'>ADD</button>

//     </form>
//    </div>
//   )
// }

// export default Add


import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({url}) => {
   
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please upload an image');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: '',
          description: '',
          category: 'Salad',
          price: ''
        });
        setImage(null);
        toast.success('Product added successfully');
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload area" />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="image"
            required
            style={{ display: 'none' }}
          />
          <button type="button" onClick={() => document.getElementById('image').click()} className="upload-btn">
            Choose File
          </button>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            value={data.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-catgory-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              value={data.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
