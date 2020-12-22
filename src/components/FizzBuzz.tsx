import React, {useState, useMemo} from 'react';
import './FizzBuzz.css'

type FizzBuzzProps = {
    length?: number;
    numberWordObject?: Map<number, string>;
}

export const FizzBuzz = ({length = 100, numberWordObject = new Map().set(3, "Fizz").set(5, "Buzz")}: FizzBuzzProps) => {
    const [numWord, setNumWord] = useState(numberWordObject);
    const [numWordInput, setNumWordInput] = useState(numberWordObject);

    const onetoLength = useMemo(() =>{
        const onetoLength = Array.from(Array(length+1).keys());
        onetoLength.shift();
        return onetoLength
    }, [length])

    const updateText = (num: number): void => {
        setNumWord((state => new Map(numWord.set(num, numWordInput.get(num) ?? ""))));
    }

    const updateInput = (num: number, value: string): void => {
        setNumWordInput((state => new Map(numWordInput.set(num, value))));
    }

    const writeFizzBuzz = (num: number): string => {
        let str = "";
        Array.from(numWord.keys()).forEach((elem) => {
            console.log(elem);
            if(num % elem === 0){
                str += numberWordObject.get(elem);
            }
        })
        return str || num.toString();
    }

    return (
        <div>
            {Array.from(numWord.keys()).map((key) => {
                return (
                    <div>
                        <input data-testid={`${key}Input`} id={`${key}Input`}
                               onChange={(e) => updateInput(key, e.target.value)}/>
                        <button data-testid={`${key}Button`} id={`${key}Button`} onClick={() => updateText(key)}>Set
                            &nbsp;{key}
                        </button>
                    </div>
                )
            })}
            <div className={"numberWrapper"}>
                {onetoLength.map(e => <span data-testid={e.toString()} id={e.toString()}>{writeFizzBuzz(e)}</span>)}
            </div>
        </div>);
}