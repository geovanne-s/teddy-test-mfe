import { render } from "@testing-library/react";
import { toast } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  resetCreateStatus,
  resetDeleteStatus,
  resetUpdateStatus,
} from "../clientsSlice";
import ReduxToastHandler from "./ReduxToastHandler";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockDispatch = vi.fn();
let mockState = {};

vi.mock("@/hooks/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: any) => selector(mockState),
}));

describe("ReduxToastHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("não deve renderizar nada", () => {
    mockState = {
      clientes: {
        createStatus: "idle",
        updateStatus: "idle",
        deleteStatus: "idle",
      },
    };
    const { container } = render(<ReduxToastHandler />);
    expect(container).toBeEmptyDOMElement();
  });

  describe("Criação de cliente", () => {
    it("deve mostrar um toast de sucesso e disparar a ação de resetar o estado de criação quando o status é 'succeeded'", () => {
      mockState = { clientes: { createStatus: "succeeded", error: null } };
      render(<ReduxToastHandler />);

      expect(toast.success).toHaveBeenCalledWith("Cliente criado com sucesso!");
      expect(mockDispatch).toHaveBeenCalledWith(resetCreateStatus());
    });

    it("deve mostrar um toast de erro e disparar a ação de resetar o estado de criação quando o status é 'failed'", () => {
      const errorMessage = "Erro de teste";
      mockState = { clientes: { createStatus: "failed", error: errorMessage } };
      render(<ReduxToastHandler />);

      expect(toast.error).toHaveBeenCalledWith("Erro ao criar cliente.", {
        description: errorMessage,
      });
      expect(mockDispatch).toHaveBeenCalledWith(resetCreateStatus());
    });
  });

  describe("Atualização de cliente", () => {
    it("deve mostrar um toast de sucesso e disparar a ação de resetar o estado de atualização quando o status é 'succeeded'", () => {
      mockState = { clientes: { updateStatus: "succeeded", error: null } };
      render(<ReduxToastHandler />);

      expect(toast.success).toHaveBeenCalledWith(
        "Cliente atualizado com sucesso!"
      );
      expect(mockDispatch).toHaveBeenCalledWith(resetUpdateStatus());
    });

    it("deve mostrar um toast de erro e disparar a ação de resetar o estado de atualização quando o status é 'failed'", () => {
      const errorMessage = "Erro de teste";
      mockState = { clientes: { updateStatus: "failed", error: errorMessage } };
      render(<ReduxToastHandler />);

      expect(toast.error).toHaveBeenCalledWith("Erro ao atualizar cliente.", {
        description: errorMessage,
      });
      expect(mockDispatch).toHaveBeenCalledWith(resetUpdateStatus());
    });
  });

  describe("Exclusão de cliente", () => {
    it("deve mostrar um toast de sucesso e disparar a ação de resetar o estado de exclusão quando o status é 'succeeded'", () => {
      mockState = { clientes: { deleteStatus: "succeeded", error: null } };
      render(<ReduxToastHandler />);

      expect(toast.success).toHaveBeenCalledWith(
        "Cliente excluído com sucesso!"
      );
      expect(mockDispatch).toHaveBeenCalledWith(resetDeleteStatus());
    });

    it("deve mostrar um toast de erro e disparar a ação de resetar o estado de exclusão quando o status é 'failed'", () => {
      const errorMessage = "Erro de teste";
      mockState = { clientes: { deleteStatus: "failed", error: errorMessage } };
      render(<ReduxToastHandler />);

      expect(toast.error).toHaveBeenCalledWith("Erro ao excluir cliente.", {
        description: errorMessage,
      });
      expect(mockDispatch).toHaveBeenCalledWith(resetDeleteStatus());
    });
  });
});
