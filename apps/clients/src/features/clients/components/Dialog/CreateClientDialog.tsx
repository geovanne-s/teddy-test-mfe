import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatCurrencyBRL } from "@/lib/utils.ts";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

export interface NewClientData {
  name: string;
  salary: number;
  companyValuation: number;
}

interface CreateClientDialogProps {
  onSubmit: (data: NewClientData) => void;
  isLoading?: boolean;
}

export function CreateClientDialog({
  onSubmit,
  isLoading,
}: CreateClientDialogProps) {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [companyValuation, setCompanyValuation] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name || !salary || !companyValuation) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      await onSubmit({
        name,
        salary: parseFloat(salary),
        companyValuation: parseFloat(companyValuation),
      });

      setOpen(false);
    } catch (error) {
      console.error("Falha ao criar cliente:", error);
      alert("Não foi possível criar o cliente. Tente novamente.");
    }
  };

  const handleCurrencyChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const valueFromInput = event.target.value;
    const numericValue = valueFromInput.replace(/\D/g, "");

    if (!numericValue || Number(numericValue) === 0) {
      setter("");
      return;
    }

    const numberValue = Number(numericValue) / 100;
    setter(numberValue.toString());
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setName("");
      setSalary("");
      setCompanyValuation("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full text-primary border-primary hover:bg-primary/5 hover:text-primary"
        >
          Criar Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar novo cliente</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="name"
              placeholder="Digite o nome:"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
            <Input
              id="salary"
              placeholder="Digite o salário:"
              className="no-spinner"
              type="text"
              value={salary ? formatCurrencyBRL(Number(salary)) : ""}
              onChange={(e) => handleCurrencyChange(e, setSalary)}
              disabled={isLoading}
            />
            <Input
              id="companyValuation"
              placeholder="Digite o valor da empresa:"
              className="no-spinner"
              type="text"
              value={
                companyValuation
                  ? formatCurrencyBRL(Number(companyValuation))
                  : ""
              }
              onChange={(e) => handleCurrencyChange(e, setCompanyValuation)}
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/70"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar cliente"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
