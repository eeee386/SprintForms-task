import React, {useState} from 'react';
import './FizzBuzz.css'
const onetoHundred = Array.from(Array(101).keys());
onetoHundred.shift();

export const FizzBuzz = () => {
    const [three, setThree] = useState("Fizz");
    const [five, setFive] = useState("Buzz");
    const [threeInput, setThreeInput] = useState("");
    const [fiveInput, setFiveInput] = useState("");
    const writeFizzBuzz = (e: number): string => {
        if(e%3===0 && e%5===0){
            return three+five;
        } else if(e%3 === 0){
            return three;
        } else if (e%5===0){
            return five;
        } else {
            return e.toString();
        }
    }

    return (
        <div>
            <div>
                <input onChange={(e)=> setThreeInput(e.target.value)} />
                <button onClick={(e)=> setThree(threeInput)}>Set Three</button>
            </div>
            <div>
                <input onChange={(e)=> setFiveInput(e.target.value)} />
                <button onClick={(e)=> setFive(fiveInput)}>Set Five</button>
            </div>
            <div className={"numberWrapper"}>
                {onetoHundred.map(e => <span>{writeFizzBuzz(e)}</span>)}
            </div>
        </div>);
}