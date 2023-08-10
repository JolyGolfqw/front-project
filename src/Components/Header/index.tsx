import React from "react";
import { Navbar, Nav, Stack, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { authSignOut } from "../../features/applicationSlice";
const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.application.token);

  return (
    <div>
      <Navbar bg="dark">
        <Container>
          <Link to={"/"} className="link-light text-decoration-none">
            huoshon
          </Link>
          <Nav>
            <Stack direction="horizontal" gap={3}>
              {token ? (
                <span
                  role="button"
                  onClick={() => dispatch(authSignOut())}
                  className="link-light pointer"
                >
                  Выйти
                </span>
              ) : (
                <>
                  <Link
                    to={"/sign-in"}
                    className="link-light text-decoration-none"
                  >
                    Войти
                  </Link>
                  <Link
                    to={"/sign-up"}
                    className="link-light text-decoration-none"
                  >
                    Зарегистрироваться
                  </Link>
                </>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
