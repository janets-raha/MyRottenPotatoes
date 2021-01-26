import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbarr() {
  const router = useRouter();

  const [session, loading] = useSession();

  const [authUser, setAuth] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    apply: null,
  });
  const [fix, setFix] = useState(true);

  const getAuth = async () => {
    const session = await getSession();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    if (session) {
      fetch(
        "http://localhost:3000/api/users/auth/" + session.user.email,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setAuth(result.data);
        })
        .catch((error) => console.warn("error", error));
    }
  };

  useEffect(() => {
    getAuth();
  }, [fix]);

  const _beforeSignOut = () => {
    //localStorage.removeItem('rpuser');
    signOut();
    router.push("/");
  };

  return (
    <>
      <Navbar bg="warning" variant="dark">
        <Navbar.Brand href="/">Rotten Potatoes</Navbar.Brand>
        <Nav className="ml-auto">
          {!session && (
            <>
              <Nav.Link onClick={signIn}>Connexion</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}
          {session && (
            <>
              <Nav.Link href="/profile">{session.user.name}</Nav.Link>
              {authUser && authUser.role === "admin" && (
                <>
                  <Nav.Link href="/admin">Admin</Nav.Link>{" "}
                </>
              )}
              <Nav.Link onClick={signOut}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

//export default Navbarr;
