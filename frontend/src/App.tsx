import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";

function App() {
  return (
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-black text-white">
              <SignedOut>
                <SignIn />
                hello
              </SignedOut>

              <SignedIn>
                <h2>Welcome!</h2>
                <UserButton />
              </SignedIn>
            </div>
          }
        />
      </Routes>
  );
}

export default App;
