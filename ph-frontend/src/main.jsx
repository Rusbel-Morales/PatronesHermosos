import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/Provider.jsx"
import AppRoutes from "./routes/AppRoutes";
import {AuthProvider} from "@/contexts/AuthContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);