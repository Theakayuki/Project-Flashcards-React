import { Fragment, useEffect, useState } from "react";
import { deleteCard, deleteDeck } from "../../utils/api";

import { useHistory } from "react-router-dom";

function DeleteButton({id, type, shouldReload=true, className=''}){
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, [id, type]);

    const handleDelete = () => {
        if (window.confirm(`Delete this ${type}?\n\nYou will not be able to recover it.`)) {
            if (type === 'deck') {
                deleteDeck(id);
            }
            if (type === 'card') {
                deleteCard(id);
            }

            if (shouldReload) {
                history.go(0);
            } else {
            history.push('/');
            }
        }
    };

    return (
        <Fragment>
            {isLoaded && (
                <button className={`btn btn-danger ${'' || className}`} onClick={handleDelete} type="button">
                    <i className='bi bi-trash'></i> Delete
                </button>
            )}
        </Fragment>
    );
};

export default DeleteButton;