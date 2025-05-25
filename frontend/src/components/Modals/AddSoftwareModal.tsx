import { useState } from 'react';
import { X } from 'lucide-react';

type AddSoftwareModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, description: string, accessLevels: string[]) => void;
}

const AddSoftwareModal = ({ isOpen, onClose, onSubmit }: AddSoftwareModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedAccessLevels, setSelectedAccessLevels] = useState<string[]>([]);
    const [error, setError] = useState('');

    const accessLevels = ['Read', 'Write', 'Admin'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedAccessLevels.length === 0) {
            setError('Please select at least one access level');
            return;
        }
        setError('');
        onSubmit(name, description, selectedAccessLevels);
        setName('');
        setDescription('');
        setSelectedAccessLevels([]);
    };

    const toggleAccessLevel = (level: string) => {
        setSelectedAccessLevels(prev =>
            prev.includes(level)
                ? prev.filter(l => l !== level)
                : [...prev, level]
        );
        setError(''); 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#232227d4] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Add New Software</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <X />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Software Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Access Levels
                        </label>
                        <div className="space-y-2">
                            {accessLevels.map((level) => (
                                <label key={level} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedAccessLevels.includes(level)}
                                        onChange={() => toggleAccessLevel(level)}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700">{level}</span>
                                </label>
                            ))}
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        >
                            Add Software
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSoftwareModal; 