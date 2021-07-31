import React from "react";
import Api from "./Api"
import Data from "./Data";
import Code from "./Code";
import Board from "./Board";
import Bin from "./Bin";
import { BrowserRouter as Router, Route } from "react-router-dom";
const createHistory = require("history").createBrowserHistory

const App: React.FC = () => {

    const [link, setLink] = React.useState<string>('');
    const [data, setData] = React.useState<object>();
    // const [schema, setSchema] = React.useState<string[]>([])

    const history = createHistory();

    //for code gen
    let query = []
    let schema:string[] = []
    let dragItem;
    let schemaMethod: string = '';
    let head: string = `const {\n\tGraphQLSchema,\n\tGraphQLObjectType,\n\tGraphQLString,\n\tGraphQLList,\n\tGraphQLNonNull,\n\tGraphQLInt,\n} = require("graphql");`;
    let schemaCode: string = `\n\nconst schema = new GraphQLSchema({\n ${schemaMethod}\n})`;
    let code: string
    let root: string
    let db: string = `\n\nconst db = \'${link}\';`
    let rootQueryField;
    let rootQueryMethod;
    let app =  '\n\napp.use(\"/graphql\", expressGraphQL({\n\tschema: schema,\n\tgraphiql: true,\n}))'
    let type = '\n\nconst Type = new GraphQLObjectType({\n\tname: "data",\n\tdescription: "This represents a book written by an author",\n\tfields: () => ({\n\t\tmotd: {\n\t\t\ttype: GraphQLNonNull(GraphQLString),\n\t\t},\n\t}),\n});'
    
    //bin

    function dragStart(){
        if(this.parentElement.className === "pair"){
            dragItem = this.cloneNode(true)
        } else {
            dragItem = this
        }
    }

    function dragStart1(){
        if(this.parentElement.className === "toolBoard"){
            dragItem = this.cloneNode(true)
        } else {
            dragItem = this
        }
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

    function drop(e){
        this.append(dragItem)
        dragItem.style.left = e.x - 60 + "px";
        dragItem.style.top = e.y + "px";

        let index = query.indexOf(dragItem.textContent)
        query = query.slice(0, index).concat(query.slice(index + 1))

        this.style.backgroundColor = "#436e747c"
        if(dragItem.textContent === "Type"){
            dragItem.addEventListener("dragstart", dragStart1)
        } else {
            dragItem.addEventListener("dragstart", dragStart)
            query.push(dragItem.textContent)
            if (this.children.length !== 0){
                if(!schema.includes(this.className)){
                    schema.push(this.className)
                }
                updateCode(schema)
            }
        }
        dragItem = null
    }

    function updateCode(newSchema){
        // console.log("query", query)
        schemaMethod = '';
        root = '';
        rootQueryField = '';
        if (query.length !== 0) {
            query.forEach(e => {
                rootQueryField += `\n\t\t${e}: {\n\t\t\ttype: new GraphQLList(Type),\n\t\t\tdescription: \"List of Data\", \n\t\t\t resolve: () => data,\n\t\t},` 
            })
            rootQueryMethod = `\n\tname: \"Query\",\n\tdescription: \"Root Query\",\n\tfields: () => ({${rootQueryField}\n\t}),`
        }
        newSchema.forEach((e) => {
          if(e === "Query"){
            schemaMethod += '\n\tquery: RootQueryType,'
            root += `\n\nconst RootQueryType = new GraphQLObjectType({${rootQueryMethod}\n});`
          } else {
            schemaMethod += '\n\tmutation: RootMutationType,'
            root += "\n\nconst RootMutationType = new GraphQLObjectType({\n});"
          }
        })
        schemaCode = `\n\nconst schema = new GraphQLSchema({ ${schemaMethod}\n});`;

        code = head + type + root + schemaCode + app;

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
            history.push('/graphql');
            history.go(0)
        })
        .catch((err) => console.log("get schema error"));
      }


    function dragOver2(e){
        e.preventDefault()
        this.style.backgroundSize = '60px'
    }

    function dragEnter2(e){
        e.preventDefault()
    }

    function dragLeave2(){
        this.style.backgroundSize = '50px'
    }

    function drop2(){

        let currentQuery = Object.values(document.getElementById("drop-board-0").children)
        let count = 0
        currentQuery.forEach( e => {
            if(e.textContent === dragItem.textContent){
                count++
            }
        })

        if(count === 1){
            let index = query.indexOf(dragItem.textContent)
            query = query.slice(0, index).concat(query.slice(index + 1))
        }
        console.log(count)
        
        if(dragItem.parentElement !== null){
            if(dragItem.parentElement.className === "Query"){
                dragItem.parentElement.removeChild(dragItem)
                if (document.getElementById('drop-board-0').children.length === 1) {
                    schema = schema.slice(0, schema.indexOf("Query")).concat(schema.slice(schema.indexOf("Query") + 1))
                } 
                if(query.length === 0){ schema = []}
                updateCode(schema)
            }
        }
        this.style.backgroundSize = '50px'
        // console.log(query)
    }

    return (
        <Router>
                  <Route exact path="/">
                    <div>
                        <Api link={link} setLink={setLink} setData={setData}/>
                        <div className="content">
                            <Data data={data} dragStart={dragStart}/>
                            <Board data={data} schema={schema} dragStart1={dragStart1} dragOver={dragOver} dragEnter={dragEnter} dragLeave={dragLeave} drop={drop}/>
                            <Code data={data} schema={schema} sendSchema={sendSchema}/>
                            <Bin data={data} dragOver2={dragOver2} dragEnter2={dragEnter2} dragLeave2={dragLeave2} drop2={drop2}></Bin>
                         </div>
                    </div>
                </Route>
                <Route exact path="/graphql" >
                </Route>          
        </Router>
    )
}

export default App;