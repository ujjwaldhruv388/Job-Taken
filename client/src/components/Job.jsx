import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }

    return (
        <div className='p-6 rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out'>
            <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-600'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button variant="outline" className="p-2 rounded-full border-gray-300 hover:border-gray-400" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} Logo`} />
                    </Avatar>
                </Button>
                <div>
                    <h2 className='text-xl font-semibold text-gray-800'>{job?.company?.name}</h2>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div className='mt-4'>
                <h3 className='text-lg font-semibold text-gray-900'>{job?.title}</h3>
                <p className='text-sm text-gray-700 mt-1'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap gap-3 mt-4'>
                <Badge className='bg-blue-100 text-blue-700 font-medium' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='bg-red-100 text-red-700 font-medium' variant="ghost">{job?.jobType}</Badge>
                <Badge className='bg-purple-100 text-purple-700 font-medium' variant="ghost">{job?.salary} LPA</Badge>
            </div>

            <div className='flex gap-4 mt-6'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline" 
                    className='text-gray-800 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-colors'
                >
                    Details
                </Button>
            </div>
        </div>
    )
}

export default Job
