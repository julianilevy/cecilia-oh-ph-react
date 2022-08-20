import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Menu from "./components/pages/Menu";
import Contact from "./components/pages/Contact";
import ArtisticoPorQue from "./components/pages/ArtisticoPorQue";
import ArtisticoVivir from "./components/pages/ArtisticoVivir";
import Filtro from "./components/pages/Filtro";
import Macro from "./components/pages/Macro";
import Productos from "./components/pages/Productos";
import Retratos from "./components/pages/Retratos";
import Surrealista from "./components/pages/Surrealista";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/artistico-por-que" element={<ArtisticoPorQue />} />
        <Route path="/artistico-vivir" element={<ArtisticoVivir />} />
        <Route path="/filtro" element={<Filtro />} />
        <Route path="/macro" element={<Macro />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/retratos" element={<Retratos />} />
        <Route path="/surrealista" element={<Surrealista />} />
      </Route>
      <Route path="*" element={<p>HTTP​ 404 Not Found</p>} />
    </Routes>
  );
};

export default App;
