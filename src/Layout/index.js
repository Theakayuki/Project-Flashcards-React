import React, { Fragment, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { listDecks } from '../utils/api';
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
                    <Route exact path='/'>
                        <Home decks={decks}/>
                    </Route>

                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </Fragment>
    );
}

export default Layout;
