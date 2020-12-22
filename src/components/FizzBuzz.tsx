import React, {useState, useMemo, useEffect} from 'react';
import './FizzBuzz.css'

type FizzBuzzProps = {
    length?: number;
    numberWordObject?:{[key:string]: string};
    id?: string
}

export const FizzBuzz = ({length = 100, numberWordObject = {3: "Fizz", 5: "Buzz"}, id = ""}: FizzBuzzProps) => {
    const [numWord, setNumWord] = useState(numberWordObject);
    const [numWordInput, setNumWordInput] = useState(numberWordObject);

    const onetoLength = useMemo(() =>{
        const onetoLength = Array.from(Array(length+1).keys());
        onetoLength.shift();
        return onetoLength
    }, [length])

    const updateText = (num: number): void => {
        setNumWord(state => ({...state, [num]: numWordInput[num] }));
    }

    const updateInput = (num: number, value: string): void => {
        setNumWordInput((state => ({...state, [num]: value})));
    }

    const writeFizzBuzz = (num: number): string => {
        let str = "";
        Object.keys(numWord).forEach((elem) => {
            if(num % parseInt(elem) === 0){
                str += numWord[elem];
            }
        })
        return str || num.toString();
    }

    return (
        <div className={"FizzBuzzContentWrapper"}>
            {Object.keys(numWord).map((key) => {
                return (
                    <div key={`${key}InputWrapper${id}`}>
                        <input data-testid={`${key}Input${id}`} id={`${key}Input${id}`}
                               onChange={(e) => updateInput(parseInt(key), e.target.value)}/>
                        <button data-testid={`${key}Button${id}`} id={`${key}Button${id}`} onClick={() => updateText(parseInt(key))}>Set
                            &nbsp;{key}
                        </button>
                    </div>
                )
            })}
            <div className={"numberWrapper"}>
                {onetoLength.map(e => <span key={`${e.toString()}${id}`} data-testid={`${e.toString()}${id}`} id={`${e.toString()}${id}`}>{writeFizzBuzz(e)}</span>)}
            </div>
        </div>);
}