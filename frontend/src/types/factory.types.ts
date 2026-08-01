export interface Factory {
    id: number;
    name: string;
    location: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateFactoryDto {
    name: string;
    location: string;
}

export interface UpdateFactoryDto {
    name?: string;
    location?: string;
}