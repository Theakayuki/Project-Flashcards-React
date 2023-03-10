import { Fragment, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../../../utils/api';

import CardFrom from '../CardForm';

function NewCard() {
    const initialState = { front: '', back: '' };
    const [cardData, setCardData] = useState({ front: '', back: '' });
    const [isLoaded, setIsLoaded] = useState(false);
    const { deckId } = useParams();
    const history = useHistory();
    const [deckData, setDeckData] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            const loadedDeck = await readDeck(deckId, abortController.signal);
            setDeckData(loadedDeck);
        }
        loadDeck();
        setIsLoaded(true);
        return () => abortController.abort();
    }, [deckId]);

    const changeHandler = ({ target }) => {
        setCardData({
            ...cardData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createCard(deckId, cardData);
        setCardData(initialState);
        history.go(0);
        console.log(response);
    };

    console.log(deckId);
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
                        <Link to={`/decks/${deckId}`}>{deckData.name}</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Add Card
                    </li>
                </ol>
            </nav>
        );
    };

    return (
        <Fragment>
            {isLoaded ? (
                <Fragment>
                    <Breadcrumb />
                    <h2>{deckData.name}: Add Card</h2>
                    <CardFrom cardData={cardData} changeHandler={changeHandler} submitHandler={handleSubmit} />
                </Fragment>
            ) : (
                <p>Loading...</p>
            )}
        </Fragment>
    );
}

export default NewCard;
