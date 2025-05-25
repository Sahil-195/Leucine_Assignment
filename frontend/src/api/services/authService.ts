import axiosInstance from '../axiosInstance.ts';
import endpoints from '../endPoints.ts';
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '../types/authServices.types.ts'

export const login = async ({username, password}: LoginRequest) => {
    const response = await axiosInstance.post<LoginResponse>(
        endpoints.auth.login,
        { username, password }
    );
    return response.data;
};

export const signup = async ({username, email, password, role}: SignupRequest) => {
    const response = await axiosInstance.post<SignupResponse>(
        endpoints.auth.signup,
        { username, email, password, role }
    );
    return response.data;
};

