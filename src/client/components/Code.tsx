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

  useEffect(() => {
    schema.forEach((e) => {
      if(e === "Query"){
        schemaMethod += '\n\tquery: RootQueryType,'
      } else {
        schemaMethod += '\n\tquery: RootMutationType,'
      }
    })
    schemaCode = `\n\nconst schema = new GraphQLSchema({ ${schemaMethod}\n})`;
    code = head + schemaCode;
    if(data !== undefined) {
      document.getElementById('textarea').textContent = code
    }
  }, [schema])

  let schemaMethod: string = '';
  let head: string = `const express = require("express-graphql").graphqlHTTP;\nconst {\n\tGraphQLSchema,\n\tGraphQLObjectType,\n\tGraphQLString,\n\tGraphQLList,\n\tGraphQLNonNull,\n\tGraphQLInt,\n} = require("graphql");`;
  let schemaCode: string = `\n\nconst schema = new GraphQLSchema({\n ${schemaMethod}\n})`;
  let code: string

  return (
      <div className="code">
          {data !== undefined && <textarea id='textarea'></textarea>}
      </div>
  )
}

export default Code;