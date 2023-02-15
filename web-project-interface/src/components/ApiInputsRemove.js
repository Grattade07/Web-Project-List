import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateItemCount } from "../store/webList"

/* component renders the inputs that are used to add a new web item to the api list */
function ApiInputsRemove () {
const [projectRemoveId, setProjectRemoveId] = useState("")

const dispatch = useDispatch()

/* function posts the data sent in the request body to the url path */
function deleteData(url = "", data = {}) {
    return fetch(url, {
        method: "DELETE",
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
    setProjectRemoveId("")
}

return(
    <div id="removeInputs">
        <h3>Delete Item</h3>
        <form id="removeInputForm">
            <label>
                Project ID:
                <input
                    type="text"
                    name="projectId"
                    onChange={(e) => {setProjectRemoveId(e.target.value)}}
                    value={projectRemoveId}
                />
            </label>

            <button className="submitButton" onClick={(e) => {
                e.preventDefault()
                /* sends the data in the inputs as an object to the api */
                deleteData("/api", {
                    id: `${projectRemoveId}`
                })
                resetInputs()
                /* increments the state of the updated item count */
                dispatch(updateItemCount())
            }}>Remove</button>
        </form>
    </div>
)
}

export default ApiInputsRemove