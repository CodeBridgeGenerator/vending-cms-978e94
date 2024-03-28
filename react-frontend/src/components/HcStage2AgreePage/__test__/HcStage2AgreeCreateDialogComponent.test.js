import React from "react";
import { render, screen } from "@testing-library/react";

import HcStage2AgreeCreateDialogComponent from "../HcStage2AgreeCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hcStage2Agree create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HcStage2AgreeCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hcStage2Agree-create-dialog-component")).toBeInTheDocument();
});
