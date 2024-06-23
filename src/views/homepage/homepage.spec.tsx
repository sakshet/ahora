import { render, screen } from "@testing-library/react";
import React from "react";
import { Homepage } from "./homepage";

describe("<Homepage />", () => {
  test("renders correctly", () => {
    render(<Homepage />);
    expect(screen.getByText("We'll be back soon")).toBeInTheDocument();
    expect(screen.getByText("All good things take time")).toBeInTheDocument();
  });
});
