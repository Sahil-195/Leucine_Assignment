import { useState, useEffect } from 'react';
import { getCookieItem } from '../../Utils/cookiesHelper';
import type { SoftwareRequest } from '../../api/types/requestService.types';
import { getStatusWiseSoftwareRequests, updateRequestStatus } from '../../api/services/requestService';

const ManagerDashboard = () => {
    const username = getCookieItem('username');
    const [pendingRequests, setPendingRequests] = useState<SoftwareRequest[]>([]);
    const [notPendingRequests, setNotPendingRequests] = useState<SoftwareRequest[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const response = await getStatusWiseSoftwareRequests();
            setPendingRequests(response?.pending);
            setNotPendingRequests(response?.notPending);
        };
        fetchRequests();
    }, [getStatusWiseSoftwareRequests]);

    const handleRequestAction = async (requestId: Number, status: 'Approved' | 'Rejected') => {
        try {
            await updateRequestStatus({id: requestId, status});
            const response = await getStatusWiseSoftwareRequests();
            setPendingRequests(response?.pending);
            setNotPendingRequests(response?.notPending);
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
                <p className="mt-2 text-gray-600">
                    Welcome back, {username}. Manage software access requests.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Pending Requests</h2>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Software Requested
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User Requested
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Access Level Requested
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pendingRequests?.map((request) => (
                            <tr key={request.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{request.softwareName}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{request.username}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                        {request.accessType}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleRequestAction(request.id, 'Approved')}
                                            className="text-green-600 hover:text-green-900 cursor-pointer"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleRequestAction(request.id, 'Rejected')}
                                            className="text-red-600 hover:text-red-900 cursor-pointer"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Not Pending Requests</h2>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Software Requested
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User Requested
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Access Level Requested
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {notPendingRequests.map((request) => (
                            <tr key={request.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{request.softwareName}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900">{request.username}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                        {request.accessType}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        request.status === 'Approved' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {request.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerDashboard;