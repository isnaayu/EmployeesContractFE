import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb"
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import Loaders from "../../components/Loaders";
import { fetchFileLists } from "../../store/Reducers/FileListSlice";
import { FileListsResponse } from "../../types/FileLists";
import DropdownUser from "../../components/Header/DropdownUser";

const FileListPage = () => {
    const dispatch = useAppDispatch();
    const { fileLists, loading } = useAppSelector((state) => state.fileList);

    useEffect(() => {
        dispatch(fetchFileLists());
      }, [dispatch]);

      if (loading) return <Loaders/>;


  return (
    <>
    <Breadcrumb pageName="File List Data" />


    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        {/* Download Template */}
        <div className="flex items-end gap-3 2xsm:gap-7">
          <ul className="flex items-end gap-2 2xsm:gap-4 ml-auto">
            
          <DropdownUser/>
          </ul>
          </div>
        

        {/* End Download Template */}






        <table className="w-full table-auto mt-4">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
     
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Subject Name
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                File Name
              </th>
            </tr>
          </thead>
          <tbody>
            {fileLists.map((fl : FileListsResponse) => (
              <tr key={fl.fileListId}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {fl.subjectName}
                  </h5>
                  
                </td>
                
                
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {fl.fileName}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default FileListPage