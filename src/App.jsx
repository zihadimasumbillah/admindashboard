import { Route, Routes } from "react-router-dom";
import ToggleSidebar from "./components/common/ToggleSidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import MessagesPage from "./pages/MessagePage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Routes>
        <Route path="/" element={<ToggleSidebar />}>
          <Route index element={<OverviewPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
