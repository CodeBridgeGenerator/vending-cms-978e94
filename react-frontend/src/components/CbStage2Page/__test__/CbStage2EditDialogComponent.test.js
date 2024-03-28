import React from "react";
import { render, screen } from "@testing-library/react";

import CbStage2EditDialogComponent from "../CbStage2EditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cbStage2 edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CbStage2EditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cbStage2-edit-dialog-component")).toBeInTheDocument();
});
