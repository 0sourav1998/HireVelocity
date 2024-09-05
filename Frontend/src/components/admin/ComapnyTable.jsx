import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { getAllCompanies } from '@/services/operations/companyOperatons';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCompanies } from '../redux/Slice/companySlice';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useNavigate } from 'react-router-dom';

const CompanyTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.user);
    const { allCompanies, searchCompany } = useSelector((state) => state.company);
    const [filteredResult, setFilteredResult] = useState();

    useEffect(() => {
        if (searchCompany) {
            const result = allCompanies?.filter((company) =>
                company?.name?.toLowerCase().includes(searchCompany.toLowerCase())
            );
            setFilteredResult(result);
        } else {
            setFilteredResult(allCompanies);
        }
    }, [allCompanies, searchCompany]);

    const fetchAllCompanies = async () => {
        const result = await getAllCompanies(token);
        if (result) {
            dispatch(setAllCompanies(result));
            sessionStorage.setItem("allCompanies", JSON.stringify(result));
        }
    };

    useEffect(() => {
        fetchAllCompanies();
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-5 p-6 bg-white shadow-lg rounded-lg">
            <Table className="w-full">
                <TableCaption className="text-lg font-semibold mb-4">A List Of Recent Registered Companies</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="p-4 text-left">Logo</TableHead>
                        <TableHead className="p-4 text-left">Name</TableHead>
                        <TableHead className="p-4 text-left">Posted Date</TableHead>
                        <TableHead className="p-4 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allCompanies?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center p-4">No Company registered so far</TableCell>
                        </TableRow>
                    ) : (
                        filteredResult?.map((company) => (
                            <TableRow key={company.id} className="border-b last:border-none hover:bg-gray-50">
                                <TableCell className="p-4">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={company.logo} alt={company.name} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="p-4">{company?.name}</TableCell>
                                <TableCell className="p-4">{new Date(company?.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="p-4 text-right">
                                    <Popover className="gap-y-4">
                                        <PopoverTrigger className="cursor-pointer">
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="bg-white p-2 rounded-md shadow-lg">
                                            <div
                                                className="flex gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
                                                onClick={() => navigate(`/companies/setInfo/${company._id}`)}
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

export default CompanyTable;
