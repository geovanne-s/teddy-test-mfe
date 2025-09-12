import { NavLink } from "react-router-dom";
import type { ReactNode, ElementType } from "react";
import {
  ArrowLeft,
  HomeIcon,
  UserIcon,
  VerifiedUserIcon,
} from "@/assets/icons";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import img from "@/assets/img/logo-teddy.png";

type NavItemProps = {
  to: string;
  icon: ElementType;
  children: ReactNode;
  onClick: () => void;
};

const NavItem = ({ to, icon: Icon, children, onClick }: NavItemProps) => {
  return (
    <li>
      <NavLink to={to} onClick={onClick}>
        {({ isActive }) => (
          <div
            className={`group relative flex items-center py-3 px-0 rounded-md transition-colors w-full hover:text-primary ${
              isActive ? "text-primary pl-3" : "text-gray-900"
            }`}
          >
            {isActive && (
              <div className="absolute right-0 top-2 bottom-2 w-1 bg-primary rounded-full" />
            )}
            <Icon
              className={`h-6 w-6 mr-4 group-hover:text-primary ${
                isActive ? "text-primary" : "text-gray-900"
              }`}
              fill="currentColor"
            />
            <span className={`font-bold  ${isActive ? "text-sm" : "text-lg"}`}>
              {children}
            </span>
          </div>
        )}
      </NavLink>
    </li>
  );
};

interface NavigationSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function NavigationSheet({
  isOpen,
  onOpenChange,
}: NavigationSheetProps) {
  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 w-72 border-none flex flex-col rounded-tr-xl"
      >
        <SheetTitle className="sr-only">Menu Principal</SheetTitle>
        <SheetDescription className="sr-only">
          Navegue pelas seções principais da aplicação, como home e clientes.
        </SheetDescription>
        <div className="relative h-24 flex items-center justify-center shrink-0 bg-gray-800 rounded-tr-xl">
          <img src={img} alt="Teddy Finance Logo" className="h-12" />

          <SheetClose asChild>
            <ArrowLeft className="absolute top-full h-20 w-20 right-0 -translate-y-1/2 translate-x-1/2 cursor-pointer" />
          </SheetClose>
        </div>

        <nav className="flex-1 bg-white pt-10 p-0 ml-3">
          <ul className="space-y-2">
            <NavItem to="/" icon={HomeIcon} onClick={handleLinkClick}>
              Home
            </NavItem>
            <NavItem to="/clientes" icon={UserIcon} onClick={handleLinkClick}>
              Clientes
            </NavItem>
            <NavItem
              to="/clientes-selecionados"
              icon={VerifiedUserIcon}
              onClick={handleLinkClick}
            >
              Clientes selecionados
            </NavItem>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
