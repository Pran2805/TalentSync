import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Loader, Sparkles, Users, Clock, Trophy, Activity } from "lucide-react"
import Navbar from "@/components/Navbar"
import { PROBLEMS } from "@/data/problems"
import { sessionStore } from "@/store/session.store"
import { Card, CardContent } from "@/components/ui/card"
import { useUser } from "@clerk/clerk-react"
import Footer from "@/components/Footer"

function Dashboard() {
  const { user } = useUser()

  const { createSession, isLoading } = sessionStore()

  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>("")

  const problemList = Object.values(PROBLEMS)
  const selectedProblem = problemList.find((p) => p.id === selectedId)

  const handleCreateRoom = async () => {
    if (!selectedProblem) return
    const res = await createSession({
      problem: selectedProblem.title,
      difficulty: selectedProblem.difficulty,
    })
    if (res?.data?.callId) {
      // router.push(`/session/${res.data.callId}`)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0B0C] to-[#1a1a1d] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-12 pb-8 flex justify-center border-b border-neutral-800 bg-linear-to-r from-primary/10 to-purple-900/10">
        <div className="w-full max-w-6xl flex justify-between items-center px-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary text-sm font-medium">Ready to code</span>
            </div>
            <h1 className="text-4xl font-bold bg-linear-to-br from-primary/50 to-primary bg-clip-text text-transparent">
              Welcome back, { user?.firstName ? user?.firstName.split(" ")[0] : "USER"}!
            </h1>
            <p className="text-neutral-300 text-base mt-3">Continue your journey to master algorithms and data structures</p>
          </div>
          <Button
            className=" hover:shadow-primary/60 shadow-md transition-all duration-300"
            onClick={() => setOpen(true)}
          >
            <Sparkles className="size-4 mr-2" />
            Create Session
          </Button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <Card className="bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-primary">1</p>
                <p className="text-sm text-neutral-400 mt-1">Active Sessions</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Activity className="size-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="text-sm text-neutral-400 mt-1">Total Sessions</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Trophy className="size-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-primary">12</p>
                <p className="text-sm text-neutral-400 mt-1">Hours Coded</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Clock className="size-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-sm text-neutral-400 mt-1">Problems Solved</p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Users className="size-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Session */}
        <Card className="bg-linear-to-br from-neutral-900 to-neutral-800 border border-primary/20 col-span-1 md:col-span-4 mt-4">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">Live Sessions</h2>
                <span className="flex items-center gap-1 text-xs text-primary bg-primary/30 px-3 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  1 active
                </span>
              </div>
            </div>

            <div className="bg-neutral-800/50 rounded-2xl p-5 border border-primary/10 hover:border-primary/30 transition-all duration-300">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Users className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Two Sum</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-primary bg-primary/30 px-2 py-1 rounded">Easy</span>
                      <span className="text-xs text-neutral-400">• 25 min remaining</span>
                    </div>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary text-white font-medium px-6 rounded-xl transition-all duration-300 hover:scale-105">
                  Rejoin Session
                </Button>
              </div>
              <div className="mt-4 text-sm text-neutral-300 flex items-center gap-4">
                <span>Hosted by <span className="text-white font-medium">Pranav</span></span>
                <span>•</span>
                <span>1/2 participants</span>
                <span>•</span>
                <span className="text-primary font-medium">OPEN</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Past Sessions */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Past Sessions</h2>
          <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-600">
            View All
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {["Reverse String", "Valid Palindrome", "Maximum Subarray", "Container With Most Water", "Two Sum", "Add Two Numbers", "Longest Substring", "Median of Arrays"].map((title, idx) => (
            <Card
              key={idx}
              className="bg-neutral-900/80 border border-neutral-800 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-white group-hover:text-primary transition-colors">{title}</h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${idx % 3 === 0
                        ? "bg-primary/30 text-primary"
                        : idx % 3 === 1
                          ? "bg-yellow-900/30 text-yellow-400"
                          : "bg-red-900/30 text-red-400"
                      }`}
                  >
                    {idx % 3 === 0 ? "Easy" : idx % 3 === 1 ? "Medium" : "Hard"}
                  </span>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Clock className="size-3" />
                    <span>about {idx + 2} hours ago</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Users className="size-3" />
                    <span>{idx % 2 === 0 ? "2" : "3"} participants</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-800">
                  <span className="text-xs text-primary font-medium bg-primary/20 px-2 py-1 rounded">COMPLETED</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Session Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-neutral-900 border border-primary/30 text-white sm:max-w-md rounded-2xl backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-linear-to-r from-primary/60 to-primary bg-clip-text text-transparent">
              Create New Session
            </DialogTitle>
            <DialogDescription className="text-neutral-400 text-base">
              Select a problem and start collaborating with other developers
            </DialogDescription>
          </DialogHeader>

          {/* Problem Selector */}
          <div className="space-y-3 mt-3">
            <label className="text-sm font-medium text-neutral-200">Select Problem *</label>
            <Select onValueChange={setSelectedId}>
              <SelectTrigger className="w-full bg-neutral-800 border-neutral-700 hover:border-primary/50 focus:border-primary transition-colors rounded-xl py-6">
                <SelectValue placeholder="Choose a problem to solve..." />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-700 rounded-xl">
                {problemList.map((p) => (
                  <SelectItem
                    key={p.id}
                    value={p.id}
                    className="hover:bg-neutral-800 focus:bg-neutral-800 rounded-lg"
                  >
                    {p.title}
                    <span className={`ml-2 text-xs ${p.difficulty === 'Easy' ? 'text-primary' :
                        p.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                      ({p.difficulty})
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary */}
          {selectedProblem && (
            <div className="bg-neutral-800/50 p-5 rounded-xl mt-5 border border-primary/20">
              <p className="text-sm font-semibold text-primary mb-3">Room Summary:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Problem:</span>
                  <span className="font-medium text-white">{selectedProblem.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Difficulty:</span>
                  <span className={`font-medium ${selectedProblem.difficulty === 'Easy' ? 'text-primary' :
                      selectedProblem.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                    {selectedProblem.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Max Participants:</span>
                  <span className="font-medium text-white">2 (1-on-1)</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6 flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-600 px-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading || !selectedProblem}
              onClick={handleCreateRoom}
              className="bg-linear-to-r from-primary/60 to-primary hover:from-primary hover:to-primary/90 text-white font-semibold px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "+ Create Room"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="pt-20">
        <Footer />

      </div>
    </div>
  )
}

export default Dashboard