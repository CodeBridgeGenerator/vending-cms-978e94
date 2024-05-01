import React from "react";
import { render, screen } from "@testing-library/react";

import CbStage2CreateDialogComponent from "../CbStage2CreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cbStage2 create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CbStage2CreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cbStage2-create-dialog-component")).toBeInTheDocument();
});
