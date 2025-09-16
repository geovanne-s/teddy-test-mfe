import ClientesPage from "@/pages/ClientsPage";
import SelectedClientsPage from "@/pages/SelectedClientsPage";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { store } from "./app/store";

import ReduxToastHandler from "@/features/clients/components/ReduxToastHandler";
import { Toaster } from "sonner";
import "./index.css";

const ClientesMfe = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<ClientesPage />} />
        <Route
          path="/clientes-selecionados"
          element={<SelectedClientsPage />}
        />
      </Routes>
      <Toaster richColors position="top-right" />
      <ReduxToastHandler />
    </Provider>
  );
};

export default ClientesMfe;
