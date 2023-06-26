import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/index";
import Logo from "../../assets/logo.png";
import "./styles.css";

import { Container, Navbar, Nav } from "react-bootstrap";

export default function Header() {
  const { user, signOut } = useAuth();

  // console.log(user.usuario);
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      .
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="logotipo" width="150" className="me-3" />
          GIRL BOSS STORE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 d-flex"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="Button" as={Link} to="/">
              Início
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Sobre
            </Nav.Link>
          </Nav>
          <Nav>
            {user?.usuario?.id ? (
              <>
                <Navbar.Brand> Olá, {user.usuario.usu_nome}</Navbar.Brand>
                <button onClick={signOut}>Sair</button>
              </>
            ) : (
              <button onClick={() => navigate("/signin")}>Entrar</button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
