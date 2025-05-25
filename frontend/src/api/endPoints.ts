const apiPrefixName = import.meta.env.VITE_REACT_APP_API_PREFIX;

const endpoints = {
    auth: {
        signup: apiPrefixName + '/auth/signup',
        login: apiPrefixName + '/auth/login',
        logout: apiPrefixName + '/auth/logout',
    },
    software: {
        getSoftwares: apiPrefixName + '/software/',
        addSoftware: apiPrefixName + '/software/'
    },
    request: {
        softwareAcess: apiPrefixName + '/requests',
        getStatusWiseRequests: apiPrefixName + '/requests',
        updateRequestStatus: (id: Number) => apiPrefixName + `/requests/${id}`,
        softwareRequestStatus: apiPrefixName + '/requests/status'
    }
};

export default endpoints;
