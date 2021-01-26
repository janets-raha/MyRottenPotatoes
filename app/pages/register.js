import React, { Component } from "react";
import { useRouter } from "next/router";
//import Redirect from 'react-router-dom'

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };
  /*   router = useRouter(); */

  register = (e) => {
    // console.log(this.state)
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.password2
    ) {
      if (this.state.password === this.state.password2) {
        console.log("state =", this.state);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify(this.state);

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:3000/api/users", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            /*             router.push('/api/auth/signin') */
          })
          .catch((error) => console.log("error", error));
      }
    }
  };

  handleChange = (event) => {
    //console.log(event.target)
    const value = event.target.value;
    const key = event.target.name;
    this.setState({
      [key]: value,
    });
  };

  render() {
    return (
      <>
        {/* <Route exact path="/">
        {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
      </Route> */}
        <div className="login my-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="text-center">
                <h4>Enregistrer un compte</h4>
                <div className="py-4">
                  <div className="form-group row">
                    <label
                      xfor="name"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Nom
                    </label>
                    <div className="col-md-6">
                      <input
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name"
                        type="text"
                        className="form-control"
                        required
                        placeholder="Entrez un nom..."
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      xfor="email"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Adresse E-mail
                    </label>
                    <div className="col-md-6">
                      <input
                        value={this.state.email}
                        onChange={this.handleChange}
                        name="email"
                        type="email"
                        className="form-control"
                        required
                        placeholder="utilisateur@exemple.fr"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      xfor="pass1"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Mot de passe
                    </label>
                    <div className="col-md-6">
                      <input
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      xfor="pass2"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Confirmer le mot de passe
                    </label>
                    <div className="col-md-6">
                      <input
                        value={this.state.password2}
                        onChange={this.handleChange}
                        name="password2"
                        type="password"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary my-4"
                    onClick={this.register}
                  >
                    Créer un compte
                  </button>
                </div>
                {this.state.error === 1 && (
                  <div className="alert alert-danger mt-2" role="alert">
                    Tous les champs doivent être remplis
                  </div>
                )}
              </div>
              {this.state.error === 2 && (
                <div className="alert alert-danger mt-2" role="alert">
                  Cet email existe déjà, veuillez en entrer un nouveau
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
