import React, { useEffect } from "react";

type ChildProps = {
    data: object,
    schema: string[],
  };

const Code: React.FC<ChildProps> = ({
    data,
    schema,
}) => {

  useEffect(() => {
    if(data !== undefined){
        let height = `${document.querySelector(".board").clientHeight}px`
        document.querySelector("textarea").style.height = height
    }
  }, [data])

 

  return (
      <div className="code">
          {data !== undefined && <textarea id='textarea'></textarea>}
      </div>
  )
}

export default Code;