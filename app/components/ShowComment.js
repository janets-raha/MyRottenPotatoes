import React, { useState, useEffect } from "react";

const ShowComments = (props) => {
  const [fix, setFix] = useState(true);

  const [allComments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/movies/" + props.movieId + "/comments/"
      );
      const data = await res.json();
      setComments(data.data);
      //console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteCom = (event) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
    fetch(`http://localhost:3000/api/movies/${props.movieId}/comments/${event.target.name}`, requestOptions)
      .then(response => response.json())
      .then(result => { setFix(!fix) })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getComments();
  }, [fix]);

  return (
    <div>
      <h5>Commentaires :</h5>
      {

        allComments.map((oneComment) => {
          return (
            <div key={oneComment._id} className="shadow p-3 d-flex justify-content-between">
              <div>
                <div>{oneComment.comment}</div>
                <small className="text-muted">Publié par {oneComment.user_id.name} le {new Date(oneComment.createdAt).toUTCString().substring(0, 16)}</small>
              </div>
              <div>
                {props.isAdmin && props.isAdmin == "admin" &&
                  <button className="btn-danger" onClick={deleteCom} name={oneComment._id}>Delete</button>
                }

              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default ShowComments;
