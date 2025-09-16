import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { EditClientDialog } from "./EditClientDialog";
import clientesReducer from "@/features/clients/clientsSlice";
import { initialState, type Client } from "@/types/index.ts";
import { RootState } from "@/app/store.ts";

vi.mock("@/api/apiClient", () => ({
  default: {
    patch: vi.fn(() => Promise.resolve({ data: {} })),
  },
}));

vi.mock("@/lib/utils", () => ({
  formatCurrencyBRL: vi.fn((value) => `R$ ${Number(value).toFixed(2)}`),

  cn: vi.fn((...inputs) => inputs.join(" ")),
}));

const makeMockStore = () => {
  const dispatchedActions: any[] = [];
  const actionTrackingMiddleware: Middleware<{}, RootState> =
    (_store) => (next) => (action) => {
      dispatchedActions.push(action);
      return next(action);
    };

  const store = configureStore({
    reducer: {
      clientes: clientesReducer,
    },
    preloadedState: {
      clientes: { ...initialState },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(actionTrackingMiddleware),
  });

  return {
    ...store,
    getActions: () => dispatchedActions,
  };
};

const mockClient: Client = {
  id: 413,
  name: "Cliente de Teste",
  salary: 50000.5,
  companyValuation: 1000000.75,
};

describe("EditClientDialog", () => {
  it("deve preencher o formulário com os dados do cliente ao abrir", async () => {
    const user = userEvent.setup();
    const store = makeMockStore();

    render(
      <Provider store={store}>
        <EditClientDialog client={mockClient} />
      </Provider>
    );

    await user.click(screen.getByRole("button"));

    expect(screen.getByDisplayValue(mockClient.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/50000.50/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1000000.75/)).toBeInTheDocument();
  });

  it("deve despachar a ação de atualização com os dados corretos ao submeter", async () => {
    const user = userEvent.setup();
    const store = makeMockStore();

    render(
      <Provider store={store}>
        <EditClientDialog client={mockClient} />
      </Provider>
    );

    await user.click(screen.getByRole("button"));

    const nameInput = screen.getByDisplayValue(mockClient.name);
    const newName = "Novo Nome";
    await user.clear(nameInput);
    await user.type(nameInput, newName);

    await user.click(
      screen.getByRole("button", { name: /Salvar Alterações/i })
    );

    await waitFor(() => {
      const actions = store.getActions();
      const fulfilledAction = actions.find(
        (action) =>
          typeof action.type === "string" && action.type.endsWith("/fulfilled")
      );

      expect(fulfilledAction).toBeDefined();
      expect(fulfilledAction?.meta.arg).toEqual({
        id: mockClient.id,
        data: {
          name: newName,
          salary: mockClient.salary,
          companyValuation: mockClient.companyValuation,
        },
      });
    });
  });

  it("deve mostrar o estado de loading no botão ao submeter", async () => {
    vi.spyOn(
      (await import("@/api/apiClient")).default,
      "patch"
    ).mockImplementationOnce(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ data: {} }), 500))
    );

    const user = userEvent.setup();
    const store = makeMockStore();

    render(
      <Provider store={store}>
        <EditClientDialog client={mockClient} />
      </Provider>
    );

    await user.click(screen.getByRole("button"));

    const saveButton = screen.getByRole("button", {
      name: /salvar alterações/i,
    });
    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    await waitFor(() => {
      expect(saveButton).toBeDisabled();
    });
  });
});
