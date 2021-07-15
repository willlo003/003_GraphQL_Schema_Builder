import React, { useState } from "react";


const Input: React.FC = () => {

    const [link, setLink] = useState()
    const [click, setClick] = useState(false)

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
                    pair.className = "pair"
                    let key = document.createElement("button");
                    key.textContent = keys[i]
                    key.className = "key"
                    let value = document.createElement("p");
                    value.textContent = values[i].toString().replaceAll(',', '\r\n')
                    value.className = "value"

                    key.onclick = () => {
                        // if(click===false ) {
                            if (value.style.visibility === "visible") {
                                value.style.visibility = "hidden"
                                key.style.backgroundColor = "#1f383b"
                            } else {
                                value.style.visibility = "visible"
                                key.style.backgroundColor = "orange"
                            }
                        // }
                    }

                    board[0].appendChild(pair);
                    pair.append(key)
                    pair.append(value)
                }
            })
            .catch((err) => console.log("error"));
    }

    function changing(e) {
        setLink(e.target.value)
    }
    return (
        <div>
            {/* <div className="wrap"> */}
            <div className="fetching">
            <br></br>
            <input placeholder="please plaste the link for fetching" className="api-fetching" onChange={changing}></input>
            <button onClick={fetching} className="fetchButton"> Send</button>
        </div>
            {/* </div> */}
    
        <div className="data-list"></div>
        </div>
    )
}
export default Input;