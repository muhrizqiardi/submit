import { Story } from "@ladle/react";
import Container from "./Container";
import HeaderComponent from "./Header";

export const Header: Story<{
  isLoggedIn?: boolean;
  username?: "string";
}> = ({ isLoggedIn, username }) => (
  <Container>
    <HeaderComponent isLoggedIn={isLoggedIn} username={username} />
  </Container>
);

Header.args = {
  isLoggedIn: true,
  username: "billgates",
};
