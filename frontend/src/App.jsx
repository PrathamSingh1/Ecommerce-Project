import { useContext } from "react"
import AppContext from "./context/AppContext"

function App() {
  const {data} = useContext(AppContext)
  return (
    <div>
      {data}
    </div>
  )
}

export default App
