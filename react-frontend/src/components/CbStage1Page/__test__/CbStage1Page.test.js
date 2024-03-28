import React from "react";
import { render, screen } from "@testing-library/react";

import CbStage1Page from "../CbStage1Page";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cbStage1 page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CbStage1Page />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cbStage1-datatable")).toBeInTheDocument();
    expect(screen.getByRole("cbStage1-add-button")).toBeInTheDocument();
});
