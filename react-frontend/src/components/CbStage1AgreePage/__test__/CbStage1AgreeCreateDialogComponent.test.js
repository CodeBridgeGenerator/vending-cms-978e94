import React from "react";
import { render, screen } from "@testing-library/react";

import CbStage1AgreeCreateDialogComponent from "../CbStage1AgreeCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cbStage1Agree create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CbStage1AgreeCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cbStage1Agree-create-dialog-component")).toBeInTheDocument();
});
