import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { readDeck } from '../../../utils/api';

function Study() {
    const [deck, setDeck] = useState({ cards: [] });
    const [currentCard, setCurrentCard] = useState(0);
    const [isFront, setIsFront] = useState(true);
    const [isDone, setIsDone] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();

    const deckId = useParams().deckId;

    // useEffect will load the deck from the api
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            const loadedDeck = await readDeck(deckId, abortController.signal);
            setDeck(loadedDeck);
            setIsLoaded(true);
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);

    // handleFlip will flip the card from front to back, or back to front
    const handleFlip = () => {
        setIsFront(!isFront);
    };

    // handleNext will move to the next card, if the current card is the last card in the deck, it will set isDone to true
    const handleNext = () => {
        if (currentCard < deck.cards.length - 1) {
            setCurrentCard(currentCard + 1);
            setIsFront(true);
        } else {
            if (window.confirm('Restart cards?')) {
                handleRestart();
            } else {
                history.push('/');
            }
        }
    };

    // handleRestart will reset the study session
    const handleRestart = () => {
        setCurrentCard(0);
        setIsFront(true);
        setIsDone(false);
    };


    // Breadcrumb will display the breadcrumb navigation
    const Breadcrumb = () => {
        return (
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>
                            <i className='bi bi-house-door-fill'></i> Home
                        </Link>
                    </li>
                    <li className='breadcrumb-item'>
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Study
                    </li>
                </ol>
            </nav>
        );
    };

    // EndCard will display the end card, which will give the user the option to restart
    const EndCard = () => {
        return (
                    <div className='card'>
                        <div className='card-body'>
                            <h2>Done!</h2>
                            <button className='btn btn-secondary' onClick={handleRestart}>
                                Restart
                            </button>
                        </div>
                    </div>
        );
    };

    // Card will display the current card
    const Card = () => {
        return (
                    <div className='card'>
                        <div className='card-body'>
                            <h2>
                                Card {currentCard + 1} of {deck.cards.length}
                            </h2>
                            <p>
                                {isFront
                                    ? deck.cards[currentCard].front
                                    : deck.cards[currentCard].back}
                            </p>
                            <button className='btn btn-secondary' onClick={handleFlip}>
                                Flip
                            </button>
                            {isFront ? null : (
                                <button className='btn btn-primary ml-3' onClick={handleNext}>
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
        );
    };

    const NotEnoughCards = () => {
        return (
            <div className='card'>
                <div className='card-body'>
                    <h2>Not enough cards.</h2>
                    <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`}>
                        <button className='btn btn-primary'>Add Cards</button>
                    </Link>
                </div>
            </div>
        );
    };


    // if the deck is not loaded, it will display a loading message
    if (isLoaded) {
        if (deck.cards.length < 3) {
            return (
                <div>
                    <Breadcrumb />
                    <h1>Study: {deck.name}</h1>
                    <NotEnoughCards />
                </div>
            );
        } else {
        if (isDone) {

            // if the deck is done, it will display the end card
            return (
                <div>
                    <Breadcrumb />
                    <h1>Study: {deck.name}</h1>
                    <EndCard />
                </div>
            );
        } else {

            // if the deck is not done, it will display the current card
            return (
                <div>
                    <Breadcrumb />
                    <h1>Study: {deck.name}</h1>
                    <Card />
                </div>
            );
        }
    }
    } else {

        // if the deck is not loaded, it will display a loading message
        return (
            <div>
                <h1>Study: {deck.name}</h1>
                <div className='card'>
                    <div className='card-body'>
                        <h2>Loading...</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Study;
