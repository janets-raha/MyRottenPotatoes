import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import AdminNav from '../../components/AdminNav';


const ratings = () => {
  const [movies, setMovies] = useState([]);
  const [countMovies, setCountMovies] = useState([]);
  const [countStars, setCountStars] = useState("");
  const [fix, setFix] = useState(true);

  const getStats = () => {
    const reqOptions = {
      method: "GET",
    };
    try {
      fetch("http://localhost:3000/api/movies", reqOptions)
        .then((response) => response.json())
        .then((result) => {
          // const movies = result.data;
          setMovies(result.data);
          console.log("State :", movies);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const goodMovies = () => {
    const countMovies = movies.filter((m) => m.avg_ratings > 3.5);
    setCountMovies(countMovies);
    setCountStars("3,5 to 5");
  };

  const mehMovies = () => {
    const countMovies = movies.filter(
      (m) => m.avg_ratings >= 2.5 && m.avg_ratings <= 3.5
    );
    setCountMovies(countMovies);
    setCountStars("2,5 to 3,5");
  };

  const badMovies = () => {
    const countMovies = movies.filter((m) => m.avg_ratings < 2.5);
    setCountMovies(countMovies);
    setCountStars("1 to 2,5");
  };

  useEffect(() => {
    getStats();
  }, [fix]);

  return (
    <div>

      <AdminNav />
      <div className="container mt-2">
        <h1>Ratings Stats</h1>
        <div className="d-flex">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Potato Flavor
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onSelect={goodMovies}>
                French fries movies (3.5 - 5 stars)
          </Dropdown.Item>
              <Dropdown.Item onSelect={mehMovies}>
                Mashed potatoes movies (2.5 - 3.5 stars)
          </Dropdown.Item>
              <Dropdown.Item onSelect={badMovies}>
                Raw potato movies (1 - 2.5 stars)
          </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <h3 className="ml-4">
            {countMovies.length} movie(s) have a score of {countStars} stars
      </h3>
        </div>
      </div>
    </div >
  );
};

export default ratings;
