import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import ApiInputsAdd from './components/ApiInputsAdd';
import { useSelector} from 'react-redux';
import ApiInputsRemove from './components/ApiInputsRemove';
import ApiInputsUpdate from './components/ApiInputsUpdate';


function App() {
const [items, setItems] = useState(null)
const [isLoaded, setIsLoaded] = useState(false)
const [error, setError] = useState(null)

/* used to track when the itemUpdatedCount is changed */
const updatedCount = useSelector((state) => state.webList.itemUpdatedCount)

/* gets the data from the API and generates li elements for each item in the array */
function componentDidMount() {
  fetch("/api")
    .then(res => res.json())
    .then(
      (result) => {
      setIsLoaded(true)
      setItems(result)
    },
    (error) => {
      setIsLoaded(true)
      setError(error)
    } ) 
}

/* re-runs function to get web list when updatedCount has changed state */
useEffect( () => {componentDidMount()}, [updatedCount] )

/* determines what is rendered depedning on the state of the items */
if (error) {
  return <div>Error:{error}</div>
} else if (!isLoaded) {
  return <div>Loading...</div>
} else {
  return (
    <div className='App'>
      <h2>Web Project List</h2>
      <ApiInputsAdd />
      <ApiInputsRemove />
      <ApiInputsUpdate />
      <ul id="projectList">
        {items.map(item => (
        <li key={item.id}>
          <b>ID:</b> #{item.id}, <b>Title:</b> {item.title}, <b>Description:</b> {item.description}, <b>URL:</b> {item.URL}
        </li>
        ))}
      </ul>
    </div>
  )
}
}

export default App;
