import Navbar from "@/components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PROBLEMS } from "@/data/problems"
import { Link } from "react-router-dom"
import { Code, ChevronRight, Clock, BarChart3, Star } from "lucide-react"

function ProblemPage() {
  const problems = Object.values(PROBLEMS)
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-600 border-green-500/30"
      case "Medium": return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "Hard": return "bg-red-500/20 text-red-600 border-red-500/30"
      default: return "bg-gray-500/20 text-gray-600 border-gray-500/30"
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return <Star className="w-3 h-3 text-green-600" />
      case "Medium": return <BarChart3 className="w-3 h-3 text-yellow-600" />
      case "Hard": return <Clock className="w-3 h-3 text-red-600" />
      default: return <Star className="w-3 h-3 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Code className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
            Practice Problems
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Master your coding skills with carefully curated problems. 
            <span className="block text-lg mt-2">Start your journey to becoming a better developer.</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{problems.length}</div>
              <div className="text-sm text-muted-foreground">Total Problems</div>
            </CardContent>
          </Card>
          <Card className="bg-green-500/5 border-green-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {problems.filter(p => p.difficulty === "Easy").length}
              </div>
              <div className="text-sm text-green-600/80">Easy Problems</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {problems.filter(p => p.difficulty === "Medium").length}
              </div>
              <div className="text-sm text-yellow-600/80">Medium Problems</div>
            </CardContent>
          </Card>
          <Card className="bg-red-500/5 border-red-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {problems.filter(p => p.difficulty === "Hard").length}
              </div>
              <div className="text-sm text-red-600/80">Hard Problems</div>
            </CardContent>
          </Card>
        </div>

        {/* Problems Grid */}
        <div className="grid gap-6">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block group"
            >
              <Card className="
                p-0 
                transition-all 
                duration-300 
                cursor-pointer 
                border-2 
                border-border/50 
                hover:border-primary/30 
                hover:shadow-2xl 
                hover:scale-[1.02]
                bg-linear-to-r from-background to-background/80
                group-hover:from-background/90 group-hover:to-background/70
                overflow-hidden
              ">
                <CardHeader className="p-6 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {problem.title}
                        </CardTitle>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transform group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <CardDescription className="text-foreground/70 text-base leading-relaxed line-clamp-2">
                        {problem.description.text}
                      </CardDescription>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <div className="size-2 bg-blue-500 rounded-full"></div>
                          <span>{problem.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-3">
                      <Badge 
                        className={`
                          px-3 py-1.5 border-2 font-medium text-sm
                          flex items-center gap-2
                          ${getDifficultyColor(problem.difficulty)}
                        `}
                      >
                        {getDifficultyIcon(problem.difficulty)}
                        {problem.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                {/* Progress Bar Effect */}
                <div className="w-0 h-1 bg-linear-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-500" />
              </Card>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-muted/30 rounded-3xl border border-border/50">
            <Code className="w-12 h-12 text-primary/60" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Ready to Challenge Yourself?
              </h3>
              <p className="text-muted-foreground max-w-md">
                Pick a problem and start coding. Practice makes perfect!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemPage