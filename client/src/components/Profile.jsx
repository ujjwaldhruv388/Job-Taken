import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg my-8 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border border-gray-300 shadow-md rounded-full overflow-hidden">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="Profile"
                className="rounded-full w-[150px] h-[120px] mt-[-13px]"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen className="mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Mail className="text-gray-500" />
            <span className="text-gray-800">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="text-gray-500" />
            <span className="text-gray-800">{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-lg font-semibold text-gray-800">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-700">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-md font-bold">Resume </Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
