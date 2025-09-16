import { AppDispatch, RootState } from "@/app/store.ts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrencyBRL } from "@/lib/utils.ts";
import { Check, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectClient } from "../../clientsSlice.ts";
import { DeleteClientDialog } from "../Dialog/DeleteClientDialog";
import { EditClientDialog } from "../Dialog/EditClientDialog";
import { Client } from "@/types/index.ts";

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedClientIds = useSelector(
    (state: RootState) => state.clientes.selectedClientIds
  );
  const isSelected = selectedClientIds.includes(client.id);

  const handleSelect = () => {
    dispatch(selectClient(client.id));
  };

  return (
    <Card className="rounded-xs shadow-none flex flex-col max-h-36 bg-white">
      <CardHeader className="flex items-center justify-center h-4">
        <CardTitle className="text-sm font-bold text-gray-800">
          {client.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-600 space-y-1 flex flex-col flex-grow items-center p-0">
        <p>Salário: {formatCurrencyBRL(client.salary)}</p>
        <p>Empresa: {formatCurrencyBRL(client.companyValuation)}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center space-x-2 pt-4">
        <Button
          variant="ghost"
          size="icon"
          className={`hover:text-blue-500 ${
            isSelected ? "text-green-500" : "text-gray-500"
          }`}
          onClick={handleSelect}
          disabled={isSelected}
        >
          {isSelected ? (
            <Check className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>

        <EditClientDialog client={client} />
        <DeleteClientDialog clientId={client.id} clientName={client.name} />
      </CardFooter>
    </Card>
  );
}
