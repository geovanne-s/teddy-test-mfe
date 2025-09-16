import { useEffect } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import {
  resetCreateStatus,
  resetUpdateStatus,
  resetDeleteStatus,
} from "../clientsSlice";

export default function ReduxToastHandler() {
  const dispatch = useAppDispatch();
  const { createStatus, updateStatus, deleteStatus, error } = useAppSelector(
    (state) => state.clientes
  );

  useEffect(() => {
    if (createStatus === "succeeded") {
      toast.success("Cliente criado com sucesso!");
      dispatch(resetCreateStatus());
    }
    if (createStatus === "failed") {
      toast.error("Erro ao criar cliente.", { description: error });
      dispatch(resetCreateStatus());
    }
  }, [createStatus, error, dispatch]);

  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success("Cliente atualizado com sucesso!");
      dispatch(resetUpdateStatus());
    }
    if (updateStatus === "failed") {
      toast.error("Erro ao atualizar cliente.", { description: error });
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus, error, dispatch]);

  useEffect(() => {
    if (deleteStatus === "succeeded") {
      toast.success("Cliente excluído com sucesso!");
      dispatch(resetDeleteStatus());
    }
    if (deleteStatus === "failed") {
      toast.error("Erro ao excluir cliente.", { description: error });
      dispatch(resetDeleteStatus());
    }
  }, [deleteStatus, error, dispatch]);

  return null;
}
