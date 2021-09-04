import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function clsx(...className) {
  return className.filter(Boolean).join(" ");
}

function Button({ children, className }) {
  return (
    <button className={clsx("p-4 rounded shadow-solid w-full", className)}>
      {children}
    </button>
  );
}

function Input({ id, label, type = "text", error }) {
  const [_value, setValue] = useState("");

  return (
    <div>
      <div className="relative flex justify-start items-center">
        <input
          type={type}
          id={id}
          name={id}
          className={clsx(
            "w-full p-4 rounded peer",
            !error ? "border" : "border-2 border-red"
          )}
          value={_value}
          onChange={(e) => setValue(e.target.value)}
        />

        <label
          htmlFor={id}
          className={clsx(
            "absolute p-4 w-full h-full",
            "flex items-center",
            "text-sm font-semibold",
            "peer-focus:opacity-0",
            _value && "opacity-0",
            !error ? "text-blue-dark opacity-75" : "text-red"
          )}
        >
          {label}
        </label>

        {error && (
          <svg
            className="absolute right-0 p-4 h-full text-red"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="currentColor" />
            <rect x="11" y="6" width="2" height="9" rx="1" fill="white" />
            <rect x="11" y="17" width="2" height="2" rx="1" fill="white" />
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
    id: "url",
    label: "Enter the long URL",
    error: false,
    errorMsg: "URL cannot be empty",
  });

  function onSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());

    if (data.url.length === 0) {
      setField((field) => ({
        ...field,
        error: true,
      }));
    } else {
      history.push("/result", { data: data });
    }
  }

  return (
    <form className="space-y-4 lg:p-6" onSubmit={onSubmit}>
      <Input
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
