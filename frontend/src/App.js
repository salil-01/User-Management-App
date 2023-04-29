import "./App.css";
import { AllRoutes } from "./pages/AllRoutes";
import { Navbar } from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Box width={"98%"} margin={"auto"}>
        <Navbar />
      </Box>
      <AllRoutes />
      <Box width={"98%"} margin={"auto"} padding={"20px"}>
        <Footer/>
      </Box>
    </div>
  );
}

export default App;
