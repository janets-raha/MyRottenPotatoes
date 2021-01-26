// route /movie/:id
// details d'un film
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import CreateComment from "../../components/CreateComment";
import RatingStars from "../../components/RatingStars";
import ShowComment from "../../components/ShowComment";
import { useRouter } from "next/router";

const Movie = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [authUser, setAuth] = useState({});
  const [movieData, setMovie] = useState({});
  const [movieId, setMovieId] = useState({});
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
        .catch((error) => console.log("error", error));
    }
  };

  const getMovie = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`http://localhost:3000/api/movies/${router.query.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMovie(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const addFav = () => {
    const currentFav = authUser.favorites;
    currentFav.push(movieData._id);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ favorites: currentFav });
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`http://localhost:3000/api/users/${authUser._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const updateCmp = () => {
    getMovie();
  }

  useEffect(() => {
    getAuth();
    getMovie();
  }, [fix]);

  return (
    <div>
      <div className="container col-md-10 my-4">
        <div key={movieData.tmdb_id} className="my-2">
          <div className="">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <div>
                <img
                  src={"https://image.tmdb.org/t/p/w300" + movieData.poster}
                  className=" mr-3 float-left d-block"
                  alt={movieData.title}
                />
              </div>

              <div className="d-flex flex-column px-4 my-2">
                <div className="d-flex justify-content-between">
                  <h5 className="font-weight-bold my-4 text-primary">
                    <a>{movieData.title}</a>
                  </h5>
                  <div className="my-4">
                    {movieData.avg_ratings > 0 && <>
                      <h6 className="font-weight-bold">Note {movieData.avg_ratings} / 5</h6>
                      <small> sur un total de {movieData.rating_count} notes </small>
                    </>}
                    {movieData.avg_ratings < 1 && <h6 className="font-weight-bold">Note n.c.</h6>}

                  </div>
                </div>
                <h6 className="ml-2 my-2 text-secondary">{movieData.genres}</h6>
                <h6>{movieData.overview}</h6>
                <small className="text-muted mt-2">
                  {new Date(movieData.release_date)
                    .toUTCString()
                    .substring(0, 16)}
                </small>

                <h6 className="mr-2 my-2 text-right">
                  Réalisé par {movieData.directors}{" "}
                </h6>
                {session && (
                  <div className="my-3">
                    <button className="btn-dark" onClick={addFav}>
                      Ajouter aux favoris
                    </button>
                  </div>
                )}
              </div>
            </div>
            <h6 className="mr-2 my-3">Avec {movieData.actors} </h6>
          </div>
        </div>
        <ShowComment movieId={router.query.id} userId={authUser._id} isAdmin={authUser.role} />
        {session && (
          <>
            <RatingStars
              movieId={router.query.id}
              userId={authUser._id}
              avg_ratings={movieData.avg_ratings}
              rating_count={movieData.rating_count}
              update={updateCmp}
            />
            <CreateComment movieId={router.query.id} userId={authUser._id} update={updateCmp} />
          </>
        )}
        {!session && (
          <>
            <div>
              Veuillez vous{" "}
              <a className="pointer" onClick={signIn}>
                connecter
              </a>{" "}
              pour ajouter une note ou un un commentaire
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Movie.getInitialProps = async (ctx) => {
  if (ctx.req) {
    let route = ctx.req.url.split("/");

    const res = await fetch(
      "http://localhost:3000/api/movies/" + route[route.length - 1]
    );

    const { data } = await res.json();

    return { qmovie: data };
  } else return {};
};

/* Movie.getInitialProps = async (ctx) => {

  return {}

} */
export default Movie;
