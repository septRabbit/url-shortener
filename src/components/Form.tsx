import React, { ReactNode, useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  className: string;
};

function Button({ children, className }: ButtonProps) {
  return (
    <button
      aria-label="button"
      type="submit"
      className={clsx(
        "rounded w-full transform-colors duration-500",
        className
      )}
    >
      {children}
    </button>
  );
}

type InputProps = {
  id: string;
  label: string;
  type: string;
  error: string | boolean;
};

function Input({ id, label, type = "text", error }: InputProps) {
  const [_value, setValue] = useState("");

  return (
    <div>
      <div className="relative flex flex-col items-center justify-start">
        <label
          htmlFor={id}
          className="flex items-center w-full p-2 my-4 text-base font-semibold text-gray-700"
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
            className="absolute h-full top-12 -right-8 p-9 text-red"
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

function Expire(data: { liveTime: string }) {
  const date = new Date(+new Date() + 8 * 3600 * 1000).getTime();
  let calculateTime = 0;
  if (data.liveTime !== "none") {
    calculateTime = date + parseInt(data.liveTime, 10) * 60 * 1000;
    const totalDate = new Date(calculateTime).toISOString();
    return totalDate;
  }
}

const has = (target: object, property: string) =>
  Object.prototype.hasOwnProperty.call(target, property);

interface Data {
  originalURL: string;
  liveTime: string;
  expiredAt?: string;
}

function checkFormData(data: unknown): data is Data {
  if (typeof data !== "object" || !data) return false;

  if (!has(data, "originalURL")) return false;

  return true;
}

function Form() {
  const history = useHistory();

  const [field, setField] = useState({
    id: "originalURL",
    label: "Enter the long URL",
    error: false,
    errorMsg: "URL cannot be empty",
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const data = Object.fromEntries(form.entries());

    if (!checkFormData(data))
      throw new Error(`form data should include originalURL`);

    const sendData = {
      url: data.originalURL,
      expireAt: data.liveTime !== "none" ? Expire(data) : undefined,
    };

    if (sendData.url.length === 0) {
      setField((field) => ({
        ...field,
        error: true,
      }));

      return;
    }

    // Send Post request to backend
    try {
      const response = await axios("https://miu.services/backend/api/short", {
        // const response = await axios('http://localhost:5000/api/short', {
        headers: { "content-type": "application/json" },
        method: "POST",
        data: sendData,
      });

      if (response.status > 400)
        throw new Error(`networking error ${response.statusText}`);

      const data = response.data.shortUrl;
      if (typeof data === "string") {
        history.push("/result", { data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="p-4 space-y-8 bg-white rounded-lg shadow-lg lg:p-6"
      onSubmit={onSubmit}
    >
      <Input
        type="url"
        id={field.id}
        label={field.label}
        error={field.error && field.errorMsg}
      />

      <div className="flex items-center justify-between">
        <label htmlFor="Url-live-time">
          URL Live Time:
          <select
            className="flex-1 p-2 ml-4 text-blue-600 border border-blue-600 rounded"
            name="liveTime"
            id="liveTime"
          >
            <option value="none">None</option>
            <option value="30">30 min</option>
            <option value="60">1 hr</option>
            <option value="240">4 hrs</option>
            <option value="480">8 hrs</option>
            <option value="3600">1 day</option>
            <option value="25200">7 days</option>
          </select>
        </label>
      </div>

      <Button className="p-2 text-white bg-green shadow-solid active:shadow-none active:bg-green-700 hover:bg-green-600">
        Make μRL
      </Button>

      <p className="px-4 text-xs text-center text-blue-grayish">
        By clicking the button, you are agreeing to our{" "}
        <a href="/" className="font-bold text-red">
          Terms and Services and Use of Cookies.
        </a>
      </p>
    </form>
  );
}

export default Form;
