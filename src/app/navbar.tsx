"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand as={Link} href="/">
          App de foto do dedé
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/static" active={pathname === "/static"}>
              Estático
            </Nav.Link>
            <Nav.Link as={Link} href="/dynamic" active={pathname === "/dynamic"}>
              Dinâmico
            </Nav.Link>
            <Nav.Link as={Link} href="/isr" active={pathname === "/isr"}>
              ISR
            </Nav.Link>
            <NavDropdown title="Tópicos" id="topic-dropdown">
                <NavDropdown.Item as={Link} href="/topics/girls">Garotas</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/topics/gym">Academia</NavDropdown.Item>
                <NavDropdown.Item as={Link} href="/topics/tecnology">Tecnologia</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/search" active={pathname === "/search"}>
              Pesquisa
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
