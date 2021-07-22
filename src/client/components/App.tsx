import React from "react";
import Api from "./Api"
import Data from "./Data";
import Code from "./Code";
import Board from "./Board";
import { useEffect } from "react";

const App: React.FC = () => {

    const [link, setLink] = React.useState<string>('');
    const [data, setData] = React.useState<object>();
    // const [schema, setSchema] = React.useState<string[]>([])

    let schema = []
    let dragItem;

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
        console.log(schema, this.className)
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
        console.log(document.getElementById('drop-board-0').children.length)
        if (document.getElementById('drop-board-0').children.length === 1) {
            schema = schema.slice(0, schema.indexOf("Query")).concat(schema.slice(schema.indexOf("Query") + 1))
        } 
        if (document.getElementById('drop-board-1').children.length === 1) {
            schema = schema.slice(0, schema.indexOf("Mutation")).concat(schema.slice(schema.indexOf("Mutation") + 1))
        } 
        console.log(schema)
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
        schemaCode = `\n\nconst schema = new GraphQLSchema({ ${schemaMethod}\n})`;
        code = head + root + schemaCode;

        if(data !== undefined) {
          document.getElementById('textarea').textContent = code
        }
      }
    
      let schemaMethod: string = '';
      let head: string = `const express = require("express-graphql").graphqlHTTP;\nconst {\n\tGraphQLSchema,\n\tGraphQLObjectType,\n\tGraphQLString,\n\tGraphQLList,\n\tGraphQLNonNull,\n\tGraphQLInt,\n} = require("graphql");`;
      let schemaCode: string = `\n\nconst schema = new GraphQLSchema({\n ${schemaMethod}\n})`;
      let code: string
      let root: string

    return (
        <div>
            <Api link={link} setLink={setLink} setData={setData}/>
            <div className="content">
               <Data data={data} dragStart={dragStart} dragEnd={dragEnd} dragOver={dragOver} dragEnter={dragEnter} dragLeave1={dragLeave1} drop1={drop1} />
               <Board data={data} schema={schema} dragOver={dragOver} dragEnter={dragEnter} dragLeave={dragLeave} drop={drop}/>
               <Code data={data} schema={schema}/>
            </div>
        </div>
    )
}

export default App;