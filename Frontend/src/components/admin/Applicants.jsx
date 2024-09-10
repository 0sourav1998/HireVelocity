import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { getApplcants } from '@/services/operations/applicationOperation';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicants } from '../redux/Slice/applicationSlice';

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
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-6 mx-auto max-w-7xl">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Applicants</h1>
          <ApplicantsTable />
        </div>
      </main>
    </div>
  );
};

export default Applicants;
