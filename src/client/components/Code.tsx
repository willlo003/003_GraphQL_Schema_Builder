import React, { useEffect } from "react";

type ChildProps = {
  data: any;
  // schema: string[],
  // sendSchema: any
};

const Code: React.FC<ChildProps> = ({
  data,
  // schema,
  // sendSchema
}) => {
  // useEffect(() => {
  //   //   // let height = `${document.querySelector(".board").clientHeight}px`;
  //   //   // document.querySelector("textarea").style.height = height;
  // }, [data]);

  return (
    <div className="code">
      <textarea className="textarea"></textarea>
    </div>
  );
};

export default Code;
