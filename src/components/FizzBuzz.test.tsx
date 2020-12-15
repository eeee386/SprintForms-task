import React from "react";
import {FizzBuzz} from "./FizzBuzz";
import { render, screen, fireEvent } from '@testing-library/react';

describe("Test FizzBuzz Component", ()=> {
    describe("Check render", () => {
        test("should write Buzz for modulo 5", () => {
            render(<FizzBuzz />);
            expect(screen.getByTestId("5").textContent).toEqual("Buzz");
        });
        test("should write Fizz for modulo 3", () => {
            render(<FizzBuzz />);
            expect(screen.getByTestId("3").textContent).toEqual("Fizz");
        });
        test("should write FizzBuzz for modulo 15", () => {
            render(<FizzBuzz />);
            expect(screen.getByTestId("15").textContent).toEqual("FizzBuzz");
        });
    });
    describe("Check interactions", () => {
        test('threeInput should change value of Fizz', () => {
            render(<FizzBuzz />);
            const input = screen.getByTestId("threeInput");
            const button = screen.getByTestId("threeButton");
            fireEvent.change(input, { target: { value: 'LOL' } });
            fireEvent.click(button);
            expect(screen.getByTestId("3").textContent).toEqual("LOL");
        })
    });

})