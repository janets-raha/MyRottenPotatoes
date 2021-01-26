import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Link from 'next/link';
import { Button, Form, Table, Modal } from 'react-bootstrap'
import { getSession } from 'next-auth/client'


export default function Home() {
  const [allMovies, setMovies] = useState([]);
  const [fix, setFix] = useState(true);
  const [authUser, setAuth] = useState({});


  const getAuth = async () => {
    const session = await getSession()
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("http://localhost:3000/api/users/auth/" + session.user.email, requestOptions)
      .then(response => response.json())
      .then(result => {
        setAuth(result.data)
      })
      .catch(error => console.warn('error', error));
  }

  const getMovies = (endpoint = "", query = "") => {

    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };



    if (endpoint == "/favorites") {


      fetch("http://localhost:3000/api/movies/favorites/" + authUser._id, requestOptions)
        .then(response => response.json())
        .then(result => {
          setMovies(result.data);
        })
        .catch(error => console.log('error', error));

    } else {

      fetch("http://localhost:3000/api/movies" + endpoint + (query.length ? "?query=" + query : ""), requestOptions)
        .then(response => response.json())
        .then(result => {
          setMovies(result.data);
        })
        .catch(error => console.log('error', error));
    }



  }


  useEffect(() => {
    getMovies();
    getAuth();
  }, [fix]);

  const [searchText, setSearchText] = useState("");
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  }
  const [searchBy, setSearchBy] = useState("");
  const handleSearchBy = (e) => {
    setSearchBy(e.target.value);
    if (searchText) { getMovies(e.target.value, searchText) } else { console.error("AAAAA"); }
  }
  const [searchSelection, setSearchSelection] = useState();
  const handleSearchSelection = (e) => {
    setSearchSelection(e.target.value);
    getMovies(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies(searchBy, searchText);
    return true;
  }
  return (<>
    <div className="container mt-2">
      <div>
        <Form className="d-flex flex-row flex-nowrap" onSubmit={handleSubmit}>
          <Form.Group controlId="searchForm.searchText" className="mx-2">
            <Form.Label>Search movie</Form.Label>
            <Form.Control type="text" placeholder="Enter search text here..." value={searchText} onChange={handleSearchText} />
          </Form.Group>
          <Form.Group controlId="searchForm.filterBy" className="mx-2">
            <Form.Label className="text-nowrap">Filter by</Form.Label>
            <Form.Control as="select" value={searchBy} onChange={handleSearchBy}>
              <option value="">Film</option>
              <option value="/search/genre">Genre</option>
              <option value="/search/date">Date</option>
              <option value="/search/director">Réalisateur</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="searchForm.searchSelection" className="ml-auto">
            <Form.Label className="text-nowrap">Select from list</Form.Label>
            <Form.Control as="select" value={searchSelection} onChange={handleSearchSelection}>
              <option value="/latest">Récents</option>
              <option value="/favorites">Favoris</option>
              <option value="/top_rated">Meilleurs Avis</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="container col-md-10">
        {
          allMovies.map(movie => {
            return (
              <div key={movie.tmdb_id} className="rounded shadow my-2">
                <div className="d-flex flex-column my-4">
                  <div className="d-flex flex-row flex-nowrap">
                    <img src={"https://image.tmdb.org/t/p/w200" + movie.poster} className="align-self-start mr-3 movie-img" alt={movie.title} />
                    <div className="d-flex flex-column pr-3">
                      <div className="d-flex justify-content-between">
                        <Link href={`/movie/${movie._id}`}>
                          <h5 className="font-weight-bold pointer my-3"><a>{movie.title}</a></h5>
                        </Link>
                        {movie.avg_ratings > 0 && <p className="my-3">Note {movie.avg_ratings}</p>}
                        {movie.avg_ratings < 1 && <p className="my-3">Note n.c.</p>}

                      </div>

                      <h6>{movie.overview.substring(0, 250) + "..."}</h6>
                      <small>{new Date(movie.release_date).toUTCString().substring(0, 16)}</small>
                      <div className="d-flex justify-content-between mt-3">
                        <h6 className="ml-2">{movie.genres}</h6>
                        <h6 className="mr-2">Réalisé par {movie.directors} </h6>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }


      </div>
    </div>
  </>)

}
