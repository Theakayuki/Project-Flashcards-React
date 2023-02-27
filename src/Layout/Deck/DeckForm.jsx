import { useHistory } from "react-router-dom/cjs/react-router-dom";

function DeckForm({ formData, changeHandler, handleSubmit}) {
    const history = useHistory();

    const cancelHandler = () => {
        history.goBack();
    };

    return (
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
            <button type='button' className='btn btn-secondary' onClick={cancelHandler}>
                Cancel
            </button>
            <button type='submit' className='btn btn-primary ml-3'>
                Submit
            </button>
        </form>
    );
}

export default DeckForm;
