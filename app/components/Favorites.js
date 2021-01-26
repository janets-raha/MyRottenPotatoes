
import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link';


export default function MyAccount() {
  const [session, loading] = useSession();

  const [authUser, setAuth] = useState({});
  const [favMovies, setFav] = useState([]);
  const [fix, setFix] = useState('');


  const getFav = (id) => {
    console.log("get fav")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "id": id });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/api/users/favorites", requestOptions)
      .then(response => response.json())
      .then(result => {
        setFav(result.data)
      })
      .catch(error => console.log('error', error));
  }

  const getAuth = (email) => {
    console.log("in auth")
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
        getFav(res._id)
        setAuth(res)
      })
      .catch(error => console.log('error', error));
  }

  const deleteFav = (event) => {
    console.log(event.target.name)
    const result = favMovies.filter(movie => movie._id !== event.target.name)
    console.log(result)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ favorites: result });
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:3000/api/users/${authUser._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => { console.log(result); setFix(!fix) })
      .catch((error) => console.log("error", error));
  }


  useEffect(() => {
    if (session) {
      getAuth(session.user.email);
    }

  }, [fix]);


  return <>
    {session && <>

      <div className="">
        {
          favMovies.map((movie) => {
            return (
              <div key={movie.tmdb_id} className="d-flex flex-column my-4 mx-3">
                <div className="d-flex flex-row flex-nowrap">
                  <img src={"https://image.tmdb.org/t/p/w200" + movie.poster} className="align-self-start mr-3 movie-img" alt={movie.title} />
                  <div className="d-flex flex-column">
                    <Link href={`/movie/${movie._id}`}>
                      <h5 className="font-weight-bold pointer"><a>{movie.title}</a></h5>
                    </Link>
                    <h6>{movie.overview.substring(0, 250) + "..."}</h6>
                    <h6>{new Date(movie.release_date).toUTCString().substring(0, 16)}</h6>
                    <div><button className="btn-dark" name={movie._id} onClick={deleteFav}>Retirer de la liste</button></div>
                  </div>
                </div>
              </div>
            )
          })
        }


      </div>
    </>}
  </>

}
