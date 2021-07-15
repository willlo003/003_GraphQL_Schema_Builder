import React, { useState } from "react";


const Input: React.FC = () => {

    const [link, setLink] = useState()
    const [data, setData] = useState([])

    function fetching() {
        console.log("start fetching")
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
                let keys = Object.keys(data)
                let values = Object.values(data)
                let board = document.getElementsByClassName("data-list")
                board[0].innerHTML = '';
                for (var i = 0; i < keys.length; i++) {
                    let pair = document.createElement('div')
                    pair.className = `pair${i}`
                    let key = document.createElement("button");
                    key.textContent = keys[i]
                    let value = document.createElement("p");
                    value.textContent = values[i].toString()

                    key.onclick = () => {
                        if (value.style.display === "none") {
                            value.style.display = "block"
                        } else {

                            value.style.display = "none"

                        }
                    }

                    board[0].appendChild(pair);
                    pair.append(key)
                    pair.append(value)
                    value.style.display = "none"

                }
            })
            .catch((err) => console.log("error"));
    }

    function changing(e) {
        setLink(e.target.value)
    }
    return (
        <div className="api-fetching">
            <label>GraphQL Root Fetching</label>
            <br></br>
            <input placeholder="please plaste the link for fetching" onChange={changing}></input>
            <br></br>
            <button onClick={fetching} > Send</button>
            <div className="data-list"></div>
        </div>
    )
}
export default Input;