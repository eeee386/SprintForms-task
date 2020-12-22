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
    const subArrays = getAllSubArrays(numArr);
    subArrays.forEach((subArr) => {
        const prodNum = subArr.reduce((acc, curr) => acc*curr,1);
        const leaveOut = numArr.filter(e => !subArr.includes(e));
        const strToCompare = subArr.reduce((acc, curr) => acc+numWordObject[curr], "");
        for(let i = 1; i <= times; i++) {
            const numToCheck = (i*prodNum);
            if(leaveOut.some(e => numToCheck % e === 0)){
                times++;
                continue;
            }
            expect(screen.getByTestId(numToCheck.toString()).textContent).toEqual(strToCompare);
        }
    });
}

const changeTextWithInput = (number: number, value: string): void => {
    const input = screen.getByTestId(`${number}Input`);
    const button = screen.getByTestId(`${number}Button`);
    fireEvent.change(input, { target: { value: value } });
    fireEvent.click(button);
}

const checkChangeText = (numArr: number[], newNumWordObject: {[key:string]: string}): void => {
    numArr.forEach(number => {
        changeTextWithInput(number, newNumWordObject[number]);
    });
    generateTestsForFizzBuzz(numArr, newNumWordObject, 3);
}

describe("Test FizzBuzz Component", ()=> {
    describe("Basic Component", () => {
        describe("Check render", () => {
            test("should write the proper strings for the numbers", () => {
                render(<FizzBuzz />);
                generateTestsForFizzBuzz([3,5], {3: "Fizz", 5:"Buzz"}, 3);
            });
        });
        describe("Check interactions", () => {
            test('inputs should change the text', () => {
                render(<FizzBuzz />);
                checkChangeText([3,5], {3:"LOL", 5:"KEK"});
            });
            test('one should change only one text', () => {
                render(<FizzBuzz />);
                changeTextWithInput(3, "LOL");
                generateTestsForFizzBuzz([3,5], {3: "LOL", 5:"Buzz"}, 3);
            })
        });
    });
    describe("Render proped component", () => {
        const renderPropedComp = () => render(<FizzBuzz id={"id"} numberWordObject={{3: "Foo", 4: "Bar", 7: "Baz"}} length={91} />);
        describe("Check render", () => {
            test("should write the proper strings for the numbers", () => {
                render(<FizzBuzz id={"id"} />);
                generateTestsForFizzBuzz([3,5], {3: "Fizz", 5:"Buzz"}, 3);
            });
        });
        describe("Check interactions", () => {
            test('inputs should change the text', () => {
                checkChangeText([3,5], {3:"LOL", 5:"KEK"});
            });
            test('one should change only one text', () => {
                render(<FizzBuzz />);
                changeTextWithInput(3, "LOL");
                generateTestsForFizzBuzz([3,5], {3: "LOL", 5:"Buzz"}, 3);
            })
        });
    })


})