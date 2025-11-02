import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"
import Dashboard from "./pages/Dashboard";
function App() {
  const { isSignedIn, isLoaded } = useUser()

  if(!isLoaded) return null
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" />:<HomePage />} />
        <Route path="/problems" element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={isSignedIn ? <Dashboard /> : <Navigate to="/" />} />
        
      </Routes>
      <Toaster duration={4000} position="top-right" />
    </ThemeProvider>
  );
}

export default App;
