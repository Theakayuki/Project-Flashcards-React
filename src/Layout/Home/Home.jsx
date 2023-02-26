import { Link } from 'react-router-dom';

function Home({ decks }) {
    return (
        <div className='home'>
            <Link to='/decks/new' className='btn btn-secondary mb-2'>
                <i className='bi bi-plus-lg'></i> Create Deck
            </Link>

            <div>
                {decks.map((deck) => (
                    <div key={deck.id} className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>{deck.name}</h5>
                            <p className='card-text'>{deck.description}</p>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <Link
                                        to={`/decks/${deck.id}`}
                                        className='btn btn-secondary mr-1'
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/decks/${deck.id}/study`}
                                        className='btn btn-primary'
                                    >
                                        Study
                                    </Link>
                                </div>
                                <div>
                                    <button className='btn btn-danger' onClick={()=> window.alert('Should we delete this deck?\n \nYou will not be able to recover this Deck.')}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
