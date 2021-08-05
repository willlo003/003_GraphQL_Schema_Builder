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
    // const [query, setQuery] = React.useState([]);
    // const [schema, setSchema] = React.useState([]);
    // const [dragItem, setDragItem] = React.useState();

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
    let app = '\n\napp.use(\"/graphql\", expressGraphQL({\n\tschema: schema,\n\tgraphiql: true,\n}))';
    let type = [];
    let typeCode = '';
    let leftCount = 0;
    let rightCount = 0;
    let i, j
    let rootCount = 1;
    let typeCount = 1;
    let rootTypePair = {}
    //for connect
    let connection = [];
    let connectedPair = {};
    let tempPair = [];
    //bin

    ///////////// drag card from data list
    function dragStart(){
        if(this.parentElement.className === "pair"){
            dragItem = this.cloneNode(true);
        } else {
            dragItem = this;
        }
    }

    ///////////// drag card from toolBoard
    function dragStart1(){
        if(this.parentElement.className === "toolBoard"){
            dragItem = this.cloneNode(true);
            if(this.className === "root"){
                dragItem.children[0].value = `${this.children[0].value}${rootCount}`;
                rootCount++;
            } else {
                dragItem.children[0].value = `${this.children[0].value}${typeCount}`;
                typeCount++;
            }
        } else {
            dragItem = this
        }
    }

    ///////////// drag and drop on query board
    function dragOver(e){
        e.preventDefault()
        this.style.backgroundColor = "#7db2b9a9"
    }

    function dragEnter(e){
        e.preventDefault()
    }

    function dragLeave(){
        this.style.backgroundColor = "#436e747c"
    }


    function drop(e){
        /////////// add left and right to connect the cards
        if(dragItem.children.length === 1 || dragItem.children.length === 0){
            let left = document.createElement("button");
            left.className = "left";
            left.id = `l${leftCount}`;
            leftCount++;
            left.onclick = lineUp
            if(dragItem.className === "root"){
                left.style.display = "none"
            }
            dragItem.append(left)
            
            let right = document.createElement("button");
            right.className = "right"
            right.id = `r${rightCount}`;
            rightCount++
            right.onclick = lineUp
            dragItem.append(right)
        }
        
        //////////adjust the position
        dragItem.style.left = e.x - 60 + "px";
        dragItem.style.top = e.y - 22 + "px";

        // if(dragItem.textContent !== "Type"){
        //     let index = query.indexOf(dragItem.textContent)
        //     query.splice(index, 1)
        // }

        //////////append the dragItem
        if(dragItem.className === "root"){
            dragItem.addEventListener("dragstart", dragStart)
            
            //add new root 
            if(dragItem.parentElement === null){
                query.push(dragItem.children[0].value)
            }

            //assign onchange function to the root card
            let queryInd = query.indexOf(dragItem.children[0].value)
            dragItem.children[0].onchange = function(e){
                if( rootTypePair.hasOwnProperty(query[queryInd])){
                    let value = rootTypePair[query[queryInd]]
                    delete rootTypePair[query[queryInd]]
                    rootTypePair[e.target.value] = value
                }
                query[queryInd] = e.target.value
                updateCode(schema)
            }

            //when no any root, even no query
            if (this.children.length !== 0){
                if(!schema.includes(this.className)){
                    schema.push(this.className)
                }
                updateCode(schema)
            }
        } else {
            dragItem.addEventListener("dragstart", dragStart1)
        }

        this.append(dragItem)

        ///////// update the connected line
        if(dragItem.className === "key"){
            i = 0;
            j = 1;
        } else {
            i = 1;
            j = 2;
        }

        let leftButton = dragItem.children[i];
        let rightButton = dragItem.children[j];

        if(leftButton){
            //check whether connected, left
            if(leftButton.style.backgroundColor === "orange"){
                //find two buttons 
                let point1 = document.getElementById(leftButton.id)
                let point2 = document.getElementById(connectedPair[leftButton.id])
                //remove the line
                let currentLine = document.getElementById(`L${leftButton.id}`)
                currentLine.remove()
                //assign the new position of the line
                let point1Position = point1.getBoundingClientRect()
                let point2Position = point2.getBoundingClientRect()
                linedraw(point2Position.left + 5, point2Position.top + 5, point1Position.left + 5, point1Position.top + 5, dragItem.children[i].id)
            }
            //check whether connected, right
            if(rightButton.style.backgroundColor === "orange"){
                //find two buttons 
                let point1 = document.getElementById(rightButton.id)
                let point2 = document.getElementById(connectedPair[rightButton.id])
                //remove the line
                let currentLine = document.getElementById(`L${connectedPair[rightButton.id]}`)
                currentLine.remove()
                //assign the new position of the line
                let point1Position = point1.getBoundingClientRect()
                let point2Position = point2.getBoundingClientRect()
                linedraw(point2Position.left + 5, point2Position.top + 5, point1Position.left + 5, point1Position.top + 5, connectedPair[dragItem.children[j].id])
            }
        }

        this.style.backgroundColor = "#436e747c"
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
        //when throw the root card, update the query array
        if(dragItem.className === "root"){
            let index = query.indexOf(dragItem.children[0].value)
            query.splice(index, 1)
            if(query.length === 0){ schema = []}
        }

        if(dragItem.className === "key"){
            i = 0;
            j = 1;
        } else {
            i = 1;
            j = 2;
        }

        let leftChild = dragItem.children[i]
        let rightChild = dragItem.children[j]
        

        ///////////here Edit

        if(leftChild.style.backgroundColor === "orange"){
            //remove the line
            document.getElementById(`L${leftChild.id}`).remove() ;
            //turn ligth to white if connected
            document.getElementById(connectedPair[leftChild.id]).style.backgroundColor = "white";
            //check the card whether type
            if(dragItem.className === "type"){
                let typeTextContext = dragItem.children[0].value
                let ind = type.indexOf(typeTextContext)
                type = type.slice(i, ind).concat(type.slice(ind + 1))
                
                let findTypeKey
                for (let key in rootTypePair){
                    if (rootTypePair[key] === typeTextContext){
                        findTypeKey = key
                    }
                }
                
                delete rootTypePair[findTypeKey]
            }
            // let textContent = document.getElementById(leftChild.id).parentElement.className === 'type' ? document.getElementById(leftChild.id).parentElement.children[0].value : document.getElementById(connectedPair[leftChild.id]).parentElement.children[0].value;
            // let ind = type.indexOf(textContent)
            delete connectedPair[connectedPair[leftChild.id]]
            delete connectedPair[leftChild.id]
        }
        if(rightChild.style.backgroundColor === "orange"){
            document.getElementById(connectedPair[rightChild.id]).style.backgroundColor = "white";

            let textContent = document.getElementById(rightChild.id).parentElement.className === 'type' ? document.getElementById(rightChild.id).parentElement.children[0].value : document.getElementById(connectedPair[rightChild.id]).parentElement.children[0].value;
            let ind = type.indexOf(textContent)
            type = type.slice(j, ind).concat(type.slice(ind + 1))
            delete connectedPair[connectedPair[rightChild.id]]
            delete connectedPair[rightChild.id]
        }

        if(dragItem.parentElement !== null){
            if(dragItem.parentElement.className === "Query"){
                dragItem.parentElement.removeChild(dragItem)
                // if (document.getElementById('drop-board-0').children.length === 1) {
                //     index = schema.indexOf(dragItem.textContent)
                //     schema.splice(index, 1)
                // } 
            }
        }
        
        this.style.backgroundSize = '50px'
        updateCode(schema)
    }

    //when the card connect
    function lineUp (){
        let position = this.getBoundingClientRect()
        let currentID = this.id
        if(tempPair.length === 0 || (tempPair.length === 1 && tempPair[0][1] !== currentID[1] && tempPair[0][0] !== currentID[0])|| (tempPair.length === 1 && tempPair[0]===currentID)){
            if(this.style.backgroundColor === "orange"){
                if(connectedPair.hasOwnProperty(currentID)){
                    let leftId = currentID[0] === 'l' ? currentID : [connectedPair[currentID]];
                    let rightId = currentID[0] === 'r' ? currentID : [connectedPair[currentID]];

                    let leftParent = document.getElementById(leftId).parentElement
                    let rightParent = document.getElementById(rightId).parentElement;
                    let typeParent = undefined;
                    let rootParent = undefined;
                    //find the parent is type
                    if (leftParent.className === "type"){
                        typeParent = leftParent
                    } else if (rightParent.className === "type"){
                        typeParent = rightParent
                    }

                    //find the parent is root
                    if (leftParent.className === "root"){
                        rootParent = leftParent
                    } else if (rightParent.className === "root"){
                        rootParent = rightParent
                    }
                    //turn to white color
                    document.getElementById(leftId).style.backgroundColor = "white";
                    document.getElementById(rightId).style.backgroundColor = "white";

                    //delete the rootTypePair
                    delete rootTypePair[rootParent.children[0].value]

                    //delete the element in type array
                    if(typeParent !== undefined){
                        let ind = type.indexOf(typeParent.children[0].value)
                        type = type.slice(0, ind).concat(type.slice(ind + 1))
                        delete rootTypePair[typeParent.children[0].value]
                    }

                    updateCode(schema)

                    //delete the connected pair
                    delete connectedPair[leftId]
                    delete connectedPair[rightId]

                    //remove the line
                    document.getElementById(`L${leftId}`).remove();
                } else {
                    this.style.backgroundColor = "white";
                    tempPair = [];
                }
            } else {
                this.style.backgroundColor = "orange"

                //find the position to connect
                let eventX = position.left
                let eventY = position.top
                
                connection.push(eventX)
                connection.push(eventY)
                
                tempPair.push(currentID)
                if(tempPair.length === 2){
                    let lineID = tempPair.filter(e => e[0] === 'l')[0]
                    connectedPair[tempPair[0]] = tempPair[1]
                    connectedPair[tempPair[1]] = tempPair[0]

                    let leftParent = document.getElementById(tempPair[0]).parentElement
                    let rightParent = document.getElementById(tempPair[1]).parentElement;
                    let typeParent = undefined;
                    //find the parent is type
                    if (leftParent.className === "type" && rightParent.className === "root"){
                        typeParent = leftParent
                        rootTypePair[rightParent.children[0].value] = leftParent.children[0].value
                    } else if (rightParent.className === "type" && leftParent.className === "root"){
                        typeParent = rightParent
                        rootTypePair[leftParent.children[0].value] = rightParent.children[0].value
                    }

                    if(typeParent !== undefined){
                        type.push(typeParent.children[0].value)
                        let typeInd = type.indexOf(typeParent.children[0].value)
                        typeParent.children[0].onchange = function(e){
                            let rootTypePairKey;
                            for (let key in rootTypePair){
                                if(rootTypePair[key]===type[typeInd]){
                                    rootTypePairKey = key
                                    break;
                                }
                            }
                            rootTypePair[rootTypePairKey] = e.target.value
                            type[typeInd] = e.target.value
                            updateCode(schema)
                        }
                    }
              
                    updateCode(schema)
                    linedraw(connection[0] + 5, connection[1] + 5, connection[2] + 5, connection[3] + 5, lineID)
                    tempPair = [];
                    connection = [];
                }
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

    function updateCode(newSchema){
        console.log("rootTypePair", rootTypePair)
        console.log("type", type)
        console.log("query", query)
        //reset the content
        schemaMethod = '';
        root = '';
        rootQueryField = '';
        schemaCode = '';
        typeCode = '';

        //update root of query
        // if (query.length !== 0) {
        query.forEach(e => {
            rootQueryField += `\n\t\t${e}: {\n\t\t\ttype: new GraphQLList(${rootTypePair[e]}),\n\t\t\tdescription: \"List of Data\", \n\t\t\t resolve: () => data,\n\t\t},` 
        })
        rootQueryMethod = `\n\tname: \"Query\",\n\tdescription: \"Root Query\",\n\tfields: () => ({${rootQueryField}\n\t}),`
        // }

        //update type
        type.forEach((e) => {
            typeCode += `\n\nconst ${e} = new GraphQLObjectType({\n\tname: "data",\n\tdescription: "",\n\tfields: () => ({\n\t\tmotd: {\n\t\t\ttype: GraphQLNonNull(GraphQLString),\n\t\t},\n\t}),\n});`
        })

        //update schema
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

        //finalise the code
        code = head + typeCode + root + schemaCode + app;

        if(data !== undefined) {
          document.getElementById('textarea').textContent = code
        }
        
    }

    //for testing
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