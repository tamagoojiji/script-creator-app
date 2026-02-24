import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { path: "/", label: "作成", icon: "✏️" },
  { path: "/history", label: "履歴", icon: "📋" },
  { path: "/settings", label: "設定", icon: "⚙️" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // 結果ページではナビを非表示
  if (location.pathname.startsWith("/result")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 safe-bottom">
      <div className="max-w-lg mx-auto flex">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex-1 py-3 text-center text-sm ${
                active ? "text-blue-400" : "text-slate-400"
              }`}
            >
              <div className="text-lg">{tab.icon}</div>
              <div>{tab.label}</div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
