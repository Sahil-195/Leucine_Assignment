import axiosInstance from '../axiosInstance.ts';
import endpoints from '../endPoints.ts';
import type { SoftwareAccessRequest, SoftwareAccessResponse, softwareRequestsStatusResponse, StatusWiseRequestsResponse, updateStatusRequest, updateStatusResponse } from '../types/requestService.types.ts';

export const requestAccess = async ({ softwareId, accessType, reason }: SoftwareAccessRequest) => {
    const response = await axiosInstance.post<SoftwareAccessResponse>(
        endpoints.request.softwareAcess,
        { softwareId, accessType, reason }
    );
    return response.data;
};

export const getStatusWiseSoftwareRequests = async() => {
    const response = await axiosInstance.get<StatusWiseRequestsResponse>(
        endpoints.request.getStatusWiseRequests,
    );
    return response.data;
}

export const updateRequestStatus = async({id, status}: updateStatusRequest) => {
    const response = await axiosInstance.patch<updateStatusResponse>(
        endpoints.request.updateRequestStatus(id),
        {status}
    );
    return response.data;
}

export const userSoftwareRequestsStatus = async() => {
    const response = await axiosInstance.get<softwareRequestsStatusResponse>(
        endpoints.request.softwareRequestStatus
    );
    return response.data;
}


