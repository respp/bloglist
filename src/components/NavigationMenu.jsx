import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';


const NavigationMenu = () => {
  return (
    // <nav>
    //   <ul>
    //     <li>
    //       <Link to="/">Blogs</Link>
    //     </li>
    //     <li>
    //       <Link to="/users">Users</Link>
    //     </li>
    //   </ul>
    // </nav>
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar" bg="dark" data-bs-theme="dark">
      <Container className="custom-container">
        <Navbar.Brand href="/">React-Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Blogs</Nav.Link>
            <Nav.Link as={Link} to="/users">Users</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationMenu;
