import React, { useEffect } from "react";
import useShareableState from "../states/states";
import { useBetween } from "use-between";
import { useCallback } from "react";
import { match } from "assert/strict";

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
  const {
    connectedPair,
    matched,
    rootQueryCards,
    typeQueryCards,
    rootMutationCards,
  } = useBetween(useShareableState);

  // useEffect(() => {
  //   console.log("in coding", connectedPair, relaventContent);
  // }, [connectedPair.length]);

  let code: string = "",
    typeCodes: string = "",
    rootQueryCode: string = "",
    rootMutationCode: string = "",
    rootQueryField: string = "",
    rootMutationField: string = "",
    typeQueryField: string = "",
    typeMutationField: string = "";
  let appUse: string =
    '\n\napp.use("/graphql", expressGraphQL({\n\tschema: schema,\n\tgraphiql: true,\n}))';
  let heading: string = `const {\n\tGraphQLSchema,\n\tGraphQLObjectType,\n\tGraphQLString,\n\tGraphQLList,\n\tGraphQLNonNull,\n\tGraphQLInt,\n} = require("graphql");`;
  let schemaCode: string = `\n\nconst schema = new GraphQLSchema({ \n\tquery: RootQueryType,\n\tmutation: RootMutationType,\n});`;

  useEffect(() => {
    if (connectedPair.length === 0) {
      let textArea: any = document.getElementById("textarea");
      textArea.textContent = "";
    } else {
      // update the schemaw code
      let textArea: any = document.getElementById("textarea");

      // get dropped and connected type, root, card for code generation
      // console.log(rootQueryCards, typeQueryCards, dataQueryCards, matched);

      // update the code of root
      rootQueryCards.forEach((e) => {
        if (matched.hasOwnProperty(e)) {
          rootQueryField += `\n\t\t${e}: {\n\t\t\ttype: new GraphQLList(${matched[e]}),\n\t\t\tdescription: \"List of Data\", \n\t\t\t resolve: () => data,\n\t\t},`;
        }
      });
      rootMutationCards.forEach((e) => {
        if (matched.hasOwnProperty(e)) {
          rootMutationField += `\n\t\t${e}: {\n\t\t\ttype: new GraphQLList(${matched[e]}),\n\t\t\tdescription: \"List of Data\", \n\t\t\t resolve: () => data,\n\t\t},`;
        }
      });

      rootQueryCode = `\n\nconst RootQueryType = new GraphQLObjectType({\n\tname: \"Query\",\n\tdescription: \"Root Query\",\n\tfields: () => ({${rootQueryField}\n\t}),\n});`;
      rootMutationCode = `\n\nconst RootMutationType = new GraphQLObjectType({\n\tname: \"Mutation\",\n\tdescription: \"Root Mutation\",\n\tfields: () => ({${rootMutationField}\n\t}),\n});`;

      // type code
      typeQueryCards.forEach((e) => {
        console.log("typeLoop", matched[e]);
        if (matched.hasOwnProperty(e)) {
          let typeArr: any = matched[e];
          typeArr.forEach((subE) => {
            typeQueryField += `\n\t\t${subE}: {\n\t\t\ttype: GraphQLNonNull(GraphQLString),\n\t\t},`;
          });
          typeCodes += `\n\nconst ${e} = new GraphQLObjectType({\n\tname: "Data",\n\tdescription: "",\n\tfields: (${typeQueryField}) => ({\n\t}),\n});`;
        }
      });

      // integrate all parts of code into code variable
      code =
        heading +
        typeCodes +
        rootQueryCode +
        rootMutationCode +
        schemaCode +
        appUse;

      textArea.textContent = code;
    }
  }, [connectedPair.length]);

  useEffect(() => {
    // update the schemaw code
    let textArea: any = document.getElementById("textarea");
    textArea.textContent = "";
  }, []);

  return (
    <div className="code">
      <textarea className="textarea" id="textarea"></textarea>
    </div>
  );
};

export default Code;
