import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { AddQuestion } from './components/AddQuestion'
import { Quiz } from './components/Quiz'


export const routes = <Layout>
    <Route exact path='/quiz' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/addquestion' component={AddQuestion} />
</Layout>;
