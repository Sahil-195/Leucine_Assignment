import { useState, useEffect } from 'react';
import { getCookieItem } from '../../Utils/cookiesHelper';
import type { AddSoftwareResponse } from '../../api/types/softwareService.types';
import { addSoftware, getSoftwares } from '../../api/services/softwareService';
import AddSoftwareModal from '../../components/Modals/AddSoftwareModal';
import { Plus } from 'lucide-react';

const AdminDashboard = () => {
    const username = getCookieItem('username');
    const [allSoftwares, setAllSoftwares] = useState<AddSoftwareResponse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getAllSoftwares = async () => {
            const softwares = await getSoftwares();
            setAllSoftwares(softwares);
        }
        getAllSoftwares();
    }, [getSoftwares]);

    const handleAddSoftware = async (name: string, description: string, accessLevels: string[]) => {
        await addSoftware(name, description, accessLevels);
        setIsModalOpen(false);
        const softwares = await getSoftwares();
        setAllSoftwares(softwares);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-2 text-gray-600">
                    Welcome back, {username}. Manage your software inventory.
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                    <div 
                        className="bg-blue-100 p-3 rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className='text-blue-600'/>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Add New Software</h3>
                        <p className="text-gray-600">Click to add a new software to the system</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-visible">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                SOFTWARE Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Access Levels
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {allSoftwares?.softwares?.map((software) => (
                            <tr key={software.id}>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{software.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-500">{software.description}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {software.accessLevels?.map((level) => (
                                            <span
                                                key={level}
                                                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                                            >
                                                {level}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AddSoftwareModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddSoftware}
            />
        </div>
    );
};

export default AdminDashboard;