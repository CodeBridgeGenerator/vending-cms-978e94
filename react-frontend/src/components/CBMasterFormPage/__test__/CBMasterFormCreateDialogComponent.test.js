import React from "react";
import { render, screen } from "@testing-library/react";

import CBMasterFormCreateDialogComponent from "../CBMasterFormCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cBMasterForm create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CBMasterFormCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cBMasterForm-create-dialog-component")).toBeInTheDocument();
});
