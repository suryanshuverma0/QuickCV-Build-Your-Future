import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import AppRoutes from "./AppRoutes";
import { TemplateProvider } from "./contexts/TemplateContext";
function App() {
  return (
    <div className="">
      <AuthProvider>
        <Router>
          <TemplateProvider>
            <AppRoutes />
          </TemplateProvider>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
