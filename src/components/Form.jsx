import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function clsx(...className) {
  return className.filter(Boolean).join(" ");
}

function Button({ children, className }) {
  return (
    <button className={clsx("p-2 rounded shadow-lg w-full", className)}>
      {children}
    </button>
  );
}

function Input({ id, label, type = "text", error }) {
  const [_value, setValue] = useState("");

  return (
    <div>
      <div className="relative flex flex-col justify-start items-center">
        <label
          htmlFor={id}
          className={clsx(
            "w-full p-2 my-4",
            "flex items-center",
            "text-base font-semibold text-gray-700"
          )}
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={id}
          className={clsx(
            "w-full p-2 px-3 rounded peer",
            !error ? "border" : "border-2 border-red"
          )}
          value={_value}
          onChange={(e) => setValue(e.target.value)}
        />

        {error && (
          <svg
            className="absolute top-12 -right-8 p-9 h-full text-red"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="5" fill="currentColor" />
            <rect x="5" y="3" width="2" height="4.5" rx="1" fill="white" />
            <rect x="5" y="8.5" width="2" height="2" rx="1" fill="white" />
          </svg>
        )}
      </div>

      {error && (
        <div className="flex justify-end mt-1">
          <strong className="text-xs text-red">{error}</strong>
        </div>
      )}
    </div>
  );
}

function Form() {
  const history = useHistory();

  const [field, setField] = useState({
    id: "originalURL",
    label: "Enter the long URL",
    error: false,
    errorMsg: "URL cannot be empty",
  });

  function onSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());

    if (data.originalURL.length === 0) {
      setField((field) => ({
        ...field,
        error: true,
      }));
    } else {
      // Send Post request to backend
      try {
        const response = await axios("http://localhost:5000/api/short", {
          headers: { "content-type": "application/json" },
          method: "POST",
          data: data.originalURL,
        });

        if (response.status === 200 || response.status === 201) {
          try {
            const shortResponse = await axios(
              "http://localhost:5000/api/short/:hash",
              {
                headers: { "content-type": "application/json" },
                method: "GET",
              }
            );
            if (response.status === 200 || response.status === 201) {
              let short = response.data.data.shortUrl;
              history.push("/result", { data: short });
            }
          } catch (error) {
            if (error.response) {
              console.log(error.response.data);
            } else {
              console.log("Error", error.message);
            }
            console.log(error);
          }
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log("Error", error.message);
        }
        console.log(error);
      }
    }
  }

  return (
    <form className="space-y-8 lg:p-6 bg-white" onSubmit={onSubmit}>
      <Input
        type="url"
        id={field.id}
        label={field.label}
        error={field.error && field.errorMsg}
      />

      <Button className="bg-green text-white">Make BurgerURL</Button>

      <p className="text-xs text-blue-grayish text-center px-4">
        By clicking the button, you are agreeing to our{" "}
        <a href="#" className="text-red font-bold">
          Terms and Services and Use of Cookies.
        </a>
      </p>
    </form>
  );
}

export default Form;
