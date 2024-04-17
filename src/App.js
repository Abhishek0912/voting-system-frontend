import logo from "./logo.svg";
import "./App.css";
import VotingPoll from "./pages/VotingPoll";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import WelcomePage from "./pages/WelcomePage";
import SuccessVotePage from "./pages/SuccessVotePage";
import NotFound from "./pages/NotFound";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

function App() {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="/admin/Dashboard" element={
        <ProtectedRoute>
          <DashboardPage/>
        </ProtectedRoute>
     }/>
       <Route path="/login" element={
        <PublicRoute>
          <LoginPage/>
        </PublicRoute>
     }/>       
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/successVote" element={<SuccessVotePage/>} />
        <Route path="/votingPoll" element={<VotingPoll/>} />
        <Route path="*" element={<NotFound />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
