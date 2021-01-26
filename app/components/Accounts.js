import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const Accounts = ({ users }) => {

  const [allUsers, setUsers] = useState([]);
  const [newName, setName] = useState('');
  const [newEmail, setEmail] = useState('');
  const [status, setStatus] = useState('user');
  const [newPwd, setPwd] = useState('');
  const [confPwd, setConfPwd] = useState('');
  const [modName, setModName] = useState('');
  const [modEmail, setModEmail] = useState('');
  const [modId, setModId] = useState('');
  const [fix, setFix] = useState(true);
  const [show, setShow] = useState(false);
  const [showUpd, setShowupd] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseUpd = () => setShowupd(false);
  const handleShowUpd = () => setShowupd(true);

  const getUsers = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("http://localhost:3000/api/users", requestOptions)
      .then(response => response.json())
      .then(result => {
        setUsers(result.data);
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getUsers();
  }, [fix]);

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
      case 'status':
        setStatus(event.target.value); break;
      case 'nameMod':
        setModName(event.target.value); break;
      case 'emailMod':
        setModEmail(event.target.value); break;
    }
  };

  const addUser = (e) => {
    // console.log(this.state)
    if (newName && newEmail && status && newPwd && confPwd) {

      if (newPwd === confPwd) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify(
          { "name": newName, "email": newEmail, "password": newPwd, "role": status }
        );

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("http://localhost:3000/api/users", requestOptions)
          .then(response => response.json())
          .then(result => { setFix(!fix); handleClose() })
          .catch(error => console.log('error', error));
      }
    }
  };

  function editUser(user) {
    setModName(user.name)
    setModEmail(user.email)
    setModId(user._id)
    handleShowUpd()
  }

  const changeCred = () => {
    if (modName && modEmail) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({ "name": modName, "email": modEmail });

      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`http://localhost:3000/api/users/${modId}`, requestOptions)
        .then(response => response.json())
        .then(result => { console.log(result); setFix(!fix); handleCloseUpd() })
        .catch(error => console.log('error', error));
    }
  }

  const changeStatus = (event) => {
    const id = event.target.id

    console.log(event.target.checked)
    let role;
    if (event.target.checked) {
      role = "admin"
    } else {
      role = "user"
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({ "role": role });

    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://localhost:3000/api/users/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => { console.log(result); setFix(!fix) })
      .catch(error => console.log('error', error));

  }


  const deleteUser = (event) => {
    const userId = event.target.id
    const requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    fetch(`http://localhost:3000/api/users/${userId}`, requestOptions)
      .then(response => response.json())
      .then(result => { console.log(result); setFix(!fix) })
      .catch(error => console.log('error', error));
  }


  return (
    <>
      <button className="btn-success" onClick={handleShow}>
        Ajouter
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout Utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="login my-4">
            <div className="row justify-content-center">
              <div className="col-md-12">
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
                          value={newName}
                          onChange={handleChange}
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
                          value={newEmail}
                          onChange={handleChange}
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
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Status
                      </label>
                      <div className="col-md-6">
                        <select className="form-control" name="status" onChange={handleChange}>
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
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
                          value={newPwd}
                          onChange={handleChange}
                          name="pass1"
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
                          value={confPwd}
                          onChange={handleChange}
                          name="pass2"
                          type="password"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary my-4"
                      onClick={addUser}
                    >
                      Créer un compte
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id={user._id} checked={user.role == "admin"} onClick={changeStatus} />
                      <label class="custom-control-label" for={user._id}>{user.role}</label>
                    </div>

                  </td>
                  <td>
                    <button className="btn-success" onClick={editUser.bind(this, user)} id={user._id} >Edit</button>
                    <button className="btn-danger" onClick={deleteUser} id={user._id}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>

      <Modal show={showUpd} onHide={handleCloseUpd}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card-body text-center">
            <div className="form-group row">
              <label for="name" className="col-md-4 col-form-label text-md-left">Nom</label>
              <div className="col-md-8">
                <input
                  value={modName}
                  id="name"
                  name="nameMod"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  required
                  autoFocus
                />
                <span className="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div className="form-group row">
              <label for="email" className="col-md-4 col-form-label text-md-left">Adresse E-mail</label>
              <div className="col-md-8">
                <input
                  value={modEmail}
                  id="email"
                  name="emailMod"
                  type="email"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
                <span className="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <button type="submit" onClick={changeCred} className="btn btn-primary my-4">Valider</button>
          </div>
        </Modal.Body>

      </Modal>



    </>
  )
}


export default Accounts