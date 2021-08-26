import React from "react";
import { useEffect } from "react";

type ChildProps = {
  setLink: any;
  link: string;
  setData: any;
};

const Input: React.FC<ChildProps> = ({ setLink, link, setData }) => {
  //listen input onChange
  function changing(e: any) {
    setLink(e.target.value);
  }

  //fetch data
  function fetching() {
    const body = { link };
    fetch("/fetching", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
        Accept: "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log("error"));
  }

  return (
    <div>
      <div className="fetching">
        <br></br>
        <input
          placeholder="please plaste the link for fetching"
          className="api-fetching"
          onChange={changing}
        ></input>
        <button onClick={fetching} className="fetchButton">
          {" "}
          Send
        </button>
      </div>
    </div>
  );
};
export default Input;
