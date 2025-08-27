import CardList from './components/CardList/CardList'
import './styles/globals.scss';

const cards = [
    { id: 1, title: "Title 1", description: "Description 1", imageUrl: "https://img.championat.com/s/732x488/news/big/y/i/novye-anime-serialy-netflix-na-nachalo-2025-goda_17387556741031545332.jpg", isHighlighted: true, count: 2 },
    { id: 2, title: "Title 2", description: "Description 2", imageUrl: "", isHighlighted: false, count: 5 },
    { id: 3, title: "Title 3", description: "Description 3", imageUrl: "", isHighlighted: true, count: 7 },
    { id: 4, title: "Title 4", description: "Description 4", imageUrl: "", isHighlighted: false, count: 12 },
    { id: 5, title: "Title 5", description: "Description 5", imageUrl: "https://img.championat.com/s/732x488/news/big/y/i/novye-anime-serialy-netflix-na-nachalo-2025-goda_17387556741031545332.jpg", isHighlighted: true, count: 0 }
]

function App() {

    return (
        <div className={'main_wrapper'}>
            <CardList cards={cards}/>
        </div>
    );
}

export default App;