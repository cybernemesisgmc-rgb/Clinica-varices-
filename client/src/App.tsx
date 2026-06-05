import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from './pages/Home';
import FinancialStatements from './pages/FinancialStatements';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import ScrollToHash from "./components/ScrollToHash"; 

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/financial-statements" component={FinancialStatements} />
      <Route path="/financial-statements/login" component={AdminLogin} />
      <Route path="/financial-statements/admin" component={AdminPanel} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
<TooltipProvider>
  <Toaster />
  <ScrollToHash />
  <Router />
</TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
