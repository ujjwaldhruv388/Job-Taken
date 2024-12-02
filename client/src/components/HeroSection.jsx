import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center py-10 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 rounded-full filter blur-3xl transform scale-150 -z-10"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <span className="inline-block mx-auto px-6 py-3 rounded-full bg-white text-[#F83002] font-semibold shadow-lg animate-fadeIn">
          The Leading Job Search Platform
        </span>
        <h1 className="text-6xl font-extrabold text-black mt-8 animate-slideIn">
          Discover, Apply & <br /> Get Your <span className="text-[#FFD700]">Dream Job</span>
        </h1>
        <p className="mt-6 text-black text-lg max-w-2xl mx-auto animate-fadeInDelay">
          Explore countless job opportunities and take the first step towards your dream career. Join us and let your journey to success begin!
        </p>
        <div className="flex mt-12 w-full max-w-2xl mx-auto shadow-xl border border-gray-200 bg-white rounded-full items-center gap-4 relative z-10">
          <input
            type="text"
            placeholder="Search for your dream job"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            className="outline-none border-none w-full pl-6 py-4 rounded-l-full text-gray-700 text-lg focus:ring-2 focus:ring-purple-500"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#55289F] transition-all duration-300 transform hover:scale-105 h-13">
            <Search className="h-9 w-8 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
