// import React, {  useContext, useState } from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'
// import { StoreContext } from '../../context/storeContext'
// import axios from 'axios'
// const LoginPopup = ({setShowLogin}) => {

//     const {url}=useContext(StoreContext);
//     const {token,setToken}=useContext(StoreContext);

//     const[currState,setCurrState]=useState('Login')
//     const[data,setData]=useState({
//         name:"",
//         email:"",
//         password:"",
//     })
//     const onChangeHandler=(event)=>{
//         const name=event.target.name;
//         const value=event.target.value;
//         setData(data=>({...data,[name]:value}))
//     }
     
// const onLogin=async(event)=>{
//  event.preventDefault();
//  let newUrl=url;
//  if(currState==='Login'){
//     newUrl+="/api/user/login"
//  }else{
//     newUrl+="/api/user/register"
//  }
//  const response =await axios.post(newUrl,data);
//  if(response.data.success){
//      setToken(response.data.token);
//      localStorage.setItem('token',response.data.token)
//      setShowLogin(false);
//  }
//  else{
//     alert(response.data.message)
//  }
// }

//   return (
//     <div className='login-popup'>
//         <form onSubmit={onLogin} className="login-popup-container">
//         <div className="login-popup-title">
//             <h2>{currState}</h2>
//             <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
//         </div>
//         <div className="login-popup-inputs">
//             {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler}  value={data.name} type='text' placeholder='your name'required />}
//             <input name='email' onChange={onChangeHandler}  value={data.email} type='email' placeholder='your email' required/>
//             <input name='password' onChange={onChangeHandler}  value={data.password} type='password' placeholder='your password' required/>
//         </div>
//         <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
//         <div className="login-popup-condition">
//             <input type="checkbox" required />
//             <p> By continuing ,i agree to the terms of use & private policy. </p>
//         </div>
//         {currState==="Login"? 
//         <p>Createa new account?<span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
//         : 
//         <p>Already have an account?<span  onClick={()=>setCurrState("Login")}>Login here</span></p>}
//         </form>
//     </div>
//   )
// }

// export default LoginPopup



import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPopup = ({ setShowLogin }) => {
  const { url } = useContext(StoreContext);
  const { token, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url.endsWith('/') ? url.slice(0, -1) : url; // Remove trailing slash if present

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      console.log('Response:', response);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
        if (currState === 'Login') {
          toast.success('Login successful!');
        } else {
          toast.success('Registration successful!');
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      toast.error('An error occurred while processing your request. Please try again.');
    }
  };
  
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Login' ? null : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Your password'
            required
          />
        </div>
        <button type='submit'>{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPopup;
