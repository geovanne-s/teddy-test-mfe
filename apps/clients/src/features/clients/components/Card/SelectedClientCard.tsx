import { deselectClient, type Client } from "@/features/clients/clientsSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { formatCurrencyBRL } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/hooks.ts";

export function SelectedClientCard({ client }: { client: Client }) {
  const dispatch = useAppDispatch();

  const handleDeselect = () => {
    dispatch(deselectClient(client.id));
  };

  return (
    <Card className="rounded-xs shadow-none flex flex-col bg-white">
      <CardHeader className="pt-4 pb-2">
        <CardTitle className="text-sm font-bold text-gray-800 justify-center items-center flex">
          {client.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-600 space-y-1 justify-center items-center flex flex-col py-0">
        <p>Salário: {formatCurrencyBRL(client.salary)}</p>
        <p>Empresa: {formatCurrencyBRL(client.companyValuation)}</p>
      </CardContent>
      <CardFooter className="pb-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive/80 hover:text-destructive h-6 w-6 ml-auto"
          onClick={handleDeselect}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
