import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = ({ signOut }) => {
  return (
    <Box>
      <NavBar signOut={signOut}>
        <Outlet />
      </NavBar>
    </Box>
  );
};

export default Layout;
