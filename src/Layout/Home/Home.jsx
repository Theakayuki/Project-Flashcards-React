import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import DeleteButton from '../../utils/DeleteButton/DeleteButton';
import { listDecks } from '../../utils/api';

function Home() {
    // State for the decks
    const [decks, setDecks] = useState([]);

    // loading the initial decks from the API
    useEffect(() => {
        // Using an IIFE to avoid a warning about useEffect not being able to return a promise
        (async () => {
            const response = await listDecks();
            setDecks(response);
        })();
    }, []);

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
                                    <DeleteButton id={deck.id} type='deck' shouldReload={true} />
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
