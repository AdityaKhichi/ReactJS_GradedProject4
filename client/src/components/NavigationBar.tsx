import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { AppDispatch } from "../store/store";
import {
  updateNavigation,
  updateActiveTab,
  updateSearchvalue,
} from "../store/selectors";
import "../styles/NavigationBar.scss";

const NavigationBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { activeTab, searchValue } = useSelector(updateNavigation);

  const handleImage = () => {
    navigate("/");
  };

  const handleTabClick = (tabName: string) => {
    dispatch(updateActiveTab(tabName));
    navigate("/");
  };

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(updateSearchvalue(event.target.value));
  }

  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand>
            <img
              src="/assets/images/logo.png"
              alt="FilmHive"
              className="navbar-logo"
              onClick={handleImage}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link
                onClick={() => handleTabClick("movies-in-theaters")}
                active={activeTab === "Home"}
              >
                Home
              </Nav.Link> */}
              <Nav.Link
                onClick={() => handleTabClick("movies-in-theaters")}
                active={activeTab === "movies-in-theaters"}
              >
                Movies in Theater
              </Nav.Link>
              <Nav.Link
                onClick={() => handleTabClick("movies-coming")}
                active={activeTab === "movies-coming"}
              >
                Coming Soon
              </Nav.Link>
              <Nav.Link
                onClick={() => handleTabClick("top-rated-india")}
                active={activeTab === "top-rated-india"}
              >
                Top rated Indian
              </Nav.Link>
              <Nav.Link
                onClick={() => handleTabClick("top-rated-movies")}
                active={activeTab === "top-rated-movies"}
              >
                Top rated Movies
              </Nav.Link>
              <Nav.Link
                onClick={() => handleTabClick("favourite")}
                active={activeTab === "favourite"}
              >
                Favourites
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                value={searchValue}
                onChange={handleSearch}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavigationBar;
