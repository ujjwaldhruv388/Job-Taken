import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { HashLoader } from 'react-spinners';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        if (loading || isApplied) return;

        setLoading(true);
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error('Error applying for job:', error);
            toast.error('Failed to apply for job.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                } else {
                    toast.error(res.data.message);
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
                toast.error('Failed to fetch job details.');
            } finally {
                setLoading(false);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <HashLoader color="#7209b7" />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">{singleJob?.title}</h1>
                        <p className="text-gray-500 mt-2">{singleJob?.company?.name}</p>
                        <div className="flex items-center gap-2 mt-4">
                            <Badge className="bg-blue-100 text-blue-700 font-semibold">{singleJob?.position} Positions</Badge>
                            <Badge className="bg-red-100 text-red-700 font-semibold">{singleJob?.jobType}</Badge>
                            <Badge className="bg-purple-100 text-purple-700 font-semibold">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={applyJobHandler}
                        disabled={isApplied || loading}
                        className={`ml-4 py-2 px-4 rounded-lg font-medium ${isApplied ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-[#7209b7] text-white hover:bg-[#5f32ad]'}`}
                    >
                        {loading ? <HashLoader size={24} color="#ffffff" /> : (isApplied ? 'Already Applied' : 'Apply Now')}
                    </Button>
                </div>
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Job Details</h2>
                    <div className="mt-4">
                        <p className="text-gray-600"><span className="font-semibold">Role:</span> {singleJob?.title}</p>
                        <p className="text-gray-600 mt-2"><span className="font-semibold">Location:</span> {singleJob?.location}</p>
                        <p className="text-gray-600 mt-2"><span className="font-semibold">Description:</span> {singleJob?.description}</p>
                        <p className="text-gray-600 mt-2"><span className="font-semibold">Experience:</span> {singleJob?.experience} years</p>
                        <p className="text-gray-600 mt-2"><span className="font-semibold">Salary:</span> {singleJob?.salary} LPA</p>
                        <p className="text-gray-600 mt-2"><span className="font-semibold">Total Applicants:</span> {singleJob?.applications?.length}</p>
                        <p className="text-gray-600 mt-2"><span className="font-semibold">Posted Date:</span> {new Date(singleJob?.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDescription;
