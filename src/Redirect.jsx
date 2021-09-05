import React, { useEffect } from "react";
import { useParams } from "react-router";

function Redirect() {
  let { hash } = useParams();

  useEffect(async (hash) => {
    try {
      //   const response = await axios(`http://localhost:5000/api/short/${hash}`, {
      //     headers: { "content-type": "application/json" },
      //     method: "GET",
      //   });

      //   if (response.status === 200) {
      //   let originalURL = response.data.data.originalUrl;
      window.location.href = "https://google.com";
      //   }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log("Error", error.message);
      }
      console.log(error);
    }
  }, []);

  return (
    <div className="text-center text-white text-2xl pt-28">Redirecting...</div>
  );
}

export default Redirect;
