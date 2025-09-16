import { createClient, fetchClients } from "@/features/clients/clientsSlice";
import { ClientCard } from "@/features/clients/components/Card/ClientCard";
import {
  CreateClientDialog,
  NewClientData,
} from "@/features/clients/components/Dialog/CreateClientDialog";
import { PageHeader } from "@/features/clients/components/PageHeader.tsx";
import { ClientListPagination } from "@/features/clients/components/pagination.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function ClientesPage() {
  const dispatch = useAppDispatch();
  const { clients, status, error, limit, currentPage, createStatus } =
    useAppSelector((state) => state.clientes);

  const isLoadingCreate = createStatus === "loading";

  const handleCreateClient = async (data: NewClientData) => {
    try {
      await dispatch(createClient(data)).unwrap();

      dispatch(fetchClients({ page: currentPage, limit: limit }));
    } catch (err) {
      console.error("Falha ao criar o cliente: ", err);
    }
  };

  useEffect(() => {
    dispatch(fetchClients({ page: currentPage, limit: limit }));
  }, [currentPage, limit, dispatch]);

  let content;

  if (status === "loading") {
    content = (
      <div className="flex justify-center items-center py-20 h-[65dvh]">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  } else if (status === "succeeded") {
    content = (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-background">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = (
      <p className="text-center py-10 text-red-600">
        Erro ao carregar clientes: {error}
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="p-6 bg-background">
        <PageHeader />

        {content}

        <div className="pt-6 mt-6">
          <CreateClientDialog
            onSubmit={handleCreateClient}
            isLoading={isLoadingCreate}
          />
        </div>
      </div>
      <ClientListPagination />
    </div>
  );
}
