import { Link, useNavigate } from 'react-router-dom';
import { getCookieItem, removeCookieItem } from '../../Utils/cookiesHelper';
import { useState } from 'react';
import { Menu, X, LogOut, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const role = getCookieItem('roleName');
    const navigate = useNavigate();

    const handleLogout = () => {
        removeCookieItem('token');
        removeCookieItem('roleName');
        removeCookieItem('username');
        toast.success("Logged Out Successfully");
        navigate('/');
    };

    const toggleHamburger = () => {
        setIsOpen(v => !v);
    }

    if (!isOpen) {
        return (
            <div 
                className="w-8 sm:w-12 h-screen bg-gray-100 px-4 pt-10 sm:pl-4 sm:pr-0 flex items-center flex-col cursor-pointer transition-all duration-300 ease-in-out"
                onClick={toggleHamburger}
            >
                <Menu />
            </div>
        );
    }

    return (
        <div className="h-screen w-full sm:w-48 md:w-64 bg-gray-800 text-white p-4 flex flex-col transition-all duration-300 ease-in-out">
            <div>
                <div className="text-xl font-bold mb-8 bg-red flex gap-2 justify-between items-center">
                    <div className='flex gap-2 justify-center items-center'>
                        <ShieldCheck className='text-blue-600'/>
                        <span> AccessFlow </span>
                    </div>
                    <div onClick={toggleHamburger} className='cursor-pointer'>
                        < X />
                    </div>
                </div>
                <nav className="space-y-2">
                    {role === 'Employee' && (
                        <>
                            <Link to="/request-access" className="block py-2 px-4 hover:bg-gray-700 rounded">
                                Dashboard
                            </Link>
                        </>
                    )}
                    {role === 'Manager' && (
                        <>
                            <Link to="/pending-requests" className="block py-2 px-4 hover:bg-gray-700 rounded">
                                Dashboard
                            </Link>
                        </>
                    )}
                    {role === 'Admin' && (
                        <>
                            <Link to="/create-software" className="block py-2 px-4 hover:bg-gray-700 rounded">
                                Dashboard
                            </Link>
                        </>
                    )}
                </nav>
            </div>
            <button
                onClick={handleLogout}
                className="mt-auto mb-4 py-2 px-4 bg-slate-600 hover:bg-slate-700 rounded w-full text-white"
            >
                <div className='flex gap-2 items-center justify-center'>
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </div>
            </button>
        </div>
    );
};

export default Sidebar; 