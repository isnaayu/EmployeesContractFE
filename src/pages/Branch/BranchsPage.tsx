import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteBranch, fetchBranches } from "../../store/Reducers/BranchSlice";
import { BranchResponse } from "../../types/branches";
import { useEffect, useState } from "react";
import Loaders from "../../components/Loaders";

const BranchsPage = () => {
    const dispatch = useAppDispatch();
    const { branches, loading } = useAppSelector((state) => state.branch);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [BranchId, setBranchId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setBranchId(id);
        setShowDeleteModal(true);
      };
  
      const confirmDelete = () => {
        if (BranchId) {
            dispatch(deleteBranch(BranchId))
              .unwrap() 
              .then(() => {
                  dispatch(fetchBranches()); 
              })
              .catch((error) => {
                  console.error("Failed to delete the branch:", error);
              });
    
            setShowDeleteModal(false);
            setBranchId(null);
        }
    };
  
      const cancelDelete = () => {
        setShowDeleteModal(false);
        setBranchId(null);
      };

    useEffect(() => {
        dispatch(fetchBranches());
      }, [dispatch]);
      if (loading) return <Loaders/>;
  return (
    <>
    <Breadcrumb pageName="Branch Data" />


    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {/* Button Add Branch */}
        <Link
              to="/add-branches"
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <span>
              <svg className='fill-current' fill="none" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                width="20" height="20" viewBox="0 0 612 612" xmlSpace="preserve">
              <g>
                <path d="M275.4,295.8c81.682,0,147.899-66.217,147.899-147.9C423.299,66.218,357.082,0,275.4,0c-81.683,0-147.9,66.217-147.9,147.9
                  C127.5,229.583,193.717,295.8,275.4,295.8z M345.461,206.604c-6.729,22.246-35.549,38.968-70.09,38.968
                  c-34.542,0-63.363-16.723-70.091-38.968H345.461z M586.5,510v20.4c0,5.634-4.566,10.2-10.199,10.2H515.1V601.8
                  c0,5.634-4.566,10.2-10.199,10.2h-20.4c-5.633,0-10.199-4.566-10.199-10.2v-61.199H413.1c-5.633,0-10.199-4.566-10.199-10.2V510
                  c0-5.633,4.566-10.199,10.199-10.199h61.201v-61.2c0-5.634,4.566-10.2,10.199-10.2h20.4c5.633,0,10.199,4.566,10.199,10.2v61.2
                  h61.201C581.934,499.8,586.5,504.367,586.5,510z M382.5,510v20.4c0,5.419,1.535,10.438,4.016,14.857
                  c-30.803,3.35-67.52,5.542-111.116,5.542c-142.607,0-212.393-23.302-237.979-34.686c-6.602-2.938-11.921-11.336-11.921-18.562
                  V448.8c0-73.056,55.624-133.663,126.599-141.78c2.157-0.247,5.355,0.677,7.113,1.949C191.938,332.66,232.002,346.8,275.4,346.8
                  s83.463-14.14,116.188-37.831c1.758-1.272,4.957-2.196,7.113-1.949c58.746,6.719,106.869,49.438,121.744,105.37
                  c-4.572-2.724-9.848-4.389-15.545-4.389h-20.4c-16.873,0-30.6,13.726-30.6,30.6v40.8H413.1C396.227,479.4,382.5,493.126,382.5,510z
                  "/>
              </g>
              </svg>
              </span>
              Import New Branch
            </Link>
        {/* End Button Branch */}

        <table className="w-full table-auto mt-4">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Branch Code
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Branch Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch : BranchResponse) => (
              <tr key={branch.branchId}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {branch.branchCode}
                  </h5>
                </td>
                
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {branch.branchName}
                  </p>
                </td>
                
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary" onClick={()=> handleDelete(branch.branchId)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {showDeleteModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm md:max-w-md lg:max-w-lg w-full mx-4 md:mx-0">
      <p className="text-black mb-4">Are you sure to delete this?</p>
      <div className="flex justify-end">
        <button
          onClick={()=> confirmDelete()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Delete
        </button>
        <button
          onClick={cancelDelete}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </>
  )
}

export default BranchsPage