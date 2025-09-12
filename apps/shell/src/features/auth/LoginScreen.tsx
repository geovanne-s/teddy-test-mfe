import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { login } from "./authSlice";
import { Input } from "../../components/ui/input.tsx";
import { Button } from "../../components/ui/button.tsx";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (name.trim()) {
      dispatch(login(name.trim()));
      navigate("/clientes");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-background">
      <div className="p-8 w-full max-w-sm">
        <h1 className="text-2xl font-normal text-center mb-6">
          Olá, seja bem-vindo(a)!
        </h1>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <Button onClick={handleLogin} className="w-full">
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
}
