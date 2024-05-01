import React from "react";
import { render, screen } from "@testing-library/react";

import CbStage1CreateDialogComponent from "../CbStage1CreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cbStage1 create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CbStage1CreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cbStage1-create-dialog-component")).toBeInTheDocument();
});
