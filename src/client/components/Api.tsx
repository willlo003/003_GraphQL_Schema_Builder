import React from "react";

type ChildProps = {
    setLink: any,
    link: string,
    setData: any
  };

const Input: React.FC<ChildProps> = ({
    setLink,
    link,
    setData
  })  => {

    function fetching() {
        const body = { link }
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
                setData(data)
            })
            .catch((err) => console.log("error"));
    }

    function changing(e) {
        setLink(e.target.value);
    }

    return (
        <div>
            <div className="fetching">
                <br></br>
                <input placeholder="please plaste the link for fetching" className="api-fetching" onChange={changing}></input>
                <button onClick={fetching} className="fetchButton"> Send</button>
            </div>
        {/* <div className="data-list"></div> */}
        </div>
    )
}
export default Input;