import "../../css/navigation.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import GOMapLogo from "../../img/symbols/SimpleSymbol.png";
import NavItem from "./NavItem";
import {CombinedDataProvider, LoginButton, LogoutButton, Text, useSession} from "@inrupt/solid-ui-react";
import {FOAF} from "@inrupt/lit-generated-vocab-common";
import {Card} from "react-bootstrap";
import {Button} from "@mui/material";
import {useState} from "react";
import LanguageMenu from "./LanguageMenu";

function NavBar() {
    const {session} = useSession();

    let {webId} = session.info;

    if (webId == undefined)
        webId = "";

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //We have logged in
    session.onLogin(() => {
        setIsLoggedIn(true)
    })

    //We have logged out
    session.onLogout(() => {
        setIsLoggedIn(false)
    })

    const dropdownTitle = (
        <span>
            <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
                <Text property={FOAF.name.iri.value} autosave/>
            </CombinedDataProvider>
        </span>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={GOMapLogo} alt="GOMap Logo" height={128} width={256}/>
                </a>
                <button aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
                        className="navbar-toggler" data-bs-target="#navbarNav" data-bs-toggle="collapse" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <NavItem to={"/"} text={"Home"}/>
                        <NavItem to={"/map"} text={"Map"}/>
                        <NavItem to={"/help"} text={"Help"}/>
                        <NavItem to={"/about"} text={"About"}/>
                    </ul>
                    <LanguageMenu />
                    <div className="d-flex">
                        <div id="login-manage">
                            {(!isLoggedIn) ? "" :
                                <Card><Card.Text>{dropdownTitle}</Card.Text></Card>}
                            {(!isLoggedIn) ?
                                <LoginButton oidcIssuer="https://inrupt.net" redirectUrl="http://localhost:3000/map">
                                    <Button variant="contained" color="primary" id="login">
                                        Login
                                    </Button>
                                </LoginButton> : <LogoutButton>
                                    <Button variant="contained" color="error" id="logout">
                                        Logout
                                    </Button></LogoutButton>}
                            {(isLoggedIn) ? "" :
                                <a href="https://inrupt.net/register">Haven't signed yed? Register now!</a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar