import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../../../utils/api';

import { Link } from 'react-router-dom';
import DeckForm from '../DeckForm';

function EditDeck() {
    const { deckId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const history = useHistory();
    const initialState = { name: '', description: '' };
    const [deckData, setDeckData] = useState(initialState);

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
        setDeckData({
            ...deckData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await updateDeck(deckData);
        history.push(`/decks/${response.id}`);
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
                        Edit Deck
                    </li>
                </ol>
            </nav>
        );
    };

    return (
        <div>
            <Breadcrumb />
            <h2>Edit Deck</h2>
                {isLoaded ? (
                    <DeckForm formData={deckData} changeHandler={changeHandler} handleSubmit={handleSubmit} />
                ) : (
                    <p>Loading...</p>
                )}
        </div>
    );
}

export default EditDeck;
