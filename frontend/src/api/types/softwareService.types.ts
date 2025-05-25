export type AddSoftwareRequest = {
    name: string;
    description: string;
    accessLevels: string[];
}

export type Software = {
    id: number;
    name: string;
    description: string;
    accessLevels: string[];
}

export type AddSoftwareResponse = {
    message: string,
    softwares: Software[]
};