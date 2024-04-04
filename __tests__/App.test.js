// App.test.js
/** @jest-environment jsdom */
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MOCK_ONE_NASA_DATA } from "../mocks/mockNasaData";
import App from "../src/App";
import Header from "../src/components/Header";
import SizeSlider from "../src/components/SizeSlider";
import format from "date-fns/format";
const initialFetch = window.fetch;

describe("App", () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCK_ONE_NASA_DATA),
      })
    );
  });

  afterEach(() => {
    window.fetch = initialFetch;
  });

  // integration test (ensures that multiple components within the App work together and that the Control Panel is rendered)
  test("renders Control Panel component", async () => {
      render(<App />);
    const text = await screen.findByText(/Control Panel/i);
    expect(text).toBeInTheDocument();
  });

  // unit test (focuses on testing the Header component in isolation)
  test("render header component", () => {
      render(<Header />);
    const headerElement = screen.getByRole("heading");
    expect(headerElement).toContainHTML("NASA Images");
  });

  // integration test (verifies the rendering of the date picker component within the context of the App.)
  test("renders date picker component", async () => {
    await act(async () => {
      render(<App />);
    });
    const datePickerElement = screen.getByLabelText("nasa date picker");
    expect(datePickerElement).toBeInTheDocument();
  });

  // integration test (involves interactions between components within the App, specifically between the date picker component and the component that displays the selected date.)
  test("change date when user selects a new date", async () => {
    await act(async () => {
      render(<App />);
    });
    const date = format(new Date("07/04/2023"), "MM/dd/yyy");
    const datePickerElement = screen.getByLabelText("nasa date picker");
      fireEvent.change(datePickerElement, { target: { value: date } });
    const updatedDate = screen.getByDisplayValue("07/04/2023");
    expect(updatedDate).toBeInTheDocument();
  });

  // unit test (focus on the behavior of the SizeSlider component in isolation)
  test("renders size slider component", () => {
    const mockSetSize = jest.fn();
      render(<SizeSlider size={50} setSize={mockSetSize} />);
    const sliderElement = screen.getByRole("slider");
    expect(sliderElement).toBeInTheDocument();
  });

  // unit test (focus on the behavior of the SizeSlider component in isolation)
  test("size value set by props", () => {
    const mockSetSize = jest.fn();
      render(<SizeSlider size={50} setSize={mockSetSize} />)
    const sliderElement = screen.getByRole("slider");
    expect(sliderElement).toHaveValue("50");
  });

  // integration test (involves an interaction between the SizeSlider component and the slider element, ensuring that user input is correctly reflected.)
  test("size value reflects user input", async () => {
    await act(async () => {
      render(<App />);
    });
    const sliderElement = screen.getByRole("slider");
      fireEvent.change(sliderElement, { target: { value: "100" } });
    expect(sliderElement).toHaveValue("100");
  });

  // // functional test (simulates the user experience by rendering the entire App and checking if the default image is displayed)
  // test("default image loads", async () => {
  //   await act(async () => {
  //     render(<App />);
  //   })
  //   const image = screen.getByRole("img");
  //   expect(image.src).toContain("loading.jpeg");
  // });
});
