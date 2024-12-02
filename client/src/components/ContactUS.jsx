import { useState } from "react";
import axios from "axios";
import { toast } from 'sonner';
import { HashLoader } from "react-spinners";
import Navbar from "./shared/Navbar";
import { USER_API_END_POINT } from '../utils/constant';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${USER_API_END_POINT}/contact`, formData);
      if (data.success) {
        toast.success(data.message);
        setFormData({ email: '', subject: '', message: '' });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className='px-4 mx-auto max-w-screen-md mt-10'>
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-black mt-8 animate-slideIn">
            Contact <span className="text-[#FFD700]">Us</span>
          </h1>
          <p className='mt-3 lg:mb-16 font-light text-center text-gray-600'>
            Got a technical issue? Want to send feedback about a beta feature? Let us know!
          </p>
        </div>
        <form className='space-y-6 mt-[-12px]' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className='block text-lg font-medium text-gray-700'>
              Your Email
            </label>
            <input
              type="email"
              id='email'
              name="email"
              onChange={handleInputChange}
              placeholder='example@gmail.com'
              value={formData.email}
              className='w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor
              text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer rounded-md mt-1'
            />
          </div>
          <div>
            <label htmlFor="subject" className='block text-lg font-medium text-gray-700'>
              Subject
            </label>
            <input
              type="text"
              id='subject'
              name="subject"
              onChange={handleInputChange}
              placeholder='Let us know how we can help you'
              value={formData.subject}
              className='w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor
              text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer rounded-md mt-1'
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className='block text-lg font-medium text-gray-700'>
              Your Message
            </label>
            <textarea
              rows={5}
              name="message"
              id='message'
              placeholder='Leave a comment . . .'
              value={formData.message}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor
              text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer rounded-md mt-1'
            />
          </div>
          <button
            type="submit"
            className="bg-[#6A38C2] py-[15px] px-[35px] rounded-md text-white font-[600] sm:w-fit hover:bg-rose-900 transition-colors duration-300"
          >
            {loading ? <HashLoader size={25} color="#fff" /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
