import React from "react";
import { render, screen } from "@testing-library/react";

import CbStage1AgreePage from "../CbStage1AgreePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cbStage1Agree page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CbStage1AgreePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cbStage1Agree-datatable")).toBeInTheDocument();
    expect(screen.getByRole("cbStage1Agree-add-button")).toBeInTheDocument();
});
