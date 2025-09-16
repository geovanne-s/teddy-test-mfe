export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateClientPayload {
  id: number;
  data: {
    name: string;
    salary: number;
    companyValuation: number;
  };
}

export interface NewClientPayload {
  name: string;
  salary: number;
  companyValuation: number;
}

export interface ClientsApiResponse {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}

export interface ClientesState {
  clients: Client[];
  selectedClientIds: number[];
  currentPage: number;
  limit: number;
  totalPages: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  createStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface FetchClientsParams {
  page: number;
  limit: number;
}

export const initialState: ClientesState = {
  clients: [],
  selectedClientIds: [],
  currentPage: 1,
  limit: 16,
  totalPages: 1,
  status: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null,
};
