import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

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
    return (
        <Fragment>
            <Header />
            <div className='container'>
                <Switch>
                    {/* Home page */}
                    <Route exact path='/'>
                        <Home />
                    </Route>

                    {/* Edit Card page */}
                    <Route path='/decks/:deckId/cards/:cardId/edit'>
                        <EditCard />
                    </Route>

                    {/* New Card page */}
                    <Route path='/decks/:deckId/cards/new'>
                        <NewCard />
                    </Route>

                    {/* Edit Deck page */}
                    <Route path='/decks/:deckId/edit'>
                        <EditDeck />
                    </Route>

                    {/* Study page */}
                    <Route path='/decks/:deckId/study'>
                        <Study />
                    </Route>

                    {/* New Deck page */}
                    <Route path='/decks/new'>
                        <NewDeck />
                    </Route>

                    {/* Deck page */}
                    <Route path='/decks/:deckId'>
                        <Deck />
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
