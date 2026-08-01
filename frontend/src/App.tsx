import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/app/store";
import AppRoutes from "@/routes/AppRoutes";
import AuthInitializer from "@/components/auth/AuthInitializer";

export default function App() {
  return (
    <Provider store={store}>
      <TooltipProvider>
        <Toaster />
        <AuthInitializer />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </Provider>
  );
}