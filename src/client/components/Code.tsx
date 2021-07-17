import React from "react";

type ChildProps = {
    // onClick?:(val: string) => void,
    entryPoint?:(val: undefined) => void,
  };

const Code: React.FC<ChildProps> = ({
    entryPoint
}) => {

    let code: string = '';
    let schema: string = '';
    let padding: object = {
        padding: "0px"
    }
    
    if(entryPoint !== undefined){
        code = `${entryPoint} { ${schema}\n}`
        padding = {
            padding: "10px"
        }
    }
    
    return (
        <div className="code">
           {code !== '' && <div style={padding}>{code}</div>}
        </div>
    )
}

export default Code;