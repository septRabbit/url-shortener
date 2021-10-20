import React, { ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Footer from './Footer';
import Result from './Result';
import Redirect from './Redirect';
import { ToastProvider } from './components/Toast';
import { Icon } from './components/Icon';

type LayoutProps = {
  children?: ReactNode;
}
function Layout({ children }: LayoutProps) {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <header className='px-6 mb-5 bg-blue-400 shadow-md'>
        <h1 className='text-white mx-auto py-6 text-left md:pl-20 text-2.5xl lg:text-5xl font-bold max-w-screen-xl flex justify-start'>
          <a href='/'>
            <Icon.Logo className='h-10 text-white' />
          </a>
        </h1>
      </header>

      {children}
    </div>
  );
}

function App() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
