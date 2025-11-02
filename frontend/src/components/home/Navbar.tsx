import { Brain, Zap } from "lucide-react"
import { SignInButton } from "@clerk/clerk-react"
import { Button } from "../ui/button"

function Navbar() {
  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur fixed w-screen z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <Brain className="size-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                TalentSync
              </span>
            </div>
            <SignInButton mode="modal">
                <Button>

              Get Started
              <Zap className="ml-2 size-4" />
                </Button>
            </SignInButton>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
