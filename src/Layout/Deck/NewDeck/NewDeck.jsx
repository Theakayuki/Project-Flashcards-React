import { Link, useHistory } from 'react-router-dom';

import { useState } from 'react';
import { createDeck } from '../../../utils/api';
import DeckForm from '../DeckForm';

function NewDeck() {
    const initialState = {
        name: '',
        description: '',
    };
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();

    const Breadcrumb = () => {
        return (
            <nav aria-label='breadcrumb'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>
                            <i className='bi bi-house-door-fill'></i> Home
                        </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        Create Deck
                    </li>
                </ol>
            </nav>
        );
    };

    const changeHandler = ({ target }) => {
        setFormData((currentData) => ({
            ...currentData,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createDeck(formData);
        history.push(`/decks/${response.id}`);
    };

    return (
        <div>
            <Breadcrumb />
            <h2>Create Deck</h2>
            <DeckForm formData={formData} changeHandler={changeHandler} handleSubmit={handleSubmit} />
        </div>
    );
}

export default NewDeck;
