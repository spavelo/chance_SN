import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import store from './redux/redux-store'

const rerender = (state) => {
    return ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
        <App
            state={state}
             store={store}
             dispatch={store.dispatch.bind(store)}/>
      </React.StrictMode>
    </BrowserRouter>
    ,
    document.getElementById('root')
);}

rerender(store.getState())

store.subscribe(() =>  {
    rerender(store.getState())
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
