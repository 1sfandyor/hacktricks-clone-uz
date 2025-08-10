import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">
          <span className="text-lg">HackTricks</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Hacktricks Training</a>
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">Sponsor</a>
          <Link to="/admin" className="px-3 py-1.5 rounded-md border bg-secondary/40 hover:bg-secondary transition-colors shadow-[var(--shadow-glow)]">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
