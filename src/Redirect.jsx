import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Redirect() {
  let { hash } = useParams();
  useEffect(async () => {
    try {
        const response = await axios(`http://20.89.157.220:5000/api/short/${hash}`, {
        headers: { "content-type": "application/json" },
        method: "GET",
      });
      console.log(response);
      if (response.status === 200) {
        let originalURL = response.data.url;
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

  return (
    <div className="text-center text-white text-2xl pt-28">Redirecting...</div>
  );
}

export default Redirect;
