import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import NoteLearning from "./NoteLearning";

describe("note learning tests", () => {
  test("Answer text is hideden if user do not answer yet", () => {
    render(<NoteLearning></NoteLearning>);
    const resultTextGood = screen.queryByText("amount-good-answers");
    const resultTextWrong = screen.queryByText("wrong-good-answers");
    expect(resultTextGood).toBeNull();
    expect(resultTextWrong).toBeNull();
  });

  test("Show text according to result - good answer", async () => {
    const user = userEvent.setup();
    render(<NoteLearning></NoteLearning>);
    const buttonElements = await screen.findAllByTestId("test");
    await user.click(buttonElements[0]);

    const resultText = screen.getByText(/good/i, {
      exact: false,
    });

    expect(resultText).toBeInTheDocument();
  });

  test("show text according to result - wrong", async () => {
    const user = userEvent.setup();
    render(<NoteLearning></NoteLearning>);
    const buttonElements = screen.getAllByTestId("test");
    await user.click(buttonElements[0]);

    const resultText = screen.getByText(/wrong/i, {
      exact: false,
    });

    expect(resultText).toBeInTheDocument();
  });
});
