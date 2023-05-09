import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AppRouter from "./routs/AppRouter";
function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
