import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { postPositions } from '../../store/Reducers/PositionSlice';

const AddPosition = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (file) {
            try {
                await dispatch(postPositions({file}));
                navigate("/positions")
            } catch (error) {
                console.error('Failed to import employee data:', error);
            }
        } else {
            console.warn('Please provide both file and subject name.');
        }
    };
  return (
    <>
        <Breadcrumb pageName="Import New Positions" />

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Insert Data
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <form onSubmit={handleSubmit}>
                        
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Attach file
                            </label>
                            <input
                                type="file"
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="flex justify-end gap-4.5">
                            <button
                                type="submit"
                                className="flex mt-4 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>
  )
}

export default AddPosition