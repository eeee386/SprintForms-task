import React from 'react';
import {FizzBuzz} from "./components/FizzBuzz";

function App() {
    return (
        <>
            <FizzBuzz/>
            <FizzBuzz length={91} numberWordObject={new Map().set(4, "Foo").set(7, "Bar").set(3, "Baz")}/>
        </>
    );
}

export default App;
