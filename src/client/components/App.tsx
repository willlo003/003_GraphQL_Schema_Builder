import React from "react";
import Api from "./Api"
import Data from "./Data";
import Code from "./Code";
import Board from "./Board";
import { BrowserRouter as Router, Route } from "react-router-dom";
const createHistory = require("history").createBrowserHistory

const App: React.FC = () => {

    const [link, setLink] = React.useState<string>('');
    const [data, setData] = React.useState<object>();
    // const [schema, setSchema] = React.useState<string[]>([])

    const history = createHistory();
    let schema:string[] = []
    let dragItem;
    let schemaMethod: string = '';
    let head: string = `const express = require("express-graphql").graphqlHTTP;\nconst {\n\tGraphQLSchema,\n\tGraphQLObjectType,\n\tGraphQLString,\n\tGraphQLList,\n\tGraphQLNonNull,\n\tGraphQLInt,\n} = require("graphql");`;
    let schemaCode: string = `\n\nconst schema = new GraphQLSchema({\n ${schemaMethod}\n})`;
    let code: string
    let root: string
    let db: string = `\n\nconst db = \'${link}\';`

    function dragStart(){
        dragItem = this
        // console.log("dragStart", dragItem)
        setTimeout(() => this.style.display ="none", 0)
    }

    function dragEnd(){
        // console.log("dragEnd", dragItem)
        setTimeout(() => this.style.display ="block", 0)
    }

    function dragOver(e){
        e.preventDefault()
        // console.log("dragOver", dragItem)
        this.style.backgroundColor = "#7db2b9a9"
    }

    function dragEnter(e){
        e.preventDefault()
        // console.log("dragEnter", dragItem)
    }

    function dragLeave(){
        // console.log("dragLeave", dragItem)
        this.style.backgroundColor = "#436e747c"
    }

    function drop(){
        this.append(dragItem)
        this.style.backgroundColor = "#436e747c"
        // console.log(schema, this.className)
        if (this.children.length !== 0){
            if(!schema.includes(this.className)){
                schema.push(this.className)
                updateCode(schema)
            }
        // } else {
            // schema = schema.slice(0, schema.indexOf(this.className)).concat(schema.slice(schema.indexOf(this.className) + 1))
        }
    }

    function dragLeave1(){
        this.style.backgroundColor = "#00b4cca9"
    }

    function drop1(){
        this.append(dragItem)
        this.style.backgroundColor = "#00b4cca9"
        if (document.getElementById('drop-board-0').children.length === 1) {
            schema = schema.slice(0, schema.indexOf("Query")).concat(schema.slice(schema.indexOf("Query") + 1))
        } 
        if (document.getElementById('drop-board-1').children.length === 1) {
            schema = schema.slice(0, schema.indexOf("Mutation")).concat(schema.slice(schema.indexOf("Mutation") + 1))
        } 
        updateCode(schema)
    }

    function updateCode(newSchema){
        schemaMethod = ''
        root = ''
        newSchema.forEach((e) => {
          if(e === "Query"){
            schemaMethod += '\n\tquery: RootQueryType,'
            root += "\n\nconst RootQueryType = new GraphQLObjectType({\n});"
          } else {
            schemaMethod += '\n\tmutation: RootMutationType,'
            root += "\n\nconst RootMutationType = new GraphQLObjectType({\n});"
          }
        })
        schemaCode = `\n\nconst schema = new GraphQLSchema({ ${schemaMethod}\n});`;

        code = head + db + root + schemaCode;

        if(data !== undefined) {
          document.getElementById('textarea').textContent = code
        }
      }
    
      function sendSchema(e){
        let newCode = { code: document.getElementById("textarea").value }
        const body = { newCode }
        fetch("/test", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(body),  
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            history.push('/graphql');
            history.go(0)
        })
        .catch((err) => console.log("get schema error"));
      }

    return (
        <Router>
                  <Route exact path="/">
                    <div>
                        <Api link={link} setLink={setLink} setData={setData}/>
                        <div className="content">
                            <Data data={data} dragStart={dragStart} dragEnd={dragEnd} dragOver={dragOver} dragEnter={dragEnter} dragLeave1={dragLeave1} drop1={drop1} />
                            <Board data={data} schema={schema} dragOver={dragOver} dragEnter={dragEnter} dragLeave={dragLeave} drop={drop}/>
                            <Code data={data} schema={schema} sendSchema={sendSchema}/>
                         </div>
                    </div>
                </Route>
                <Route exact path="/graphql" >
                </Route>          
        </Router>
    )
}

export default App;