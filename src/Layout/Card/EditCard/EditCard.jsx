import { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../../utils/api";

import CardFrom from "../CardForm";

function EditCard() {
    const { deckId, cardId } = useParams();
    const [deckData, setDeckData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [cardData, setCardData] = useState({ front: '', back: '' });
    const history = useHistory();

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

    useEffect(() => {
        const abortController = new AbortController();
        async function loadCard() {
            const loadedCard = await readCard(cardId, abortController.signal);
            setCardData(loadedCard);
        }
        loadCard();
        setIsLoaded(true);
        return () => abortController.abort();
    }, [cardId]);

    const changeHandler = ({ target }) => {
        setCardData({
            ...cardData,
            [target.name]: target.value,
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        await updateCard(cardId, cardData);
        history.push(`/decks/${deckId}`);
    };


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
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
        );
    };

    return (
        <Fragment>
            <Breadcrumb />
            <h1>Edit Card</h1>
            {isLoaded ? (
                <CardFrom cardData={cardData} changeHandler={changeHandler} submitHandler={submitHandler} />
            ) : (
                <p>Loading...</p>
            )}
        </Fragment>
    );
}

export default EditCard;