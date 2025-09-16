import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { DeleteClientDialog } from "./DeleteClientDialog";
import clientesReducer from "@/features/clients/clientsSlice";
import { initialState, type ClientesState } from "@/types/index";

const makeStore = (overrideState?: Partial<ClientesState>) => {
  return configureStore({
    reducer: {
      clientes: clientesReducer,
    },
    preloadedState: {
      clientes: {
        ...initialState,
        ...overrideState,
      },
    },
  });
};

describe("DeleteClientDialog", () => {
  const mockClientId = 42;
  const mockClientName = "Cliente Teste";

  vi.mock("@/api/apiClient", () => ({
    default: {
      delete: vi.fn(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve({ data: {} }), 100);
          })
      ),
    },
  }));

  it("deve renderizar o gatilho e abrir o diálogo com a mensagem correta", async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <Provider store={store}>
        <DeleteClientDialog
          clientId={mockClientId}
          clientName={mockClientName}
        />
      </Provider>
    );

    await user.click(screen.getByRole("button"));
    expect(
      await screen.findByRole("heading", { name: /excluir cliente/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Você está prestes a excluir o cliente/i)
    ).toBeInTheDocument();
    expect(screen.getByText(mockClientName)).toBeInTheDocument();
  });

  it('deve mudar o estado para "loading" ao confirmar a exclusão', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <Provider store={store}>
        <DeleteClientDialog
          clientId={mockClientId}
          clientName={mockClientName}
        />
      </Provider>
    );

    await user.click(screen.getByRole("button"));
    const confirmButton = await screen.findByRole("button", {
      name: /excluir cliente/i,
    });

    expect(store.getState().clientes.deleteStatus).toBe("idle");

    await user.click(confirmButton);

    expect(store.getState().clientes.deleteStatus).toBe("loading");
  });

  it("deve mostrar o estado de loading no botão de confirmação", async () => {
    const user = userEvent.setup();
    const loadingStore = makeStore({ deleteStatus: "loading" });

    render(
      <Provider store={loadingStore}>
        <DeleteClientDialog
          clientId={mockClientId}
          clientName={mockClientName}
        />
      </Provider>
    );

    await user.click(screen.getByRole("button"));
    const confirmButton = await screen.findByRole("button", {
      name: /excluindo.../i,
    });

    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton).toBeDisabled();
  });
});
