import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "./CounterComponent";

describe("Counter compoennt", () => {

  test("renders statistics good text", () => {
    render(<Counter />);
    const goodAnswersElement = screen.getByText("amount-good-answers");
    expect(goodAnswersElement).toBeInTheDocument();
  });
  
  test("renders statistics wrong text", () => {
    render(<Counter />);
    const wrongAnswersElement = screen.getByText("amount-wrong-answers");
    expect(wrongAnswersElement).toBeInTheDocument();
  });
});
