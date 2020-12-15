import React, {useState} from 'react';
import './FizzBuzz.css'
const onetoHundred = Array.from(Array(101).keys());
onetoHundred.shift();

export const FizzBuzz = () => {
    const [three, setThree] = useState("Fizz");
    const [five, setFive] = useState("Buzz");
    const writeFizzBuzz = (e: number): string => {
        let s = "";
        if(e % 3 === 0){
            s += three;
        }
        if(e %5 === 0){
            s += five;
        }
        return s || e.toString();
    }

    return <div className={"numberWrapper"}>
        {onetoHundred.map(e => <span>{writeFizzBuzz(e)}</span>)}
    </div>;
}