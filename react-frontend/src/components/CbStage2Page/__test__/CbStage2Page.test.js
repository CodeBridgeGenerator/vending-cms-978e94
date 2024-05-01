import React from "react";
import { render, screen } from "@testing-library/react";

import CbStage2Page from "../CbStage2Page";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cbStage2 page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CbStage2Page />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cbStage2-datatable")).toBeInTheDocument();
    expect(screen.getByRole("cbStage2-add-button")).toBeInTheDocument();
});
