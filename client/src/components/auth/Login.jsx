import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { HashLoader } from 'react-spinners'
import Navbar from '../shared/Navbar'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <>
        <Navbar/>
     
        <section className="px-5 lg:px-0 mt-[30px]">
        <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Hello! <span className="text-blue-700">Welcome</span> Back 👻
          </h3>
          <form className="py-4 md:py-0" onSubmit={submitHandler}>
            <div className="mb-5">
              <input type="email"
              placeholder="Enter Your Email"
              name="email"
              value={input.email} 
              onChange={changeEventHandler}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
            </div>
            <div className="mb-5">
              <input type="password"
              placeholder="Password Here"
              name="password"
              value={input.password} 
              onChange={changeEventHandler}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
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



            <div className="mt-7">
              <button
                type="submit"
                className="w-full bg-blue-700 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                {loading ? <HashLoader size={25} color='#fff' /> : "Login"}
              </button>
            </div>
            <p className="mt-5 text-textColor text-center">
              Don&apos;t have an account? 
                <Link to='/signup' className='text-primaryColor font-medium ml-1 text-blue-600'>
                   Register
                </Link>
            </p>
          </form>
        </div>
      </section>
      </>
    )
}

export default Login