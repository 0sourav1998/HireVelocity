import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getJobsOfAdmin } from '@/services/operations/JobOperations';
import { setAdminJobs } from '../redux/Slice/jobSlice';

const AdminJobTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.user);
    const { adminJobs, searchJob } = useSelector((state) => state.job);
    const [filteredResult, setFilteredResult] = useState();
    console.log(filteredResult)

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
        console.log("RESULT",result)
        if (result) {
            dispatch(setAdminJobs(result));
            sessionStorage.setItem("adminJobs", JSON.stringify(result));
        }
    };

    useEffect(() => {
        fetchAllJobs();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg">
            <Table className="w-full">
                <TableCaption className="text-lg font-semibold mb-4">A List Of Recent Registered Jobs</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="p-4 text-left">Company Name</TableHead>
                        <TableHead className="p-4 text-left">Title</TableHead>
                        <TableHead className="p-4 text-left">Posted Date</TableHead>
                        <TableHead className="p-4 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {adminJobs?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center p-4">No Company registered so far</TableCell>
                        </TableRow>
                    ) : (
                        filteredResult?.map((job) => (
                            <TableRow key={job.id} className="border-b last:border-none hover:bg-gray-50">
                                <TableCell className="p-4">{job?.company?.name}</TableCell>
                                <TableCell className="p-4">{job?.title}</TableCell>
                                <TableCell className="p-4">{new Date(job?.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="p-4 text-right">
                                    <Popover className="gap-y-4">
                                        <PopoverTrigger className="cursor-pointer">
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="bg-white p-2 rounded-md shadow-lg">
                                            <div
                                                className="flex gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
                                                onClick={() => navigate(`/companies/setInfo/${job._id}`)}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
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
