import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { getApplcants } from '@/services/operations/applicationOperation';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicants } from '../redux/Slice/applicationSlice';
import Footer from '../shared/Footer';

const Applicants = () => {
  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.applications);

  const fetchApplicants = async () => {

    const result = await getApplcants({ id: id }, token);
    sessionStorage.setItem('applicants', JSON.stringify(result?.applications));
    dispatch(setApplicants(result?.applications));
  };

  useEffect(() => {
    fetchApplicants();
  }, [id, token, dispatch,status]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col overflow-y-hidden">
      <Navbar />
      <main className="flex-grow sm:p-6 p-1 sm:m-12 mx-auto sm:max-w-7xl">
        <div className="bg-white shadow-lg rounded-lg sm:p-6 p-2 sm:max-w-7xl max-w-[290px]">
          <h1 className="sm:text-2xl text-lg font-bold text-gray-800 sm:mb-4 mb-0 text-center">Applicants</h1>
          <ApplicantsTable />
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Applicants;
