import { Link, useHistory } from 'react-router-dom';

import { useState } from 'react';
import { createDeck } from '../../../utils/api';

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
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        className='form-control'
                        name='name'
                        id='name'
                        placeholder='Deck Name'
                        value={formData.name}
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
                        value={formData.description}
                        onChange={changeHandler}
                        required
                    ></textarea>
                </div>
                <Link to='/' className='btn btn-secondary'>
                    Cancel
                </Link>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default NewDeck;
