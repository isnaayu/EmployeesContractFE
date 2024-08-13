import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import { getDetailEmployeeById, updateEmployeeAsync } from "../../store/Reducers/EmployeeSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { DetailEmployee, DetailEmployeeRequest } from "../../types/employee";
import flatpickr from "flatpickr";
import { formatDate } from "../../types/FormatDates";
import { fetchBranches } from "../../store/Reducers/BranchSlice";
import { fetchPositions } from "../../store/Reducers/PositionSlice";
import Loaders from "../../components/Loaders";

const DetailsEmployee = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { detailEmployeeId } = location.state as { detailEmployeeId: number };
    const { detailEmployees, loading, error } = useAppSelector((state) => state.detailEmployee);
    const { positions } = useAppSelector((state) => state.position);
    const { branches } = useAppSelector((state) => state.branch);
    const [employee, setEmployee] = useState<DetailEmployee | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        dispatch(fetchBranches());
      }, [dispatch]);

      useEffect(() => {
        dispatch(fetchPositions());
      }, [dispatch, positions]);

    useEffect(() => {
        if (employee && isEditing) {
          flatpickr('.form-datepicker', {
            mode: 'single',
            static: true,
            monthSelectorType: 'static',
            dateFormat: 'd-M-Y',
            prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
            onChange: (selectedDates, dateStr, instance) => {
                const fieldName = instance.element.getAttribute('name') || 'defaultName';
                const formattedDate = selectedDates.length ? new Date(selectedDates[0].getTime() - selectedDates[0].getTimezoneOffset() * 60000).toISOString().split('T')[0] : '';
                handleInputChange({
                  target: { name: fieldName, value: formattedDate }
                } as React.ChangeEvent<HTMLInputElement>);
              }
          });
        }
      }, [employee, isEditing]);

    useEffect(() => {
        dispatch(getDetailEmployeeById(detailEmployeeId));
    }, [dispatch, detailEmployeeId]);

    useEffect(() => {
        const foundEmployee = detailEmployees.find(emp => emp.detailEmployeeId === detailEmployeeId);
        if (foundEmployee) {
            setEmployee(foundEmployee);
        }
    }, [detailEmployees, detailEmployeeId]);
    const handleEdit = () => {
        setIsEditing(true);
    };

    if (loading) return <Loaders/>;
    if (error) return <div>Error: {error}</div>;
    if (!employee) return <div>Employee not found</div>;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isEditing) {
            const { name, value } = e.target;
            setEmployee(prev => prev ? { ...prev, [name]: value } : null);
        }
    };
    
    const handleSave = () => {
        if (employee) {
          const employeeRequest: DetailEmployeeRequest = {
            detailEmployeeId: employee.detailEmployeeId,
            employeeId: employee.employeeId,
            birthDate: employee.birthDate,
            positionId: employee.positionId,
            branchId: employee.branchId,
            startDate: employee.startDate,
            contractPeriod: employee.contractPeriod,
            employeeName: employee.employeeName,
          };

          console.log("request"+employeeRequest)
          dispatch(updateEmployeeAsync(employeeRequest));
          setIsEditing(false);
          if(!loading) navigate("/employees")
          
        }
      };

    
      const handleCancel = () => {
        const originalEmployee = detailEmployees.find(emp => emp.detailEmployeeId === detailEmployeeId);
        if (originalEmployee) {
          setEmployee(originalEmployee);
        }
        setIsEditing(false);
      };

      const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPosition = positions.find(pos => pos.positionName === e.target.value);
        if (selectedPosition) {
            setEmployee(prev => prev ? { 
                ...prev, 
                positionId: selectedPosition.positionId,
                positionName: selectedPosition.positionName, 
                positionCode: selectedPosition.positionCode 
            } : null);
        }
    };
    
    const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranch = branches.find(branch => branch.branchName === e.target.value);
        if (selectedBranch) {
            setEmployee(prev => prev ? { 
                ...prev, 
                branchId: selectedBranch.branchId,
                branchName: selectedBranch.branchName, 
                branchCode: selectedBranch.branchCode 
            } : null);
        }
    };
    
    

    return (
        <>
            <Breadcrumb pageName="Detail Employee" />

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Employee Information
                </h3>
               
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                        Full Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="employeeName"
                        id="employeeName"
                        value={employee.employeeName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Birth Date
                    </label>
                    <div className="relative">
                        <input
                        className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={formatDate(employee.birthDate)}
                        readOnly={!isEditing}
                        name="birthDate"
                        data-class="flatpickr-right"
                        />

                        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                            fill="#64748B"
                            />
                        </svg>
                        </div>
                    </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="positionCode">
                        Position Code
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="employeeName"
                        id="employeeName"
                        value={employee.positionCode}
                        onChange={handleInputChange}
                        disabled
                        />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="positionName">
                        Position Name
                      </label>
                      <select
                        className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        value={employee.positionName}
                        onChange={handlePositionChange}
                        disabled={!isEditing}
                        >
                        {positions.map(pos => (
                            <option key={pos.positionCode} value={pos.positionName}>
                            {pos.positionName}
                            </option>
                        ))}
                        </select>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="branchCode">
                        Branch Code
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="branchCode"
                        id="branchCode"
                        value={employee.branchCode}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="branchName">
                        Branch Name
                      </label>
                      <select
                        className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        value={employee.branchName}
                        onChange={handleBranchChange}
                        disabled={!isEditing}
                        >
                        {branches.map(branch => (
                            <option key={branch.branchCode} value={branch.branchName}>
                            {branch.branchName}
                            </option>
                        ))}
                        </select>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Start Date
                    </label>
                    <div className="relative">
                        <input
                        className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={formatDate(employee.startDate)}
                        readOnly={!isEditing}
                        name="startDate"
                        data-class="flatpickr-right"
                        />

                        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M15.7504 2.9812H14.2879V2.36245C14.2879 2.02495 14.0066 1.71558 13.641 1.71558C13.2754 1.71558 12.9941 1.99683 12.9941 2.36245V2.9812H4.97852V2.36245C4.97852 2.02495 4.69727 1.71558 4.33164 1.71558C3.96602 1.71558 3.68477 1.99683 3.68477 2.36245V2.9812H2.25039C1.29414 2.9812 0.478516 3.7687 0.478516 4.75308V14.5406C0.478516 15.4968 1.26602 16.3125 2.25039 16.3125H15.7504C16.7066 16.3125 17.5223 15.525 17.5223 14.5406V4.72495C17.5223 3.7687 16.7066 2.9812 15.7504 2.9812ZM1.77227 8.21245H4.16289V10.9968H1.77227V8.21245ZM5.42852 8.21245H8.38164V10.9968H5.42852V8.21245ZM8.38164 12.2625V15.0187H5.42852V12.2625H8.38164V12.2625ZM9.64727 12.2625H12.6004V15.0187H9.64727V12.2625ZM9.64727 10.9968V8.21245H12.6004V10.9968H9.64727ZM13.8379 8.21245H16.2285V10.9968H13.8379V8.21245ZM2.25039 4.24683H3.71289V4.83745C3.71289 5.17495 3.99414 5.48433 4.35977 5.48433C4.72539 5.48433 5.00664 5.20308 5.00664 4.83745V4.24683H13.0504V4.83745C13.0504 5.17495 13.3316 5.48433 13.6973 5.48433C14.0629 5.48433 14.3441 5.20308 14.3441 4.83745V4.24683H15.7504C16.0316 4.24683 16.2566 4.47183 16.2566 4.75308V6.94683H1.77227V4.75308C1.77227 4.47183 1.96914 4.24683 2.25039 4.24683ZM1.77227 14.5125V12.2343H4.16289V14.9906H2.25039C1.96914 15.0187 1.77227 14.7937 1.77227 14.5125ZM15.7504 15.0187H13.8379V12.2625H16.2285V14.5406C16.2566 14.7937 16.0316 15.0187 15.7504 15.0187Z"
                            fill="#64748B"
                            />
                        </svg>
                        </div>
                    </div>

                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="contractPeriod">
                        Contract Period
                      </label>
                      <input
                        className="w-full rounded border border-stroke py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="contractPeriod"
                        id="contractPeriod"
                        value={employee.contractPeriod}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Contract End
                    </label>
                    <input
                    disabled
                      className="form-datepicker w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={formatDate(employee.contractEnd)}
                    />
                  </div>

                  <div className="flex justify-end gap-4.5">
                  {isEditing ? (
                      <>
                        <button
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                          type="button"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                        <button
                          className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                          type="button"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        type="button"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    )}

                  </div>
                </form>
              </div>
            </div>
        </>
    )
}

export default DetailsEmployee;