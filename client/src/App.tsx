import { Switch, Route } from "wouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import NotFound from "@/pages/not-found";
import { MobileMenuProvider } from "@/context/MobileMenuContext";
import { UserMenuProvider } from "@/context/UserMenuContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <MobileMenuProvider>
      <UserMenuProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <MobileNav />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
      </UserMenuProvider>
    </MobileMenuProvider>
  );
}

export default App;
