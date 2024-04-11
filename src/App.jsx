import { useState } from "react";
import { Outlet } from "react-router-dom";
// components
import Header from "./components/Header";

// contexts
import { DateContext } from "./contexts/DateContext";
import { SizeContext } from "./contexts/SizeContext";

function App() {
  const [date, setDate] = useState(new Date());
  const [size, setSize] = useState(100);
  return (
    <>
      <Header />
      <main>
        <SizeContext.Provider value={{ size, setSize }}>
          <DateContext.Provider value={{ date, setDate }}>
            <Outlet />
          </DateContext.Provider>
        </SizeContext.Provider>
      </main>
    </>
  );
}

export default App;
