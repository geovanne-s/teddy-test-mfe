import { useState, FormEvent, useEffect, ChangeEvent } from "react";
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
import { Loader2, Pencil } from "lucide-react";
import { formatCurrencyBRL } from "@/lib/utils";
import { updateClient } from "../../clientsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks.ts";
import { RootState } from "@/app/store.ts";
import { Client } from "@/types/index.ts";

interface EditClientDialogProps {
  client: Client;
}

export function EditClientDialog({ client }: EditClientDialogProps) {
  const dispatch = useAppDispatch();
  const { updateStatus } = useAppSelector((state: RootState) => state.clientes);
  const isLoading = updateStatus === "loading";
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [companyValuation, setCompanyValuation] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setName(client.name);
      setSalary(client.salary.toString());
      setCompanyValuation(client.companyValuation.toString());
    }
  }, [open, client]);

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(
        updateClient({
          id: client.id,
          data: {
            name,
            salary: parseFloat(salary),
            companyValuation: parseFloat(companyValuation),
          },
        })
      ).unwrap();

      setOpen(false);
    } catch (error) {
      alert("Falha ao atualizar o cliente.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-black/80 hover:text-black"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Cliente: {client.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
            <Input
              id="salary"
              value={formatCurrencyBRL(Number(salary))}
              onChange={(e) => handleCurrencyChange(e, setSalary)}
              disabled={isLoading}
            />
            <Input
              id="companyValuation"
              value={formatCurrencyBRL(Number(companyValuation))}
              onChange={(e) => handleCurrencyChange(e, setCompanyValuation)}
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
