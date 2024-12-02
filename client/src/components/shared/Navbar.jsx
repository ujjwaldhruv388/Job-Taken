import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    const getLinkClass = ({ isActive }) => 
        `text-gray-700 hover:text-blue-700 transition-colors duration-300 ${isActive ? 'font-bold border-b-2 border-blue-700' : ''}`;

    return (
        <div className=' border-b-0 rounded-md '>
            <div className='flex items-center justify-between mx-auto max-w-[1000px] h-16 px-4'>
                <NavLink to={'/'}>
                    <h1 className='text-2xl font-bold text-gray-800'>
                    Job<span className='text-[#6A38C2]'>Mingle</span>
                    </h1>
                </NavLink>
                <div className='flex items-center gap-4'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><NavLink to="/admin/companies" className={getLinkClass}>Companies</NavLink></li>
                                    <li><NavLink to="/admin/jobs" className={getLinkClass}>Jobs</NavLink></li>
                                </>
                            ) : (
                                <>
                                    <li><NavLink to="/" className={getLinkClass}>Home</NavLink></li>
                                    <li><NavLink to="/jobs" className={getLinkClass}>Jobs</NavLink></li>
                                    <li><NavLink to="/browse" className={getLinkClass}>Browse</NavLink></li>
                                    <li><NavLink to="/contactUs" className={getLinkClass}>Contact Us</NavLink></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center'>
                                <NavLink to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white transition-colors duration-300">Signup</Button>
                                </NavLink>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer border-2 border-gray-300 rounded-full hover:shadow-lg transition-shadow duration-300">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-white border border-gray-200 rounded-md shadow-lg">
                                    <div className='p-4'>
                                        <div className='flex gap-2 items-center'>
                                            <Avatar className="cursor-pointer border-2 border-gray-300 rounded-full">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "User"} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium text-gray-800'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link" className='text-blue-600 hover:text-blue-800 transition-colors duration-300'>
                                                            <NavLink to="/profile">View Profile</NavLink>
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                            <div className='flex items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link" className='text-red-600 hover:text-red-800 transition-colors duration-300'>Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
