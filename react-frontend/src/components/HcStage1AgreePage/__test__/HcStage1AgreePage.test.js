import React from "react";
import { render, screen } from "@testing-library/react";

import HcStage1AgreePage from "../HcStage1AgreePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hcStage1Agree page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HcStage1AgreePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hcStage1Agree-datatable")).toBeInTheDocument();
    expect(screen.getByRole("hcStage1Agree-add-button")).toBeInTheDocument();
});
