import React from "react";
import { render, screen } from "@testing-library/react";

import HCMasterFormCreateDialogComponent from "../HCMasterFormCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hCMasterForm create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HCMasterFormCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hCMasterForm-create-dialog-component")).toBeInTheDocument();
});
