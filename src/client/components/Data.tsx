import React from "react";
import { useEffect } from "react";

type ChildProps = {
    // onClick?:(val: string) => void,
    data: object,
    dragStart: any,
    dragEnd: any,
    dragOver: any,
    dragEnter: any,
    dragLeave1: any,
    drop1: any
  };

const Data: React.FC<ChildProps> = ({
    data,
    dragStart,
    dragEnd,
    dragOver,
    dragEnter,
    dragLeave1,
    drop1
}) => {
    if(data !== undefined){
        let keys = Object.keys(data)
        let values = Object.values(data)
        let board = document.getElementsByClassName("data-list")
        board[0].innerHTML = '';
        board[0].addEventListener("dragover", dragOver)
        board[0].addEventListener("dragenter", dragEnter)
        board[0].addEventListener("dragleave", dragLeave1)
        board[0].addEventListener("drop", drop1)

        for (var i = 0; i < keys.length; i++) {
            let pair = document.createElement('div')
            pair.className = "pair"
            let key = document.createElement("button");
            key.textContent = keys[i]
            key.className = "key"
            key.draggable = true;
            key.addEventListener("dragstart", dragStart)
            key.addEventListener("dragend", dragEnd)
            let value = document.createElement("p");
            value.textContent = values[i].toString().replaceAll(',', '\r\n')
            value.className = "value"
            
            key.onclick = (e) => {
                console.log(e.target)
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

    // useEffect(() => {
        // let cards = document.getElementsByClassName("key")
        // let dragItem;
        // let width;
        // let board = document.getElementsByClassName("drop-board-0")
        // let dataList = document.getElementsByClassName("data-list")

    
        // for (let i = 0; i < cards.length; i++) {
        //     cards[i].addEventListener("dragstart", dragStart)
        //     cards[i].addEventListener("dragend", dragEnd)
        //     cards[i].addEventListener("click", ()=>{console.log("sorry")})
        // }
        
        // board[0].addEventListener("dragover", dragOver)
        // board[0].addEventListener("dragenter", dragEnter)
        // board[0].addEventListener("dragleave", dragLeave)
        // board[0].addEventListener("drop", drop)

        // dataList[0].addEventListener("dragover", dragOver)
        // dataList[0].addEventListener("dragenter", dragEnter)
        // dataList[0].addEventListener("dragleave", dragLeave1)
        // dataList[0].addEventListener("drop", drop1)

        // function dragStart(){
        //     dragItem = this
        //     width = this.clientWidth
        //     dragItem.client = width
        //     setTimeout(() => this.style.display ="none", 0)
        // }
    
        // function dragEnd(){
        //     setTimeout(() => this.style.display ="block", 0)
        // }

        // function dragOver(e){
        //     e.preventDefault()
        //     this.style.backgroundColor = "#7db2b9a9"
        // }

        // function dragEnter(e){
        //     e.preventDefault()
        // }

        // function dragLeave(){
        //     this.style.backgroundColor = "#436e747c"
        // }

        // function drop(){
        //     if(dragItem !== undefined){
        //         this.append(dragItem)
        //     this.style.backgroundColor = "#436e747c"
        //     }
        // }

        // function dragLeave1(){
        //     this.style.backgroundColor = "#00b4cca9"
        // }

        // function drop1(){
        //     if(dragItem !== undefined){
        //         this.append(dragItem)
        //     this.style.backgroundColor = "#00b4cca9"
        //     }
        // }
    // }, [data])
    

    return (
            <div className="data-list"></div>
    )
}

export default Data;