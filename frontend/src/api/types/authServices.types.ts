export type LoginRequest = {
    username: string;
    password: string;
};


export type LoginResponse = {
    token: string;
    user: {
        username: string;
        roleName: string;
    };
}

export type SignupRequest = {
    username: string;
    email: string,
    password: string;
    role: string;
};

export type SignupResponse = {
    token: string;
    user: {
        username: string;
        roleName: string;
    };
};

