export interface CreateFactoryDto {
    name: string;
    location: string;
}

export interface UpdateFactoryDto {
    name?: string;
    location?: string;
}