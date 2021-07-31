import React, { useEffect } from "react";

type ChildProps = {
    dragOver2: any,
    dragEnter2: any,
    dragLeave2: any,
    drop2: any,
    data: object
};

const Bin: React.FC<ChildProps> = ({
    dragOver2,
    dragEnter2,
    dragLeave2,
    drop2,
    data

}) => {
    useEffect(() => {
        if(data !== undefined){
            const bin = document.getElementById('bin')
            console.log("bin", bin)
            bin.addEventListener("dragover", dragOver2)
            bin.addEventListener("dragenter", dragEnter2)
            bin.addEventListener("dragleave", dragLeave2)
            bin.addEventListener("drop", drop2)
        }
    }, [data])


    return (
        <div id="bin"></div>
    )
}

export default Bin;