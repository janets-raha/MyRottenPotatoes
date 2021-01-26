// equivalent fichier admin.js

const MovieFactory = async (endPoint, query) => {

  const apikey = process.env.apikey;
  let res;
  let data;
  let movies;
  let wrappedMovies;



  try {

    const getMCreds = async (movieId) => {
      const rcreds = await fetch('https://api.themoviedb.org/3/movie/' + movieId + '/credits?api_key=' + apikey + '&language=fr-FR&page=1')
      const creds = await rcreds.json();
      const directors = creds.crew.filter(cred => cred.job === "Director");
      const directorNames = directors.map(d => d.name);
      const actors = creds.cast;
      const actorNames = actors.map(a => a.name);
      return { directorNames, actorNames }
    }

    const getGenres = async () => {
      const rgenres = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + apikey + '&language=fr-FR&page=1')
      const data = await rgenres.json();
      return data.genres;
    }

    const wrapMovies = async (movies) => {

      for (let i = 0; i < movies.length; i++) {
        const creds = await getMCreds(movies[i].id);
        // console.log(creds);
        movies[i].directors = creds.directorNames.join(', ');
        movies[i].actors = creds.actorNames.join(', ');

        let mgenres = movies[i].genre_ids.map(genreId => {
          let genre = genres.find(g => g.id == genreId)
          return genre.name;
        });
        movies[i].genres = mgenres.join(', ');
        //console.log(mgenres, movies[i]);
      }
      return movies
    }

    const genres = await getGenres();
    console.log("genres", genres)

    switch (endPoint) {

      case "search/person":

        res = await fetch('https://api.themoviedb.org/3/' + endPoint + '?api_key=' + apikey + '&query=' + query + '&language=fr-FR&page=1');
        const persons = await res.json();
        const directors = persons.results.filter(person => person.known_for_department === "Directing");

        const getCreds = async (directorId) => {
          const rcreds = await fetch('https://api.themoviedb.org/3/person/' + directorId + '/credits?api_key=' + apikey + '&language=fr-FR&page=1')
          const creds = await rcreds.json();
          const directorCreds = creds.crew.filter(cred => cred.department === "Directing");
          return directorCreds
        }

        let directorMovies = [];
        for (let i = 0; i < directors.length; i++) {
          const creds = await getCreds(directors[i].id);
          directorMovies = directorMovies.concat(creds);
        }

        wrappedMovies = await wrapMovies(directorMovies);

        return wrappedMovies;

        break;

      case "search/movie":

        res = await fetch('https://api.themoviedb.org/3/' + endPoint + '?api_key=' + apikey + '&query=' + query + '&language=fr-FR&page=1');
        data = await res.json();

        movies = data.results ? data.results : [data]

        wrappedMovies = await wrapMovies(movies);

        return wrappedMovies;

        break;


      case "movie/latest":
        res = await fetch('https://api.themoviedb.org/3/' + endPoint + '?api_key=' + apikey + '&language=fr-FR&page=1');
        data = await res.json();

        movies = data.results ? data.results : [data]

        wrappedMovies = await wrapMovies(movies);

        return wrappedMovies;
        break;

      default:
        res = await fetch('https://api.themoviedb.org/3/' + endPoint + '?api_key=' + apikey + '&language=fr-FR&page=1');
        data = await res.json();

        movies = data.results ? data.results : [data]

        wrappedMovies = await wrapMovies(movies);

        return wrappedMovies;
    }


  } catch (error) {
    console.error(error);
  }

}



export default MovieFactory;