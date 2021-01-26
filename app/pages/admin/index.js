// equivalent fichier admin.js
import AdminNav from '../../components/AdminNav';
import Link from 'next/link';
import { Button, Form, Table, Modal } from 'react-bootstrap'
import MovieFactory from '../../factory/MovieFactory'
import { useState, useEffect } from 'react'
import moment from 'moment';

import { useRouter } from 'next/router';

const Index = ({ movies }) => {

  const router = useRouter();

  const getMovies = async (endPoint, query) => {
    const newMovies = await MovieFactory(endPoint, query);
    setTmdbMovies(newMovies);
  }

  const [tmdbMovies, setTmdbMovies] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelectedMovies([]);
    setShow(false);
  }
  const handleShow = () => {
    if (searchText) getMovies("search/movie", searchText);
    setShow(true);
  }
  const [searchText, setSearchText] = useState("");
  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  }
  const [searchBy, setSearchBy] = useState("search/movie");
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
    if (searchText) getMovies(searchBy, searchText);
    return true;
  }

  const [selectedMovies, setSelectedMovies] = useState([]);

  const handleMovieSelect = (e) => {
    let selected = selectedMovies;
    let found = selected.findIndex(el => el === e.target.id);
    if (found < 0 && e.target.checked) selected.push(e.target.id);
    if (found > -1 && !e.target.checked) selected.splice(found, 1);
    setSelectedMovies(selected)
  }

  const handleAddMovies = async (e) => {

    for (let i = 0; i < selectedMovies.length; i++) {
      let movieId = selectedMovies[i];
      let movie = tmdbMovies.find(m => m.id == movieId);
      let newMovie = {
        tmdb_id: movie.id, title: movie.title, directors: movie.directors, actors: movie.actors, genres: movie.genres,
        overview: movie.overview, release_date: movie.release_date, poster: movie.poster_path
      }
      //console.log(newMovie);
      try {
        const res = await fetch("http://localhost:3000/api/movies",
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newMovie)
          });
        const added = await res.json();
        if (added.success) {
          newMovie._id = added.data._id;
          movies.splice(0, 0, newMovie)
        }
      } catch (error) {
        console.error("handleAddMovies", error);
      }
      ;
    }
    handleClose();
  }

  const [showMovie, setShowMovie] = useState(false);
  const [movie, setMovie] = useState({});

  const handleSubmitMovie = (e) => { }
  const handleShowMovie = (movieId) => {
    router.push("/admin/movies/" + movieId)
  }
  const handleCloseMovie = (e) => { }
  const handleChangeMovie = (e) => { }

  return (
    <div>
      <AdminNav />
      <div className="container">
        <h3 className="mt-1">Movies</h3>
        <Button variant="primary" onClick={handleShow}>
          Add Movies
        </Button>

        <Modal show={show} onHide={handleClose} className="ma-modal">
          <Modal.Header closeButton>
            <Modal.Title>Add Movies</Modal.Title>
          </Modal.Header>
          <Modal.Body className="overflow-auto">
            <Form className="d-flex flex-row flex-nowrap" onSubmit={handleSubmit}>
              <Form.Group controlId="searchForm.searchText" className="mx-2">
                <Form.Label>Search movie</Form.Label>
                <Form.Control type="text" placeholder="Enter search text here..." value={searchText} onChange={handleSearchText} />
              </Form.Group>
              <Form.Group controlId="searchForm.filterBy" className="mx-2">
                <Form.Label className="text-nowrap">Filter by</Form.Label>
                <Form.Control as="select" value={searchBy} onChange={handleSearchBy}>
                  <option value="search/movie">Movie</option>
                  <option value="search/person">Person</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="searchForm.searchSelection" className="ml-auto">
                <Form.Label className="text-nowrap">Select from list</Form.Label>
                <Form.Control as="select" value={searchSelection} onChange={handleSearchSelection}>
                  <option value="movie/top_rated">Top Rated</option>
                  <option value="movie/popular">Popular</option>
                  <option value="movie/latest">Latest</option>
                </Form.Control>
              </Form.Group>
            </Form>
            <div className="ma-search overflow-auto">
              <Table striped bordered hover size="sm" >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Overview</th>
                    <th>Release Date</th>
                  </tr>
                </thead>
                <tbody>
                  {tmdbMovies &&
                    tmdbMovies.map(movie => {
                      return (
                        <tr key={movie.id}>
                          <td><Form.Check type="switch" id={movie.id} label="" onChange={handleMovieSelect} />
                            <img src={"https://image.tmdb.org/t/p/w200" + movie.poster_path}
                              className="align-self-start mr-3 tickets-img" alt={movie.title} />
                          </td>
                          <td>{movie.title}</td>
                          <td>{movie.overview}</td>
                          <td>{moment(movie.release_date).format('YYYY')}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddMovies}>
              Add selected movies
            </Button>
          </Modal.Footer>
        </Modal>
        {
          movies.map(movie => {
            return (
              <div key={movie.tmdb_id} className="d-flex flex-column my-4">
                <div className="d-flex flex-row flex-nowrap">
                  <img src={"https://image.tmdb.org/t/p/w200" + movie.poster} className="align-self-start mr-3 movie-img" alt={movie.title} />
                  <div className="d-flex flex-column">
                    <Link as={`/admin/movies/${movie._id}`} href="/admin/movies/[id]">
                      <h5 className="font-weight-bold pointer"><a>{movie.title}</a></h5>
                    </Link>
                    <h6 className="font-weight-bold">{moment(movie.release_date).format("MMM YYYY")} <span className="text-secondary">{movie.genres}</span></h6>
                    <h6>{movie.overview}</h6>
                    <div>Director: <em>{movie.directors}</em> Actors: <em>{movie.actors}</em></div>
                    <div className="text-center mt-3">
                      <Button variant="primary" onClick={handleShowMovie.bind(this, movie._id)}>
                        Edit Movie
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div >
  );
}

Index.getInitialProps = async () => {

  const res = await fetch('http://localhost:3000/api/movies');
  const { data } = await res.json();
  return { movies: data }
}

export default Index;