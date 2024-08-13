import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deletePosition, fetchPositions } from "../../store/Reducers/PositionSlice";
import { PositionsResponse } from "../../types/positions";
import { useEffect, useState } from "react";
import Loaders from "../../components/Loaders";

const PositionsPage = () => {
    const dispatch = useAppDispatch();
    const { positions, loading, error } = useAppSelector((state) => state.position);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [PositionId, setPositionId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        setPositionId(id);
        setShowDeleteModal(true);
      };
  
      const confirmDelete = () => {
        if (PositionId) {
            dispatch(deletePosition(PositionId))
              .unwrap() 
              .then(() => {
                  dispatch(fetchPositions()); 
              })
              .catch((error) => {
                  console.error("Failed to delete the position:", error);
              });
    
            setShowDeleteModal(false);
            setPositionId(null);
        }
    };
  
      const cancelDelete = () => {
        setShowDeleteModal(false);
        setPositionId(null);
      };

    useEffect(() => {
        dispatch(fetchPositions());
      }, [dispatch]);

      if (loading) return <Loaders/>;


  return (
    <>
    <Breadcrumb pageName="Positions Data" />


    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {/* Button Add Positions */}
        <Link
              to="/add-positions"
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
              Import New Positions
            </Link>
        {/* End Button Positions */}

        <table className="w-full table-auto mt-4">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
     
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Positions Code
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Positions Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position : PositionsResponse) => (
              <tr key={position.positionId}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {position.positionCode}
                  </h5>
                  
                </td>
                
                
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {position.positionName}
                  </p>
                </td>
                
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link to="/employee-details" className="hover:text-primary">
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
                    </Link>
                    <button className="hover:text-primary" onClick={()=> handleDelete(position.positionId)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                          fill=""
                        />
                        <path
                          d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
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

export default PositionsPage