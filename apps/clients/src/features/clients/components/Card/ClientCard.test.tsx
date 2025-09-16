import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ClientCard } from "./ClientCard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore({
  reducer: {
    clientes: (state = { selectedClientIds: [] }) => state,
  },
});

describe("ClientCard", () => {
  it("deve renderizar as informações do cliente corretamente", () => {
    const mockClient = {
      id: 1,
      name: "Maria Silva",
      salary: 5000,
      companyValuation: 100000,
    };

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ClientCard client={mockClient} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Maria Silva")).toBeInTheDocument();
    expect(screen.getByText("Salário: R$ 5.000,00")).toBeInTheDocument();
    expect(screen.getByText("Empresa: R$ 100.000,00")).toBeInTheDocument();
  });
});
