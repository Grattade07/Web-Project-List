import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateItemCount } from "../store/webList"

/* component renders the inputs that are used to add a new web item to the api list */
function ApiInputsAdd () {
const [projectAddTitle, setProjectAddTitle] = useState("")
const [projectAddDescription, setProjectAddDescription] = useState("")
const [projectAddURL, setProjectAddURL] = useState("")

const dispatch = useDispatch()

/* function posts the data sent in the request body to the url path */
function postData(url = "", data = {}) {
    return fetch(url, {
        method: "POST",
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
    setProjectAddTitle("")
    setProjectAddDescription("")
    setProjectAddURL("")
}


return(
    <div id="addInputs">
        <h3>Add Item</h3>
        <div>
            <form id="addInputForm">
                <label>
                    Project title:
                    <input
                        type="text"
                        name="projectTitle"
                        onChange={(e) => {setProjectAddTitle(e.target.value)}}
                        value={projectAddTitle}
                    />
                </label>

                <label>
                    Description:
                    <input
                        type="text"
                        name="projectDescription"
                        onChange={(e) => {setProjectAddDescription(e.target.value)}}
                        value={projectAddDescription}
                    />
                </label>

                <label>
                    URL:
                    <input
                        type="text"
                        name="projectURL"
                        onChange={(e) => {setProjectAddURL(e.target.value)}}
                        value={projectAddURL}
                    />
                </label>

                <button className="submitButton" onClick={(e) => {
                    e.preventDefault()
                    /* sends the data in the inputs as an object to the api */
                    postData("/api", {
                        title: `${projectAddTitle}`, 
                        description: `${projectAddDescription}`, 
                        url: `${projectAddURL}`
                    })
                    resetInputs()
                    /* increments the state of the updated item count */
                    dispatch(updateItemCount())
                }}>Add</button>
            </form>
        </div>
    </div>
)
}

export default ApiInputsAdd