import { Code, Play, Video } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { SignInButton } from "@clerk/clerk-react"
import { toast } from "sonner"

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/5" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                🚀 Interview Platform
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Revolutionize Your
                <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent block">
                  Tech Hiring
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Conduct seamless coding interviews with real-time collaboration,
                AI-powered assessments, and crystal-clear video calls.
                Find the perfect talent faster than ever.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <SignInButton mode="modal">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8">
                  <Play className="mr-2 size-4" />
                  Start Coding
                </Button>
              </SignInButton>
              <Button size="lg" variant="outline" className="h-12 px-8 border-primary text-primary hover:bg-primary/10" onClick={() => {
                toast.error("Demo is not available right now!!", {
                  className: "bg-destructive! text-white!",
                  action: {
                    label: "X",
                    onClick: ()=>{}
                    
                  }
                })
              }}>
                <Code className="mr-2 size-4" />
                Live Demo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">0+</div>
                <div className="text-sm text-muted-foreground">Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl border border-border/50 bg-card p-8 shadow-2xl">
              <div className="aspect-video rounded-lg bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Live Interview Session</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time coding + video collaboration
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-green-500 hover:bg-green-600">
                  <div className="h-2 w-2 rounded-full bg-white mr-2 animate-pulse" />
                  Live
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
