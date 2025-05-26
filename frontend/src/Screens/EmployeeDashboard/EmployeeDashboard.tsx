import { useEffect, useState } from 'react';
import { getCookieItem } from '../../Utils/cookiesHelper';
import RequestAccessModal from '../../components/Modals/RequestAccessModal';
import { getSoftwares } from '../../api/services/softwareService';
import { userSoftwareRequestsStatus } from '../../api/services/requestService';
import type { softwareRequestsStatusResponse } from '../../api/types/requestService.types'
import type { Software } from '../../api/types/softwareService.types'
import { requestAccess } from '../../api/services/requestService';
import toast from 'react-hot-toast';



const EmployeeDashboard = () => {
    const username = getCookieItem('username');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allSoftwares, setAllSoftwares] = useState<Software[] | null>(null);
    const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(null);
    const [requestsStatus, setRequestsStatus] = useState<softwareRequestsStatusResponse | null>(null);

    useEffect(() => {
        const getAllSoftwares = async () => {
            const response = await getSoftwares();
            setAllSoftwares(response?.softwares);
        }
        getAllSoftwares();
    }, [getSoftwares]);
    
    useEffect(() => {
        const softwareRequestsStatus = async () => {
            const response = await userSoftwareRequestsStatus();
            setRequestsStatus(response);
        }
        softwareRequestsStatus();
    }, [userSoftwareRequestsStatus]);

    const handleRequestAccess = (software: Software) => {
        setSelectedSoftware(software);
        setIsModalOpen(true);
    };

    const handleSubmitRequest = async (accessType: string, reason: string) => {
        try {
            await requestAccess({
                softwareId: String(selectedSoftware?.id),
                accessType,
                reason
            });
            toast.success(`Request for ${selectedSoftware?.name} made Successfully`);

        } catch (error) {
            toast.error("Request Unsucessful");
            console.log("Error in Employee dashboard : ", error);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
                <p className="mt-2 text-gray-600">
                    Welcome back, {username}. Manage your software access requests.
                </p>
            </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">Pending Requests</h3>
                        <div className="text-3xl font-bold text-yellow-500 mt-2">
                            {requestsStatus?.pending !== undefined ? String(requestsStatus?.pending) : 
                                <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin ml-1"></div>
                            }
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">Approved Requests</h3>
                        <div className="text-3xl font-bold text-green-500 mt-2">
                            {requestsStatus?.approved !== undefined ? String(requestsStatus?.approved) : 
                                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin ml-1"></div>
                            }
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">Rejected Requests</h3>
                        <div className="text-3xl font-bold text-red-500 mt-2">
                            {requestsStatus?.rejected !== undefined ? String(requestsStatus?.rejected) : 
                                <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin ml-1"></div>
                            }
                        </div>
                    </div>
                </div> 

            <div className="bg-white rounded-lg shadow overflow-visible">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Software
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Access Levels
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allSoftwares?.map((software) => (
                            <tr key={software.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{software.name}</div>
                                    <div className="text-sm text-gray-500">{software.description}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {software.accessLevels.map((level) => (
                                            <span
                                                key={level}
                                                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                                            >
                                                {level}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleRequestAccess(software)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Request Access
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedSoftware && (
                <RequestAccessModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    softwareName={selectedSoftware.name}
                    onSubmit={handleSubmitRequest}
                />
            )}
        </div>
    );
};

export default EmployeeDashboard;