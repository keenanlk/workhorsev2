import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./pages/Layout";
import Home from "./pages/Home";

import { JobsContextProvider } from "./contexts/JobsContext";
import Reports from "./pages/Reports";

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  return (
    <ChakraProvider>
      <JobsContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout signOut={signOut} />}>
              <Route index element={<Home />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </JobsContextProvider>
    </ChakraProvider>
  );
};

export default withAuthenticator(App);
