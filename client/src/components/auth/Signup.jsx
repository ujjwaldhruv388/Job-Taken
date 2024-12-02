import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { HashLoader } from 'react-spinners'


const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fileName, setFileName] = useState("");

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
        if (e.target.files?.[0]) {
            setFileName(e.target.files[0].name);
          } else {
            setFileName("");
          }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <Navbar />
            <section className='px-5 xl:px-0'>
        <div className='max-w-[500px] mx-auto'>
   

            <div className='rounded-l-lg lg:pl-16 py-10'>
              <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
                Create An <span className='text-blue-700'>Account</span> 💕
              </h3>
              <form onSubmit={submitHandler}>

                <div className="mb-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="fullname"
                    value={input.fullname}
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    required
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    value={input.email}
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    required
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="number"
                    placeholder="Enter Your Phone Number"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    required
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={input.password}
                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    required
                    onChange={changeEventHandler}
                  />
                </div>

                <div className='mb-5 flex items-center justify-between'>
                  <label className='text-headingColor font-bold text-[16px] leading-7'>
                    Are You A:
                    <select
                      name='role'
                      value={input.role}
                      onChange={changeEventHandler}
                      className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                    >
                      <option value="">Select</option>
                      <option value="student">Student</option>
                      <option value="recruiter">Recruiter</option>
                    </select>
                  </label>
                </div>


                <div className='relative w-[130px] h-[50px]'>
                <input 
                 type="file"
                 name="file" 
                 id="file"
                 onChange={changeFileHandler}
                 accept='/image/*'
                 className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                />
                <label 
                 htmlFor="file"
                 className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem]
                 text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
                >
                  {fileName || "Upload Photo"}
                </label>
              </div>

                <div className="mt-7">
                  <button
                    type="submit"
                    className="w-full bg-blue-700 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                    {loading ? <HashLoader size={25} color='#fff' /> : "Register"}
                  </button>
                </div>

                <p className="mt-5 text-textColor text-center">
                  Already have an account? 
                  <Link to='/login' className='text-primaryColor font-medium ml-1 text-blue-600'>
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>

      </section>
        </div>
    )
}

export default Signup

