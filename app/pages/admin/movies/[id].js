
import AdminNav from '../../../components/AdminNav';
import Link from 'next/link';
import { Button, Form, Table, Modal, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import moment from 'moment';

const Movie = () => {

  const router = useRouter();
  //console.log(router.query.id)


  const [loaded, setLoaded] = useState(false);
  const [movie, setMovie] = useState({ title: "", poster: "/tzve3LD534wsCnhOrSqgJ1mnRma.jpg", overview: "", release_date: "", genres: "", actors: "", directors: "" });

  useEffect(() => {

    async function loadMovie() {
      const res = await fetch('http://localhost:3000/api/movies/' + router.query.id);
      const { data } = await res.json();
      //console.log("init ftch", data);
      setMovie(data);
    }
    loadMovie();

  }, [loaded]);

  const handleDeleteMovie = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/movies/" + movie._id,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "DELETE",
        });
      const updated = await res.json();
      router.push('/admin');

    } catch (error) {
      console.error("handleDeleteMovie", error);
    }
  }

  const handleSubmitMovie = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/movies/" + movie._id,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PATCH",
          body: JSON.stringify(movie)
        });
      const updated = await res.json();
      router.push('/admin');

    } catch (error) {
      console.error("handleSubmitMovie", error);
    }
  }

  const handleChangeMovie = (e) => {
    e.preventDefault();
    const tmp = { ...movie };
    tmp[e.target.name] = e.target.value;
    setMovie(tmp);
  }

  return (
    <div>
      <AdminNav />
      <div className="container">
        <h3 className="mt-1">Edit Movie</h3>

        <Form className="d-flex flex-row flex-nowrap" onSubmit={handleSubmitMovie}>

          <div className="d-flex flex-row my-4 w-100">
            <div className="d-flex flex-column">
              <img src={"https://image.tmdb.org/t/p/w200" + movie.poster} className="align-self-start mr-3 movie-img" alt={movie.title} />
              <h6 className="ml-auto mr-3">{moment(movie.release_date).format("MMM YYYY")}</h6>
            </div>
            <div className="d-flex flex-row flex-nowrap container">
              <div className="d-flex flex-column flex-grow-1">

                <Form.Group controlId="movie-title" className="mx-2 d-flex flex-row flex-nowrap">
                  <Form.Label column md="2">Title</Form.Label>
                  <Col md="10"><Form.Control type="text" name="title" value={movie.title} onChange={handleChangeMovie} /></Col>
                </Form.Group>
                <Form.Group controlId="movie-overview" className="mx-2 d-flex flex-row flex-nowrap">
                  <Form.Label column md="2">Overview</Form.Label>
                  <Col md="10"><Form.Control as="textarea" rows="4" name="overview" value={movie.overview} onChange={handleChangeMovie} /></Col>
                </Form.Group>
                <Form.Group controlId="movie-poster" className="mx-2 d-flex flex-row flex-nowrap">
                  <Form.Label column md="2">Poster</Form.Label>
                  <Col md="10"><Form.Control type="text" name="poster" value={movie.poster} onChange={handleChangeMovie} /></Col>
                </Form.Group>
                <Form.Group controlId="movie-genres" className="mx-2 d-flex flex-row flex-nowrap">
                  <Form.Label column md="2">Genres</Form.Label>
                  <Col md="10"><Form.Control type="text" name="genres" value={movie.genres} onChange={handleChangeMovie} /></Col>
                </Form.Group>
                <Form.Group controlId="movie-directors" className="mx-2 d-flex flex-row flex-nowrap">
                  <Form.Label column md="2">Directors</Form.Label>
                  <Col md="10"><Form.Control type="text" name="directors" value={movie.directors} onChange={handleChangeMovie} /></Col>
                </Form.Group>
                <Form.Group controlId="movie-actors" className="mx-2 d-flex flex-row flex-nowrap">
                  <Form.Label column md="2">Actors</Form.Label>
                  <Col md="10"><Form.Control type="text" name="actors" value={movie.actors} onChange={handleChangeMovie} /></Col>
                </Form.Group>
              </div>
            </div>
          </div>

        </Form>
      </div>
      <div className="text-center">
        <Button variant="primary" className="mx-3" onClick={handleSubmitMovie}>
          Update
        </Button>
        <Button variant="danger" className="mx-3" onClick={handleDeleteMovie}>
          Delete
        </Button>
      </div>
    </div >
  );
}

Movie.getInitialProps = async (ctx) => {
  return {}
}

export default Movie;