import { Link } from "react-router-dom";

function Home({decks}) {
  return (
    <div className="home">
      <button className="btn btn-secondary">{'\uFF0B'}Create Deck</button>
      <div>
        {decks.map((deck) => (
            <div key={deck.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">{deck.name}</h5>
                    <p className="card-text">{deck.description}</p>
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">View</Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                    <button className="btn btn-danger ml-5">Delete</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Home;