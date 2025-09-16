import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Trash2, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks.ts";
import { RootState } from "@/app/store.ts";
import { deleteClient } from "@/features/clients/clientsSlice.ts";
import { useState } from "react";

interface DeleteClientDialogProps {
  clientId: number;
  clientName: string;
}

export function DeleteClientDialog({
  clientId,
  clientName,
}: DeleteClientDialogProps) {
  const dispatch = useAppDispatch();
  const { deleteStatus } = useAppSelector((state: RootState) => state.clientes);
  const isLoading = deleteStatus === "loading";

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteClient(clientId)).unwrap();
    } catch (error) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive/80 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>Excluir cliente:</DialogTitle>
          <DialogDescription>
            Você está prestes a excluir o cliente: <strong>{clientName}</strong>
            .
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex w-full bg-primary"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              "Excluir cliente"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
