import React from "react";
import {FizzBuzz} from "./FizzBuzz";
import { render, screen, fireEvent } from '@testing-library/react';

function getAllSubArrays<T>(arr: T[], start: number = 0, end: number = 0, resArr: T[][] = []): T[][] {
    if(end === arr.length){
        return resArr;
    } else if(start > end){
        return getAllSubArrays(arr, 0, end+1, resArr);
    } else {
        resArr.push(arr.slice(start, end+1));
        return getAllSubArrays(arr, start+1, end, resArr);
    }
}

const generateTestsForFizzBuzz = (numArr: number[], numWordObject: {[key: string]: string}, times:number=1):void => {
    const subArrays = getAllSubArrays([3,4,7]);
    subArrays.forEach((subArr) => {
        const prodNum = subArr.reduce((acc, curr) => acc*curr,1);
        const leaveOut = numArr.filter(e => !subArr.includes(e));
        for(let i = 1; i <= times; i++) {
            const numToCheck = (i*prodNum);
            if(leaveOut.some(e => numToCheck % e === 0)){
                times++;
                continue;
            }
            expect(screen.getByTestId(numToCheck.toString()).textContent).toEqual(numWordObject[numToCheck]);
        }
    });
}

const changeTextWithInput = (number: number, value: string): void => {
    const input = screen.getByTestId(`${number}Input`);
    const button = screen.getByTestId(`${number}Button`);
    fireEvent.change(input, { target: { value: value } });
    fireEvent.click(button);
}

const checkChangeText = (numArr: number[], newNumWordObject: {[key:string]: string},  id=""): void => {
    render(<FizzBuzz id={id} />);
    numArr.forEach(number => {
        changeTextWithInput(number, newNumWordObject[number]);
    });
    generateTestsForFizzBuzz(numArr, newNumWordObject, 3);
}

describe("Test FizzBuzz Component", ()=> {
    describe("Basic Component", () => {
        describe("Check render", () => {
            test("should write Buzz for modulo 5", () => {
                render(<FizzBuzz />);
                generateTestsForFizzBuzz([3,5], {3: "Fizz", 5:"Buzz"}, 3);
            });
        });
        describe("Check interactions", () => {
            test('threeInput should change value of Fizz', () => {
                checkChangeText(3, "LOL", [5]);
            });
            test('fiveInput should change value of Buzz', () => {
                checkChangeText(5, "KEK", [3]);
            })
        });
    });
    describe("Render proped component", () => {
        const renderPropedComp = () => render(<FizzBuzz id={"id"} numberWordObject={{3: "Foo", 4: "Bar", 7: "Baz"}} length={91} />);
        describe("Check render", () => {
            test("should write Buzz for modulo 5", () => {
                console.log(getAllSubArrays([3,4,7]));
            });
            test("should write Fizz for modulo 3", () => {
                render(<FizzBuzz />);
                generateTestForFizzBuzz(3, "Fizz", 3, [5]);

            });
            test("should write FizzBuzz for modulo 15", () => {
                render(<FizzBuzz />);
                generateTestForFizzBuzz(15, "FizzBuzz", 3);
            });
        });
        describe("Check interactions", () => {
            test('threeInput should change value of Fizz', () => {
                checkChangeText(3, "LOL", [5]);
            });
            test('fiveInput should change value of Buzz', () => {
                checkChangeText(5, "KEK", [3]);
            })
        });
    })


})