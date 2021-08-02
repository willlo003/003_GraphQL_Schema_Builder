import React from "react";
import Api from "./Api"
import Data from "./Data";
import Code from "./Code";
import Board from "./Board";
import Bin from "./Bin";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "http2";
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
    let leftCount = 0;
    let rightCount = 0;

    //for connect
    let connection = [];
    let connectedPair = {};
    let tempPair = [];
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
        // console.log(dragItem.children[0])

        if(dragItem.children.length === 0){
            let left = document.createElement("button");
            left.className = "left";
            left.id = `l${leftCount}`;
            leftCount++;
            left.onclick = lineUp
            dragItem.append(left)
    
            let right = document.createElement("button");
            right.className = "right"
            right.id = `r${rightCount}`;
            rightCount++
            right.onclick = lineUp
            dragItem.append(right)
        }
        
        dragItem.style.left = e.x - 60 + "px";
        dragItem.style.top = e.y - 22 + "px";

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
        this.append(dragItem)
        if(dragItem.children[0]){
            if(dragItem.children[0].style.backgroundColor === "orange"){
                let point1 = document.getElementById(dragItem.children[0].id)
                let point2 = document.getElementById(connectedPair[dragItem.children[0].id])
                let currentLine = document.getElementById(`L${dragItem.children[0].id}`)
                currentLine.remove()
                let point1Position = point1.getBoundingClientRect()
                let point2Position = point2.getBoundingClientRect()
                linedraw(point2Position.left + 5, point2Position.top + 5, point1Position.left + 5, point1Position.top + 5, dragItem.children[0].id)
            }
            if(dragItem.children[1].style.backgroundColor === "orange"){
                let point1 = document.getElementById(dragItem.children[1].id)
                let point2 = document.getElementById(connectedPair[dragItem.children[1].id])
                let currentLine = document.getElementById(`L${connectedPair[dragItem.children[1].id]}`)
                currentLine.remove()
                let point1Position = point1.getBoundingClientRect()
                let point2Position = point2.getBoundingClientRect()
                linedraw(point2Position.left + 5, point2Position.top + 5, point1Position.left + 5, point1Position.top + 5, connectedPair[dragItem.children[1].id])
            }
        }
        dragItem = null
    }

    function updateLine(){

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

    function lineUp (){
        let position = this.getBoundingClientRect()
        let currentID = this.id
        console.log(tempPair, this.id)
        if(tempPair.length === 0 || (tempPair.length === 1 && tempPair[0][1] !== this.id[1] && tempPair[0][0] !== this.id[0])){
            if(this.style.backgroundColor === "orange"){
                this.style.backgroundColor = "white"
                if(connectedPair.hasOwnProperty(currentID)){
                    document.getElementById(connectedPair[currentID]).style.backgroundColor = "white";
                    let id = currentID[0] === 'l' ? currentID : [connectedPair[currentID]];
                    delete connectedPair[connectedPair[currentID]]
                    delete connectedPair[currentID]
                    document.getElementById(`L${id}`).remove();
                    // console.log("you got it", connectedPair, tempPair)
                }
            } else {
                this.style.backgroundColor = "orange"
                let eventX = position.left
                let eventY = position.top
                // connect(eventX, eventY)
                
                connection.push(eventX)
                connection.push(eventY)
                
                tempPair.push(currentID)
                if(tempPair.length === 2){
                    let lineID = tempPair.filter(e => e[0] === 'l')[0]
                    console.log(lineID)
                    connectedPair[tempPair[0]] = tempPair[1]
                    connectedPair[tempPair[1]] = tempPair[0]
                    linedraw(connection[0] + 5, connection[1] + 5, connection[2] + 5, connection[3] + 5, lineID)
                    tempPair = [];
                    connection = [];
                }
                console.log(connectedPair)
            }
        }
    }

    function linedraw(x1, y1, x2, y2, id) {
        if (x2 < x1) {
            var tmp;
            tmp = x2 ; x2 = x1 ; x1 = tmp;
            tmp = y2 ; y2 = y1 ; y1 = tmp;
        }
    
        var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var m = (y2 - y1) / (x2 - x1);
    
        var degree = Math.atan(m) * 180 / Math.PI;
        
        const line = document.createElement('div')
        line.className = 'line';
        line.id = `L${id}`
        line.style.transform = `rotate(${degree}deg)`;
        line.style.width = `${lineLength}px`;
        line.style.top = `${y1}px`;
        line.style.left = `${x1}px`;
        document.body.append(line)
    }

    // function connect(x, y){
    //     connection.push(x)
    //     connection.push(y)
    //     if(connection.length === 4){
    //         linedraw(connection[0] + 5, connection[1] + 5, connection[2] + 5, connection[3] + 5)
    //         // let line = document.createElement("line")
    //         // document.body.append(line)
    //         // console.log(line.style)
    //         // line.x1 = connection[0]
    //         // line.y1 = connection[1]
    //         // line.x2 = connection[2]
    //         // line.y2 = connection[3]
    //         connection = []
    //     }
    // }

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