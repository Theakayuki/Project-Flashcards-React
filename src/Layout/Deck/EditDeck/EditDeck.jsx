import { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../../../utils/api';

import { Link } from 'react-router-dom';

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
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                {isLoaded ? (
                    <Fragment>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                id='name'
                                value={deckData.name}
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='description'>Description</label>
                            <textarea
                                className='form-control'
                                name='description'
                                id='description'
                                placeholder='Brief description of the deck'
                                rows='3'
                                value={deckData.description}
                                onChange={changeHandler}
                                required
                            ></textarea>
                        </div>
                    </Fragment>
                ) : (
                    <p>Loading...</p>
                )}
                <Link to={`/decks/${deckId}`} className='btn btn-secondary'>
                    Cancel
                </Link>
                <button type='submit' className='btn btn-primary ml-3'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditDeck;
