import React from "react";
import {FizzBuzz} from "./FizzBuzz";
import { render, screen } from '@testing-library/react';

describe("Test FizzBuzz Component", ()=> {
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
})