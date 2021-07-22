import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useAuth } from "../AuthContext";
import { getCurrentUser, userLogout } from "../DAL/userApi";

export default function Header() {
  const [auth, setAuth] = useAuth();
  const currentUser = getCurrentUser();
  const history = useHistory(null);
  console.log(currentUser);
  const onLogOut = () => {
    if (currentUser) {
      userLogout({ sessionid: currentUser.session_id });
      Cookies.remove("currentuser");
    }
    setAuth(false);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        style={{ fontWeight: "800" }}
      >
        <Container>
          <Navbar.Brand href="/">Recipe Book</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              {auth ? (
                <Nav.Link href="/createRecipe">Create Recipe</Nav.Link>
              ) : null}
            </Nav>
            <Nav>
              {auth ? (
                <NavDropdown
                  title={`Welcome, ${currentUser?.first_name}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/userRecipes">
                    Your Recipes
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/userFavorites">
                    Your Favorites
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/editUser">
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={onLogOut}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
