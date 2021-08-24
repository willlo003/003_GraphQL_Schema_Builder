import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../dnd/items";

type ChildProps = {
  // onClick?:(val: string) => void,
  data: any;
  // dragStart: any,
  dataKey: any;
  id: number;
};

const Data: React.FC<ChildProps> = ({
  data,
  dataKey,
  id,
  // dragStart,
}) => {
  const [content, setContent] = React.useState<string>("");

  // create the data cards
  useEffect(() => {
    let contentStrin: string = "";
    if (typeof data[dataKey] === "object") {
      for (const subKey in data[dataKey]) {
        contentStrin += `${subKey}: ${data[dataKey][subKey]}\r\n`;
      }
    } else {
      contentStrin += data[dataKey].toString().replaceAll(",", "\r\n");
    }

    setContent(contentStrin);
  }, [data]);

  //onClick function
  function onClick(e: any) {
    let key = e.target;
    let child = e.target.children[0];
    if (child.style.visibility === "visible") {
      child.style.visibility = "hidden";
      key.style.backgroundColor = "#1f383b";
    } else {
      child.style.visibility = "visible";
      key.style.backgroundColor = "orange";
    }
  }

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.DATA,
    item: () => ({ id: `data${id}`, key: `${dataKey}` }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  return (
    <div className="pair">
      <button className="key" onClick={onClick} id={`data${id}`} ref={drag}>
        {dataKey}
        <p className="value">{content}</p>
      </button>
    </div>
  );
};

export default Data;
