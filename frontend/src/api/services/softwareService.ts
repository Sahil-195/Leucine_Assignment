import axiosInstance from '../axiosInstance.ts';
import endpoints from '../endPoints.ts';
import type { AddSoftwareResponse, Software } from '../types/softwareService.types.ts';

export const getSoftwares = async () => {
    const response = await axiosInstance.get<AddSoftwareResponse>(
        endpoints.software.getSoftwares,
    );
    return response.data;
};

export const addSoftware = async (name: string, description: string, accessLevels: string[]) => {
    const response = await axiosInstance.post<Software>(
        endpoints.software.addSoftware,
        { name, description, accessLevels }
    );
    return response.data;
};

