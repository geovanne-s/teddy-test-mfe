import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateClientDialog, NewClientData } from "./CreateClientDialog";

describe("CreateClientDialog", () => {
  it("deve renderizar o botão de gatilho e abrir o diálogo ao ser clicado", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    render(<CreateClientDialog onSubmit={mockOnSubmit} isLoading={false} />);

    const triggerButton = screen.getByRole("button", {
      name: /criar cliente/i,
    });
    expect(triggerButton).toBeInTheDocument();

    await user.click(triggerButton);

    expect(
      screen.getByRole("heading", { name: /criar novo cliente/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite o nome/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/digite o salário/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/digite o valor da empresa/i)
    ).toBeInTheDocument();
  });

  it("deve chamar onSubmit com os dados corretos quando o formulário for preenchido e enviado", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn((_data: NewClientData) => Promise.resolve());

    render(<CreateClientDialog onSubmit={mockOnSubmit} isLoading={false} />);

    await user.click(screen.getByRole("button", { name: /criar cliente/i }));

    await user.type(
      screen.getByPlaceholderText(/digite o nome/i),
      "Novo Cliente Teste"
    );
    await user.type(screen.getByPlaceholderText(/digite o salário/i), "500000");
    await user.type(
      screen.getByPlaceholderText(/digite o valor da empresa/i),
      "10000000"
    );

    const submitButton = screen.getByRole("button", { name: "Criar cliente" });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "Novo Cliente Teste",
      salary: 5000.0,
      companyValuation: 100000.0,
    });
  });

  it("deve mostrar o estado de loading no botão de submit", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    render(<CreateClientDialog onSubmit={mockOnSubmit} isLoading={true} />);

    await user.click(screen.getByRole("button", { name: /criar cliente/i }));

    const submitButton = screen.getByRole("button", { name: /criando/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("deve limpar os campos quando o diálogo for fechado", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    render(<CreateClientDialog onSubmit={mockOnSubmit} isLoading={false} />);

    const triggerButton = screen.getByRole("button", {
      name: /criar cliente/i,
    });
    await user.click(triggerButton);

    const nameInput = screen.getByPlaceholderText(/digite o nome/i);
    await user.type(nameInput, "Cliente Temporário");
    expect(nameInput).toHaveValue("Cliente Temporário");

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    await user.click(triggerButton);

    const nameInputAfterReopen = screen.getByPlaceholderText(/digite o nome/i);
    expect(nameInputAfterReopen).toHaveValue("");
  });
});
