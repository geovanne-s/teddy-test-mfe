import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store.ts";
import { setLimit } from "../clientsSlice.ts";

export function PageHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, limit, status } = useSelector(
    (state: RootState) => state.clientes
  );

  const handleLimitChange = (value: string) => {
    const newLimit = Number(value);
    dispatch(setLimit(newLimit));
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 pb-4">
      <h2 className="text-lg font-medium text-gray-700">
        {status === "succeeded"
          ? `${clients.length} clientes encontrados:`
          : "Clientes"}
      </h2>
      <div className="flex items-center space-x-2 text-sm">
        <label htmlFor="clients-per-page" className="text-gray-600">
          Clientes por página:
        </label>
        <Select value={String(limit)} onValueChange={handleLimitChange}>
          <SelectTrigger id="clients-per-page" className="w-[70px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="32">32</SelectItem>
            <SelectItem value="64">64</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
