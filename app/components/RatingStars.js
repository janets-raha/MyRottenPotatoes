import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const RatingStars = (props) => {
  // console.log("PropsIn :", props.userId);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const updRate = async (ratingValue) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/movies/" + props.movieId + "/ratings",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            user_id: props.userId,
            movie_id: props.movieId,
            rate: ratingValue,
          }),
        }
      );
      const data = await res.json();
      console.log("SPM state :", data.success);

      // vv NEW AVERAGE RATE & UPDATE MOVIE FIELDS vv
      if (
        !(isNaN(props.avg_ratings) || isNaN(props.rating_count)) &&
        data.success === true
      ) {

        const avgX = props.avg_ratings * props.rating_count;
        try {
          const updMovieRateData = await fetch(
            "http://localhost:3000/api/movies/" + props.movieId,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                avg_ratings:
                  Math.round(
                    ((avgX + ratingValue) / (props.rating_count + 1) +
                      Number.EPSILON) *
                    100
                  ) / 100,
                rating_count: props.rating_count + 1,
              }),
            }
          );
        } catch (error) {
          console.error("PATCH rating error :", error);
        }
      }
      // ^^ END OF NEW AVERAGE RATE & UPDATE MOVIE FIELDS ^^
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div className="mt-4">
      <h5>Notez le film :</h5>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setRating(ratingValue);
                updRate(ratingValue);
              }}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingStars;
