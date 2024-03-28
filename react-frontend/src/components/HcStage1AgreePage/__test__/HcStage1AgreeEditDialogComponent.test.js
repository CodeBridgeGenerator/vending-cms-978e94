import React from "react";
import { render, screen } from "@testing-library/react";

import HcStage1AgreeEditDialogComponent from "../HcStage1AgreeEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hcStage1Agree edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HcStage1AgreeEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hcStage1Agree-edit-dialog-component")).toBeInTheDocument();
});
