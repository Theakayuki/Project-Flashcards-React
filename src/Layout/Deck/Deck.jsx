import { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import { readDeck } from '../../utils/api';
import DeleteButton from '../DeleteButton/DeleteButton';

function Deck() {
    const [deck, setDeck] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const deckId = useParams().deckId;
    const history = useHistory();
    const { url } = useRouteMatch();

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            const loadedDeck = await readDeck(deckId, abortController.signal);
            setDeck(loadedDeck);
            setIsLoaded(true);
        }

        loadDeck();
    }, [deckId]);

    const handleDeckEdit = () => {
        history.push(`/decks/${deckId}/edit`);
    };

    const handleCardAdd = () => {
        history.push(`/decks/${deckId}/cards/new`);
    };

    const handleStudy = () => {
        history.push(`/decks/${deckId}/study`);
    };

    const handleCardEdit = (cardId) => {
        history.push(`${url}/cards/${cardId}/edit`);
    };
    const Breadcrumb = () => {
        return (
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>
                            <i className='bi bi-house-door-fill'></i>Home
                        </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        {deck.name}
                    </li>
                </ol>
            </nav>
        );
    };

    const DeckSummery = () => {
        return (
            <div>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className='d-flex justify-content-between'>
                    <div>
                        <button className='btn btn-secondary' onClick={handleDeckEdit}>Edit</button>
                        <button className='btn btn-primary ml-2' onClick={handleStudy}>Study</button>
                        <button className='btn btn-primary ml-2' onClick={handleCardAdd}>Add Cards</button>
                    </div>
                    <div>
                        <DeleteButton type={'deck'} id={deck.id} shouldReload={false} />
                    </div>
                </div>
            </div>
        );
    };

    const CardList = () => {
        return (
            <Fragment>
            <h2>Cards</h2>
            {deck.cards.map((card) => (
                <div className='card' key={card.id}>
                    <div className='card-body'>
                        <div className='row mb-2'>
                            <div className='col-6'>{card.front}</div>
                            <div className='col-6'>{card.back}</div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-secondary' onClick={() => handleCardEdit(card.id)}>Edit</button>
                            <DeleteButton className='ml-2' type={'card'} id={card.id} />
                        </div>
                    </div>
                </div>
            ))}
            </Fragment>
        );
    };

    return (
        <Fragment>
            <Breadcrumb />
            <DeckSummery />
            {isLoaded && <CardList />}
        </Fragment>
    );
}

export default Deck;
