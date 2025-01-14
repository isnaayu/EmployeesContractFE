import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { deleteEmployee, getAllDetailEmployees } from "../../store/Reducers/EmployeeSlice";
import { DetailEmployee } from "../../types/employee";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { formatDate } from "../../types/FormatDates";
import Loaders from "../../components/Loaders";
import { fetchBranches } from "../../store/Reducers/BranchSlice";
import { fetchPositions } from "../../store/Reducers/PositionSlice";


const EmployeesPages = () => {
    const dispatch = useAppDispatch();
    const { detailEmployees, loading } = useAppSelector((state) => state.detailEmployee);
    const [dueDate, setDueDate] = useState<number | undefined>(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const navigate = useNavigate();
    const { positions } = useAppSelector((state) => state.position);
    const { branches } = useAppSelector((state) => state.branch);

    const goToDetails = (detailEmployeeId? : number) => {
      navigate('/employee-details', { state: { detailEmployeeId } });
    };

    const handleDelete = (detailEmployeeId: number) => {
        setSelectedEmployeeId(detailEmployeeId);
        setShowDeleteModal(true);
      };
  
      const confirmDelete = () => {
        if (selectedEmployeeId) {
            dispatch(deleteEmployee(selectedEmployeeId))
              .unwrap() 
              .then(() => {
                  dispatch(getAllDetailEmployees({ daysUntilContractEnds: dueDate })); 
              })
              .catch((error) => {
                  console.error("Failed to delete the Employee:", error);
              });
    
            setShowDeleteModal(false);
            setSelectedEmployeeId(null);
        }
    };
  
      const cancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedEmployeeId(null);
      };

    useEffect(() => {
        dispatch(getAllDetailEmployees({ daysUntilContractEnds: dueDate }));
      }, [dispatch, dueDate, branches, positions]);

      if (loading) return <Loaders/>;

      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(Number(e.target.value));
        console.log(e.target.value);
      };

   


  return (
    <>
    
        <Breadcrumb pageName="Employees Data" />
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
        {/* Wrapper untuk button dan search */}
        <div className="flex justify-between items-center mb-4">
          {/* Button Add Employee */}
          <Link
            to="/add-employee"
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <svg
                className="fill-current"
                fill="none"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="20"
                height="20"
                viewBox="0 0 612 612"
                xmlSpace="preserve"
              >
                <g>
                  <path d="M275.4,295.8c81.682,0,147.899-66.217,147.899-147.9C423.299,66.218,357.082,0,275.4,0c-81.683,0-147.9,66.217-147.9,147.9C127.5,229.583,193.717,295.8,275.4,295.8z M345.461,206.604c-6.729,22.246-35.549,38.968-70.09,38.968c-34.542,0-63.363-16.723-70.091-38.968H345.461z M586.5,510v20.4c0,5.634-4.566,10.2-10.199,10.2H515.1V601.8c0,5.634-4.566,10.2-10.199,10.2h-20.4c-5.633,0-10.199-4.566-10.199-10.2v-61.199H413.1c-5.633,0-10.199-4.566-10.199-10.2V510c0-5.633,4.566-10.199,10.199-10.199h61.201v-61.2c0-5.634,4.566-10.2,10.199-10.2h20.4c5.633,0,10.199,4.566,10.199,10.2v61.2h61.201C581.934,499.8,586.5,504.367,586.5,510z M382.5,510v20.4c0,5.419,1.535,10.438,4.016,14.857c-30.803,3.35-67.52,5.542-111.116,5.542c-142.607,0-212.393-23.302-237.979-34.686c-6.602-2.938-11.921-11.336-11.921-18.562V448.8c0-73.056,55.624-133.663,126.599-141.78c2.157-0.247,5.355,0.677,7.113,1.949C191.938,332.66,232.002,346.8,275.4,346.8s83.463-14.14,116.188-37.831c1.758-1.272,4.957-2.196,7.113-1.949c58.746,6.719,106.869,49.438,121.744,105.37c-4.572-2.724-9.848-4.389-15.545-4.389h-20.4c-16.873,0-30.6,13.726-30.6,30.6v40.8H413.1C396.227,479.4,382.5,493.126,382.5,510z"/>
                </g>
              </svg>
            </span>
            Import New Employee
          </Link>
          {/* End Button Employee */}

          {/* Search */}
          <form className="flex items-end max-w-sm">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="number"
                id="simple-search"
                value={dueDate}
                onChange={handleSearchChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Input Days Until ContractEnd"
                required
              />
            </div>

          </form>
          {/* End Search */}
        </div>

        <table className="w-full table-auto mt-4">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Positions
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Branch
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                ContractEnd
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
          {detailEmployees.map((employee : DetailEmployee) => (
                <tr key={employee.detailEmployeeId}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">{employee.employeeName}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{employee.positionName}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{employee.branchName}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{formatDate(employee.contractEnd)}</p>
                  </td>
                  
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button onClick={() => goToDetails(employee.detailEmployeeId)} className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary" onClick={()=> handleDelete(employee.detailEmployeeId)}>
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

export default EmployeesPages