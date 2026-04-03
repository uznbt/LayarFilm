import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MainLayout } from "./layouts/MainLayout";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:type/:id" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
