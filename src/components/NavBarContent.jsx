import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import NavItem from "./NavItem";

const NavBarContent = ({ signOut, onClose, LinkItems, ...rest }) => {
  // const handleSignin = (e) => {
  //   e.preventDefault();
  //   signIn();
  // };

  // const handleSignout = (e) => {
  //   e.preventDefault();
  //   signOut();
  // };
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 40 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img src="logo.svg" width="400" height="300" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          onClick={onClose}
        >
          {link.name}
        </NavItem>
      ))}
      <NavItem onClick={signOut}>Sign out</NavItem>
    </Box>
  );
};

export default NavBarContent;
