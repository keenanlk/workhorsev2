import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiTrendingUp } from "react-icons/fi";
import NavBarContent from "./NavBarContent";
import MobileNav from "./MobileNav";

const LinkItems = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Reports", icon: FiTrendingUp, href: "/reports" },
];

export default function NavBar({ signOut, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <NavBarContent
        onClose={() => onClose()}
        display={{ base: "none", md: "block" }}
        LinkItems={LinkItems}
        signOut={signOut}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <NavBarContent
            onClose={onClose}
            LinkItems={LinkItems}
            signOut={signOut}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 40 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
