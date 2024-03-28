import React from "react";
import { render, screen } from "@testing-library/react";

import HcStage2AgreePage from "../HcStage2AgreePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hcStage2Agree page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HcStage2AgreePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hcStage2Agree-datatable")).toBeInTheDocument();
    expect(screen.getByRole("hcStage2Agree-add-button")).toBeInTheDocument();
});
