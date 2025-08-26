import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./context/ShopContext.jsx";
import { LoaderProvider } from "./context/LoaderContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoaderProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </LoaderProvider>
  </BrowserRouter>
);
