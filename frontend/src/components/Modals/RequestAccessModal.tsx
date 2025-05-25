import { useState } from 'react';

type RequestAccessModalProps = {
    isOpen: boolean;
    onClose: () => void;
    softwareName: string;
    onSubmit: (accessType: string, reason: string) => void;
}

const RequestAccessModal = ({ isOpen, onClose, softwareName, onSubmit }: RequestAccessModalProps) => {
    const [accessType, setAccessType] = useState('Read');
    const [reason, setReason] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(accessType, reason);
        setAccessType('Read');
        setReason('');
        onClose();
    };
    
    const handleClose = () => {
        setAccessType('Read');
        setReason('');
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-[#232227d4] bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Request Access - {softwareName}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Access Type</label>
                        <select
                            value={accessType}
                            onChange={(e) => {
                                setAccessType(e.target.value);
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 cursor-pointer"
                            required
                        >
                            <option value="Read">Read</option>
                            <option value="Write">Write</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reason</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            rows={4}
                            required
                            placeholder="Please provide a reason for requesting access"
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestAccessModal; 