import React from 'react';
import {FizzBuzz} from "./components/FizzBuzz";
import './App.css';

function App() {
    return (
        <div className={"FizzBuzzWrapper"}>
            <FizzBuzz id={"FizzBuzz"}/>
            <FizzBuzz length={91} numberWordObject={{3: "Foo", 4: "Bar", 7: "Baz"}} id={"FooBar"}/>
        </div>
    );
}

export default App;
