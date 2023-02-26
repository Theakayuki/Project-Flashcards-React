import React, { Fragment, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { listDecks } from '../utils/api';
import EditCard from './Card/EditCard/EditCard';
import NewCard from './Card/NewCard/NewCard';
import Deck from './Deck/Deck';
import EditDeck from './Deck/EditDeck/EditDeck';
import NewDeck from './Deck/NewDeck/NewDeck';
import Study from './Deck/Study/Study';
import Header from './Header';
import Home from './Home/Home';
import NotFound from './NotFound';

function Layout() {
  // State for the decks
  const [decks, setDecks] = useState([]);

  // loading the initial decks from the API
  useEffect(() => {
    // Using an IIFE to avoid a warning about useEffect not being able to return a promise
    (async () => {
      const response = await listDecks();
      setDecks(response);
    })()
  }, []);
    return (
        <Fragment>
            <Header />
            <div className='container'>
                <Switch>
                    {/* Home page */}
                    <Route exact path='/'>
                        <Home decks={decks}/>
                    </Route>

                    {/* New Deck page */}
                    <Route path='/decks/new'>
                        <NewDeck />
                    </Route>

                    {/* Deck page */}
                    <Route path='/decks/:deckId'>
                        <Deck />
                    </Route>

                    {/* Edit Deck page */}
                    <Route path='/decks/:deckId/edit'>
                        <EditDeck />
                    </Route>

                    {/* Study page */}
                    <Route path='/decks/:deckId/study'>
                        <Study />
                    </Route>

                    {/* New Card page */}
                    <Route path='/decks/:deckId/cards/new'>
                        <NewCard />
                    </Route>

                    {/* Edit Card page */}
                    <Route path='/decks/:deckId/cards/:cardId/edit'>
                        <EditCard />
                    </Route>

                    {/* Finally if no path is found */}
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </Fragment>
    );
}

export default Layout;
