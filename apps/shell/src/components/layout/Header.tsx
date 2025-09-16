import { Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import img from "../../assets/img/logo-teddy.png";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const userName = useAppSelector((state) => state.auth.userName);

  const navLinkClass =
    "px-3 py-2 rounded-md text-gray-500 hover:text-primary hover:underline bg-transparent";
  const activeNavLinkClass =
    "px-3 py-2 rounded-md text-primary bg-transparent underline";

  return (
    <header className="bg-white shadow-sm border-b p-4 flex items-center justify-between space-x-4">
      <Button
        onClick={onMenuClick}
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        className="text-gray-600 shrink-0"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex-1 relative flex items-center">
        <img src={img} alt="Teddy Finance Logo" className="h-8" />

        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavLink
            to="/clientes"
            end={true}
            className={({ isActive }) =>
              isActive ? activeNavLinkClass : navLinkClass
            }
          >
            Clientes
          </NavLink>
          <NavLink
            to="/clientes/clientes-selecionados"
            end={true}
            className={({ isActive }) =>
              isActive ? activeNavLinkClass : navLinkClass
            }
          >
            Clientes selecionados
          </NavLink>
          <NavLink to="/" className={navLinkClass}>
            Sair
          </NavLink>
        </nav>
      </div>

      <div className="shrink-0">
        <span className="text-gray-600">
          Olá, <strong>{userName ?? "Usuário"}</strong>
        </span>
      </div>
    </header>
  );
}
