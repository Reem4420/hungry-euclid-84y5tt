import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import Demo from "./Demo"; // Import your table component

function App() {
  const kitchenNumbers = [1, 2, 3, 4];
  const [selectedKitchen, setSelectedKitchen] = useState<number | null>(null);

  const handleKitchenSelect = (number: number) => {
    setSelectedKitchen(number);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TeaBoy System
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Out</Button>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <div style={{ textAlign: "center", margin: "20px" }}>
        {!selectedKitchen
          ? kitchenNumbers.map((number) => (
              <Button
                key={number}
                variant="contained"
                onClick={() => handleKitchenSelect(number)}
                component={Link}
                to={"/kitchen/${number}"}
              >
                Kitchen {number}
              </Button>
            ))
          : null}
      </div>

      <Routes>
        {kitchenNumbers.map((number) => (
          <Route
            key={number}
            path={"/kitchen/${number}"}
            element={<Demo kitchenNumber={selectedKitchen} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
