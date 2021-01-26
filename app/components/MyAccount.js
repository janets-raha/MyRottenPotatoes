
import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'


export default function MyAccount() {
  const [session, loading] = useSession();

  const [authUser, setAuth] = useState({});
  const [newName, setName] = useState(session.user.name);
  const [newEmail, setEmail] = useState(session.user.email);
  const [newPwd, setPwd] = useState('');
  const [confPwd, setConfPwd] = useState('');
  const [fix, setFix] = useState(true);


  const handleChange = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value); break;
      case 'email':
        setEmail(event.target.value); break;
      case 'pass1':
        setPwd(event.target.value); break;
      case 'pass2':
        setConfPwd(event.target.value); break;
    }
  };

  const changeCred = () => {
    if (newName && newEmail) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({ "name": newName, "email": newEmail });

      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`http://localhost:3000/api/users/${authUser._id}`, requestOptions)
        .then(response => response.json())
        .then(result => { console.log("retour update", result); signOut() })
        .catch(error => console.log('error', error));
    }
  }

  const changePwd = () => {
    console.log(newPwd, confPwd)
    if ((newPwd && confPwd) && (newPwd === confPwd)) {
      console.log('same pwd');
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({ "password": newPwd });

      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`http://localhost:3000/api/users/${authUser._id}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    } else {
      // gestion erreur mdp différent
    }
  }

  const getAuth = async () => {
    const session = await getSession()
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    if (session) {
      fetch("http://localhost:3000/api/users/auth/" + session.user.email, requestOptions)
        .then(response => response.json())
        .then(result => {
          setAuth(result.data);
          setName(result.data.name);
          setEmail(result.data.email);
        })
        .catch(error => console.log('error', error));
    }

  }

  /*   const getAuth = (email) => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch("http://localhost:3000/api/users", requestOptions)
        .then(response => response.json())
        .then(result => {
          const res = result.data.find((user) =>
            user.email == email
          );
          setAuth({ id: res._id, name: res.name, email: res.email, role: res.role });
  
        })
        .catch(error => console.log('error', error));
  
    } */


  useEffect(() => {
    getAuth();
  }, [fix]);


  return <>
    {session && <>

      <div className="">
        <div className="d-flex flex-row flex-wrap justify-content-around">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 px-2 mt-5">
            <div className="card my-2">
              <div className="card-header text-center">
                <div className="nav-pills">Mes Informations</div>
              </div>
              <div className="card-body text-center">
                <div className="form-group row">
                  <label for="name" className="col-md-6 col-form-label text-md-right">Nom</label>
                  <div className="col-md-6">
                    <input
                      value={newName}
                      id="name"
                      name="name"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      placeholder={session.user.name}
                      required
                      autoFocus
                    />
                    <span className="invalid-feedback" role="alert"></span>
                  </div>
                </div>
                <div className="form-group row">
                  <label for="email" className="col-md-6 col-form-label text-md-right">Adresse E-mail</label>
                  <div className="col-md-6">
                    <input
                      value={newEmail}
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={handleChange}
                      placeholder={session.user.email}
                      required
                    />
                    <span className="invalid-feedback" role="alert"></span>
                  </div>
                </div>
                <button type="submit" onClick={changeCred} className="btn btn-primary my-4">Envoyer</button>
                <p className="alert-danger">
                  <small className="text-muted alert-danger">Vous serez automatiquement déconnecté après validation pour mettre à jour vos données</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 px-2 mt-5">
            <div className="card my-2">
              <div className="card-header text-center">
                <div>Modifier le mot de passe</div>
              </div>
              <div className="card-body text-center">
                <div className="form-group row">
                  <label for="pass1" className="col-md-6 col-form-label text-md-right">Mot de passe</label>
                  <div className="col-md-6">
                    <input

                      id="pass1"
                      name="pass1"
                      type="password"
                      className="form-control"
                      onChange={handleChange}
                      required
                      autoFocus
                      placeholder="Nouveau mot de passe"
                    />
                    <span className="invalid-feedback" role="alert"></span>
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    for="pass2"
                    className="col-md-6 col-form-label text-md-right"
                  >Confirmer mot de passe</label>
                  <div className="col-md-6">
                    <input

                      id="pass2"
                      name="pass2"
                      type="password"
                      className="form-control"
                      onChange={handleChange}
                      required
                      placeholder="Confirmer nouveau mot de passe"
                    />
                    <span className="invalid-feedback" role="alert"></span>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={changePwd}
                  className="btn btn-primary my-4"
                >Changer le mot de passe</button>
              </div>
            </div>
          </div>
        </div>



      </div>
    </>}
  </>

}
