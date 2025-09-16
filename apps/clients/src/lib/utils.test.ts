import { describe, it, expect } from "vitest";
import { formatCurrencyBRL } from "./utils";

describe("formatCurrencyBRL", () => {
  it("deve conter o símbolo da moeda e o valor formatado corretamente", () => {
    const resultado = formatCurrencyBRL(1234.56);

    expect(resultado).toContain("R$");

    expect(resultado).toContain("1.234,56");
  });

  it("deve lidar com o valor zero corretamente", () => {
    const resultado = formatCurrencyBRL(0);

    expect(resultado).toContain("R$");
    expect(resultado).toContain("0,00");
  });

  it("deve lidar com input inválido de forma graciosa", () => {
    const resultado = formatCurrencyBRL(NaN);

    expect(resultado).toContain("R$");
    expect(resultado).toContain("0,00");
  });
});
