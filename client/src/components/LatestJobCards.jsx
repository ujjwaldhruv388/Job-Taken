import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-lg bg-gradient-to-r from-white to-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer'
        >
            <div className='mb-4'>
                <h1 className='text-2xl font-bold text-gray-900'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-600'>{job?.location || 'Location Not Specified'}</p>
            </div>
            <div className='mb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>{job?.title}</h2>
                <p className='text-sm text-gray-700 mt-1'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap gap-3 mt-4'>
                <Badge className='bg-blue-100 text-blue-800 font-medium' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='bg-orange-100 text-orange-800 font-medium' variant="ghost">{job?.jobType}</Badge>
                <Badge className='bg-purple-100 text-purple-800 font-medium' variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
