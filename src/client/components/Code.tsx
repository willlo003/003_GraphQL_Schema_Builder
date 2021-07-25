import React, { useEffect } from "react";

type ChildProps = {
    data: object,
    schema: string[],
    sendSchema: any
  };

const Code: React.FC<ChildProps> = ({
    data,
    schema,
    sendSchema
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
          {data !== undefined && <button id='test' onClick={sendSchema}>Test</button>}
      </div>
  )
}

export default Code;