import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Footer from './Footer';
import Result from './Result';
import Redirect from './Redirect';
import { ToastProvider } from './components/Toast';
import { Icon } from './components/Icon';

function App() {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <header className='mb-5 bg-blue-400 px-6 shadow-md'>
        <h1 className='text-white mx-auto py-6 text-left md:pl-20 text-2.5xl lg:text-5xl font-bold max-w-screen-xl flex justify-start'>
          <a href='/'>
            <Icon.Logo className='text-white h-10' />
          </a>
        </h1>
      </header>

      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/result'>
          <ToastProvider>
            <Result />
          </ToastProvider>
        </Route>
        <Route path='/:hash'>
          <Redirect />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
