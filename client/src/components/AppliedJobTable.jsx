import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full bg-white shadow-md rounded-2xl">
        <TableCaption className="text-lg font-medium text-gray-700">
          A list of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 text-left">Date</TableHead>
            <TableHead className="py-3 px-4 text-left">Job Role</TableHead>
            <TableHead className="py-3 px-4 text-left">Company</TableHead>
            <TableHead className="py-3 px-4 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-5 text-gray-500">
                You haven't applied for any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                <TableCell className="py-3 px-4">
                  {appliedJob?.createdAt?.split('T')[0]}
                </TableCell>
                <TableCell className="py-3 px-4">{appliedJob.job?.title}</TableCell>
                <TableCell className="py-3 px-4">{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === 'rejected'
                        ? 'bg-red-400'
                        : appliedJob.status === 'pending'
                        ? 'bg-gray-400'
                        : 'bg-green-400'
                    } text-white`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
