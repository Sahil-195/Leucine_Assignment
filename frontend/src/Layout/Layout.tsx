import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const Layout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto sm:p-8 bg-gray-100 px-0 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
