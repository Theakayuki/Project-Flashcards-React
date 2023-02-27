import { Link, useParams } from 'react-router-dom';

function CardFrom({ cardData, changeHandler, handleSubmit}) {
    const deckId = useParams().deckId;
    // check if url has has cardId to know if it is edit or new card
    const isEdit = useParams().cardId;
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='front'>Front</label>
                <textarea
                    className='form-control'
                    id='front'
                    name='front'
                    rows='3'
                    placeholder='Front side of card'
                    onChange={changeHandler}
                    value={cardData.front}
                    required
                ></textarea>
            </div>
            <div className='form-group'>
                <label htmlFor='back'>Back</label>
                <textarea
                    className='form-control'
                    id='back'
                    name='back'
                    rows='3'
                    placeholder='Back side of card'
                    onChange={changeHandler}
                    value={cardData.back}
                    required
                ></textarea>
            </div>
            <Link to={`/decks/${deckId}`} className='btn btn-secondary mr-2'>
                {!isEdit ? 'Done' : 'Cancel'}
            </Link>
            <button type='submit' className='btn btn-primary'>
                Save
            </button>
        </form>
    );
}

export default CardFrom;