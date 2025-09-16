import { Button } from "@/components/ui/button";
import { clearSelectedClients } from "@/features/clients/clientsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { SelectedClientCard } from "@/features/clients/components/Card/SelectedClientCard";

export default function SelectedClientsPage() {
  const dispatch = useAppDispatch();

  const { clients, selectedClientIds } = useAppSelector(
    (state) => state.clientes
  );

  const selectedClients = clients.filter((client) =>
    selectedClientIds.includes(client.id)
  );

  const handleClearAll = () => {
    dispatch(clearSelectedClients());
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Clientes selecionados:</h1>

      {selectedClients.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedClients.map((client) => (
              <SelectedClientCard key={client.id} client={client} />
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive hover:bg-destructive/5 hover:text-destructive"
            onClick={handleClearAll}
          >
            Limpar clientes selecionados
          </Button>
        </>
      ) : (
        <p className="text-center py-10 text-gray-500">
          Nenhum cliente selecionado. Volte para a página de Clientes para
          adicionar.
        </p>
      )}
    </div>
  );
}
