import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { SelectedClientCard } from "./SelectedClientCard";
import { deselectClient } from "@/features/clients/clientsSlice";
import * as hooks from "@/hooks/hooks";
import { Client } from "@/types/index.ts";

const mockReducer = (state = {}, action: any) => {
  if (action.type === "clientes/deselectClient") {
    return { ...state, lastAction: action };
  }
  return state;
};

const mockStore = configureStore({
  reducer: {
    clientes: mockReducer,
  },
});

const mockDispatch = vi.fn();
vi.spyOn(hooks, "useAppDispatch").mockReturnValue(mockDispatch);

describe("SelectedClientCard", () => {
  const mockClient: Client = {
    id: 101,
    name: "Carlos Andrade",
    salary: 7500,
    companyValuation: 2000000,
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("deve renderizar as informações do cliente corretamente", () => {
    render(
      <Provider store={mockStore}>
        <SelectedClientCard client={mockClient} />
      </Provider>
    );

    expect(screen.getByText("Carlos Andrade")).toBeInTheDocument();

    expect(screen.getByText(/Salário: R\$\s7\.500,00/)).toBeInTheDocument();
    expect(
      screen.getByText(/Empresa: R\$\s2\.000\.000,00/)
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("deve disparar a ação deselectClient com o ID correto ao clicar no botão de remover", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={mockStore}>
        <SelectedClientCard client={mockClient} />
      </Provider>
    );

    const removeButton = screen.getByRole("button");

    await user.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    expect(mockDispatch).toHaveBeenCalledWith(deselectClient(mockClient.id));
  });
});
