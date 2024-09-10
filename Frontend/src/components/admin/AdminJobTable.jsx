import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal, User2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getJobsOfAdmin } from '@/services/operations/JobOperations';
import { setAdminJobs } from '../redux/Slice/jobSlice';

const AdminJobTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.user);
    const { adminJobs, searchJob } = useSelector((state) => state.job);
    const [filteredResult, setFilteredResult] = useState([]);

    useEffect(() => {
        if (searchJob) {
            const result = adminJobs?.filter((job) =>
                job?.company?.name?.toLowerCase().includes(searchJob.toLowerCase()) || job?.title.toLowerCase().includes(searchJob.toLowerCase())
            );
            setFilteredResult(result);
        } else {
            setFilteredResult(adminJobs);
        }
    }, [adminJobs, searchJob]);

    const fetchAllJobs = async () => {
        const result = await getJobsOfAdmin(token);
        if (result) {
            dispatch(setAdminJobs(result));
            sessionStorage.setItem("adminJobs", JSON.stringify(result));
        }
    };

    useEffect(() => {
        fetchAllJobs();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-6 p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <Table className="w-full">
                <TableCaption className="text-lg font-semibold mb-4">A List Of Recent Registered Jobs</TableCaption>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="p-4 text-left font-medium text-gray-700">Company Name</TableHead>
                        <TableHead className="p-4 text-left font-medium text-gray-700">Title</TableHead>
                        <TableHead className="p-4 text-left font-medium text-gray-700">Posted Date</TableHead>
                        <TableHead className="p-4 text-right font-medium text-gray-700">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {adminJobs?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center p-4 text-gray-500">No jobs available</TableCell>
                        </TableRow>
                    ) : (
                        filteredResult?.map((job) => (
                            <TableRow key={job._id} className="border-b last:border-none hover:bg-gray-100 transition-colors">
                                <TableCell className="p-4 text-gray-800">{job?.company?.name}</TableCell>
                                <TableCell className="p-4 text-gray-800">{job?.title}</TableCell>
                                <TableCell className="p-4 text-gray-600">{new Date(job?.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="p-4 text-right">
                                    <Popover>
                                        <PopoverTrigger className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors cursor-pointer">
                                            <MoreHorizontal className="w-4 h-4 text-gray-600 ml-[8px]" />
                                        </PopoverTrigger>
                                        <PopoverContent className="bg-white p-2 rounded-md shadow-lg mt-2">
                                            <div
                                                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                                                onClick={() => navigate(`/companies/job/setInfo/${job._id}`)}
                                            >
                                                <Edit2 className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-800">Edit</span>
                                            </div>
                                            <div
                                                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer mt-1"
                                                onClick={() => navigate(`/jobs/${job._id}/applicants`)}
                                            >
                                                <User2 className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-800">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobTable;
