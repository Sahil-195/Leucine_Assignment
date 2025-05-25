
export type SoftwareAccessRequest = {
    softwareId: string,
    accessType: string, 
    reason: string
}

export type SoftwareAccessResponse = {
    message: string,
}

export type SoftwareRequest = {
    id: number,
    username: string,
    softwareName: string,
    accessType: 'Read' | 'Write' | 'Admin',
    reason: string,
    status: 'Pending' | "Approved" | "Rejected"
}

export type StatusWiseRequestsResponse = {
    pending: SoftwareRequest[],
    notPending: SoftwareRequest[]
}

export type updateStatusRequest = {
    id: Number,
    status: 'Pending' | "Approved" | "Rejected"
}

export type updateStatusResponse = {
    message: string
}

export type softwareRequestsStatusResponse = {
    pending: Number,
    approved: Number,
    rejected: Number
};

