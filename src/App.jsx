import './styles/globals.scss'
import CardList from "./components/CardList/CardList.jsx";

function App() {

  return (
    <>
        <h2 className="goods">Текущие товары</h2>
        <div className="box">
            <CardList />
        </div>
    </>
  )
}

export default App
