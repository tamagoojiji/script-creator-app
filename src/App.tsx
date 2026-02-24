import { Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import CreatePage from "./pages/CreatePage";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white max-w-lg mx-auto">
      <Routes>
        <Route path="/" element={<CreatePage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
