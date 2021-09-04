import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "./components/Form";
import Card from "./components/Card";

function clsx(...className) {
  return className.filter(Boolean).join(" ");
}

function Home() {
  return (
    <div className="min-h-screen">
      <h1 className="text-center pb-20 md:text-left md:pl-20 pt-10 text-2.5xl text-white lg:text-5xl font-bold">
        BugerURL
      </h1>

      <div className=" px-6 md:px-20 grid lg:grid-cols-2 place-content-center gap-10 md:gap-20 max-w-screen-xl mx-auto">
        <section className="text-white my-auto text-center lg:text-left space-y-8 lg:space-y-8">
          <h1 className="text-2xl lg:text-4xl font-bold">Best URL Shortener</h1>

          <p className="text-lg fonot-semibold"> Easy Link Shortening</p>
        </section>

        <div className="space-y-10">
          <p className="text-white text-center font-semibold text-2xl px-12">
            Try It for Free!!
          </p>

          <Card className="bg-white">
            <Form />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
