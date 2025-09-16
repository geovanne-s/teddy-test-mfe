import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/api/apiClient";
import {
  Client,
  ClientsApiResponse,
  FetchClientsParams,
  initialState,
  NewClientPayload,
  UpdateClientPayload,
} from "@/types/index.ts";

export const fetchClients = createAsyncThunk<
  ClientsApiResponse,
  FetchClientsParams
>("clientes/fetchClients", async ({ page, limit }) => {
  const response = await apiClient.get<ClientsApiResponse>("/users", {
    params: { page, limit },
  });
  return response.data;
});

export const createClient = createAsyncThunk<Client, NewClientPayload>(
  "clientes/createClient",
  async (newClient: NewClientPayload) => {
    const response = await apiClient.post<Client>("/users", newClient);
    return response.data;
  }
);

export const updateClient = createAsyncThunk<Client, UpdateClientPayload>(
  "clientes/updateClient",
  async ({ id, data }) => {
    const response = await apiClient.patch<Client>(`/users/${id}`, data);
    return response.data;
  }
);

export const deleteClient = createAsyncThunk<number, number>(
  "clientes/deleteClient",
  async (id: number) => {
    await apiClient.delete(`/users/${id}`);
    return id;
  }
);

const clientesSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.currentPage = 1;
    },

    selectClient: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (!state.selectedClientIds.includes(id)) {
        state.selectedClientIds.push(id);
      }
    },
    deselectClient: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      state.selectedClientIds = state.selectedClientIds.filter(
        (id) => id !== idToRemove
      );
    },
    clearSelectedClients: (state) => {
      state.selectedClientIds = [];
    },
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchClients.fulfilled,
        (state, action: PayloadAction<ClientsApiResponse>) => {
          state.status = "succeeded";
          state.clients = action.payload.clients;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        }
      )
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Falha ao buscar clientes";
      })

      .addCase(createClient.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createClient.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createClient.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.error.message || "Falha ao criar cliente";
      })
      .addCase(updateClient.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(
        updateClient.fulfilled,
        (state, action: PayloadAction<Client>) => {
          state.updateStatus = "succeeded";
          const updatedClient = action.payload;
          const index = state.clients.findIndex(
            (client) => client.id === updatedClient.id
          );
          if (index !== -1) {
            state.clients[index] = updatedClient;
          }
        }
      )
      .addCase(updateClient.rejected, (state) => {
        state.updateStatus = "failed";
      })
      .addCase(deleteClient.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(
        deleteClient.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.deleteStatus = "succeeded";
          const deletedClientId = action.payload;
          state.clients = state.clients.filter(
            (client) => client.id !== deletedClientId
          );
        }
      )
      .addCase(deleteClient.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.error.message || "Falha ao excluir cliente";
      });
  },
});

export const {
  setPage,
  setLimit,
  selectClient,
  deselectClient,
  clearSelectedClients,
  resetCreateStatus,
  resetUpdateStatus,
  resetDeleteStatus,
} = clientesSlice.actions;

export default clientesSlice.reducer;
