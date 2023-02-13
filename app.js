const express = require("express")
const fs = require("fs")
const path = require("path")

const app = express()

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true }))

app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, "./web-projectinterface/build")))


/* sets the port to 8080 */
const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening to ${port}`)
})


/* gets the web project array */
app.get("/api", (req, res) => {
    console.log()
    const array = fs.readFileSync("array.json")
    res.send(array) 
})

/* gets the array and returns it as an object to be modified */
function getArray () {
    const array = fs.readFileSync("array.json")
    return JSON.parse(array)
}

/* adds the created item to the array */
function addItem(obj) {
    const array = getArray()
    array.push(obj)
    fs.writeFileSync("array.json", JSON.stringify(array))
}

/* removes the item from the array with the matching id number */
function deleteItem(idNumber) {
    const array = getArray()
    const itemIndex = (idNumber) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === idNumber) {
                return i
            }
        }
    } 

    array.splice(itemIndex(idNumber), 1)

    fs.writeFileSync("array.json", JSON.stringify(array))
}

/* amends the title of the item with the mathcing id number */
function amendTitle(idNumber, newTitle) {
    const array = getArray()

    array.forEach(item => {
        if (item.id === idNumber) {
            return item.title = newTitle
        }
    });

    fs.writeFileSync("array.json", JSON.stringify(array))
}

function amendDescription(idNumber, newDescription) {
    const array = getArray()

    array.forEach(item => {
        if (item.id === idNumber) {
            return item.description = newDescription
        }
    });

    fs.writeFileSync("array.json", JSON.stringify(array))
}

/* adds additional item to the array */
app.post("/api", (req, res) => {
    /* defines the new object values from the passed parameters */
    
    const title = req.body.title
    const description = req.body.description
    const url = req.body.url

    /* gets the array which is then used to calculate the next ID value */
    const array = fs.readFileSync("array.json")

    const arrayObject = JSON.parse(array)

    const nextID = Number(arrayObject[arrayObject.length -1].id) + 1

    /* creates new object */
    const newObj = {
        "id" : nextID,
        "title" : `${title}`,
        "description" : `${description}`,
        "URL" : `${url}`
    }

    /* runs function to add the new object */
    addItem(newObj)
    /* displays message of success */
    res.send(`Item added ${JSON.stringify(req.body)}`)
    
})

/* deletes item with provided id from the array */
app.delete("/api", (req, res) => {
    const id = Number(req.body.id)

    deleteItem(id)

    res.send(`Removed ID #${JSON.stringify(id)}`)
})

/* amends the title and/or description of the item with the matching id number. Checks whether query values have been given for the title or description*/
app.put("/api", (req, res) => {
    if (req.body.description.trim() === "") {
        const id = Number(req.body.id)
        const title = req.body.title

        amendTitle(id, title)

        res.send(`ID #${req.body.id} updated with ${req.body.title}`)
    } else if (req.body.title.trim() === "") {
        const id = Number(req.body.id)
        const description = req.body.description

        amendDescription(id, description)

        res.send(`ID #${req.body.id} updated with ${req.body.description}`)
    } else {
        const id = Number(req.body.id)
        const title = req.body.title
        const description = req.body.description

        amendTitle(id, title)

        amendDescription(id, description)

        res.send(`ID #${req.body.id} updated with ${req.body.title} & ${req.body.description}`)
    }
})