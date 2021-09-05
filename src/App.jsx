import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Result from './Result';
import Redirect from './Redirect';

function App() {
  return (
    <div className="min-h-screen ">
      <header className="mb-5 bg-blue-400 px-6 shadow-md">
        <h1 className="text-white mx-auto py-6 text-left md:pl-20 text-2.5xl lg:text-5xl font-bold max-w-screen-xl">
          <a href="/" >BugerURL</a>
        </h1>
      </header>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
        <Route path="/:hash">
          <Redirect />
        </Route>
      </Switch>
      <footer className="bg-blue-400 text-white px-6 py-4 mt-4 shadow-top md:fixed bottom-0 relative w-full">
        <h2 className="text-center">
          If you like our website please donate us to upgrade from alpha to beta{' '}
        </h2>
        <h2 className="text-center">Contact Line ID: Alpha </h2>
      </footer>
    </div>
  );
}

export default App;
