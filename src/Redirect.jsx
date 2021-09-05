import React, { useEffect } from "react";
import { useParams } from "react-router";

function Redirect() {
  let { hash } = useParams();

  useEffect(async (hash) => {
    try {
      const response = await axios(`http://localhost:5000/api/short/${hash}`, {
        headers: { "content-type": "application/json" },
        method: "GET",
      });

      if (response.status === 200) {
        let originalURL = response.data.data.originalUrl;
        window.location.href = originalURL;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log("Error", error.message);
      }
      console.log(error);
    }
  }, []);

  return <div>Redirect</div>;
}

export default Redirect;
