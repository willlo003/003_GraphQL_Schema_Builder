import React from "react";

type ChildProps = {
    // onClick?:(val: string) => void,
    data?:(val: object) => void
  };

const Data: React.FC<ChildProps> = ({
    data
}) => {
    if(data !== undefined){
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
            console.log(typeof values[i])
            value.textContent = values[i].toString().replaceAll(',', '\r\n')
            value.className = "value"
            
            key.onclick = () => {
                if (value.style.visibility === "visible") {
                    value.style.visibility = "hidden"
                    key.style.backgroundColor = "#1f383b"
                } else {
                    value.style.visibility = "visible"
                    key.style.backgroundColor = "orange"
                }
            }

            board[0].appendChild(pair);
            pair.append(key)
            pair.append(value)
        }
    }

    return (
            <div className="data-list"></div>
    )
}

export default Data;