import React from "react";
import { render, screen } from "@testing-library/react";

import CbStage2AgreePage from "../CbStage2AgreePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cbStage2Agree page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CbStage2AgreePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cbStage2Agree-datatable")).toBeInTheDocument();
    expect(screen.getByRole("cbStage2Agree-add-button")).toBeInTheDocument();
});
