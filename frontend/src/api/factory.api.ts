import { api } from "./axios";
import type {
    CreateFactoryDto,
    UpdateFactoryDto,
} from "@/types/factory.types";

export const getFactories = () =>
    api.get("/factories");

export const getFactory = (id: number) =>
    api.get(`/factories/${id}`);

export const createFactory = (data: CreateFactoryDto) =>
    api.post("/factories", data);

export const updateFactory = (
    id: number,
    data: UpdateFactoryDto
) =>
    api.patch(`/factories/${id}`, data);

export const deleteFactory = (id: number) =>
    api.delete(`/factories/${id}`);