import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateItemCount } from "../store/webList"

/* component renders the inputs that are used to update a web item on the api list */
function ApiInputsUpdate () {
const [projectUpdateID, setprojectUpdateID] = useState("")
const [projectUpdateTitle, setProjectUpdateTitle] = useState("")
const [projectUpdateDescription, setProjectUpdateDescription] = useState("")

const dispatch = useDispatch()

/* function puts the data sent in the request body to the url path */
function putData(url = "", data = {}) {
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(res => res.text())
    .then((data) => {
        console.log("Success", data)
    })
}

/* resets the value of the input fields */
const resetInputs = () => {
    setprojectUpdateID("")
    setProjectUpdateTitle("")
    setProjectUpdateDescription("")
}


return(
    <div id="updateInputs">
        <h3>Update Item</h3>
        <form id="updateInputForm">
            <label>
                Project ID:
                <input
                    type="text"
                    name="projectID"
                    onChange={(e) => {setprojectUpdateID(e.target.value)}}
                    value={projectUpdateID}
                />
            </label>

            <label>
                New Title:
                <input
                    type="text"
                    name="projectDescription"
                    onChange={(e) => {setProjectUpdateTitle(e.target.value)}}
                    value={projectUpdateTitle}
                />
            </label>

            <label>
                New Description:
                <input
                    type="text"
                    name="projectURL"
                    onChange={(e) => {setProjectUpdateDescription(e.target.value)}}
                    value={projectUpdateDescription}
                />
            </label>

            <button className="submitButton" onClick={(e) => {
                e.preventDefault()
                /* sends the data in the inputs as an object to the api */
                putData("/api", {
                    id: `${projectUpdateID}`, 
                    title: `${projectUpdateTitle}`, 
                    description: `${projectUpdateDescription}`
                })
                resetInputs()
                /* increments the state of the updated item count */
                dispatch(updateItemCount())
            }}>Add</button>
        </form>
    </div>
)
}

export default ApiInputsUpdate