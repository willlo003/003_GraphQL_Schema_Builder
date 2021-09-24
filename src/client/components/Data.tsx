import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../dnd/items";
import { useBetween } from "use-between";
import useShareableState from "../states/states";

type ChildProps = {
  // onClick?:(val: string) => void,
  data: any;
  datatIdCount: number;
  dataKey: any;
  id: number;
};

const Data: React.FC<ChildProps> = ({ data, dataKey, id, datatIdCount }) => {
  console.log("Data rendering", datatIdCount);
  // const { datatIdCount } = useBetween(useShareableState);

  const [content, setContent] = React.useState<string>("");

  // create the data cards
  useEffect(() => {
    let contentString: string = "";
    if (typeof data[dataKey] === "object") {
      for (const subKey in data[dataKey]) {
        contentString += `${subKey}: ${data[dataKey][subKey]}\r\n`;
      }
    } else {
      contentString += data[dataKey].toString().replaceAll(",", "\r\n");
    }

    setContent(contentString);
  }, [data]);

  //onClick function
  function onClick(e: any) {
    let key = e.target;
    let child = e.target.children[0];
    if (child.style.visibility === "visible") {
      child.style.visibility = "hidden";
      key.style.backgroundColor = "#81818180";
    } else {
      child.style.visibility = "visible";
      key.style.backgroundColor = "orange";
    }
  }

  const [, drag] = useDrag({
    type: ItemTypes.DATA,
    item: () => ({ id: `data${id}`, key: `${dataKey}` }),
  });

  return (
    <div className="pair">
      <button
        className="key"
        onClick={onClick}
        id={`data${id}${datatIdCount}`}
        ref={drag}
      >
        {dataKey}
        <p className="value">{content}</p>
      </button>
    </div>
  );
};

export default Data;
