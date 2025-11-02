import { UserButton } from "@clerk/clerk-react"
import { BookOpen, Brain, LayoutDashboard } from "lucide-react"
import { NavLink, Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="bg-primary text-primary-foreground rounded-xl p-2 group-hover:scale-105 transition-transform">
            <Brain className="size-6" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight">TalentSync</span>
            <span className="text-xs text-muted-foreground">Code Together</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          {[
            { to: "/problems", label: "Problems", icon: <BookOpen className="size-4" /> },
            { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="size-4" /> },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => 
                `flex items-center gap-2 px-4 py-2 rounded-lg font-medium relative
                ${
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <div className="ml-4 pl-4 border-l border-border">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar