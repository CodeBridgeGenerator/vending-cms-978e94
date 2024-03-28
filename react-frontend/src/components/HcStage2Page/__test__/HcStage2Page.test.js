import React from "react";
import { render, screen } from "@testing-library/react";

import HcStage2Page from "../HcStage2Page";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hcStage2 page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HcStage2Page />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hcStage2-datatable")).toBeInTheDocument();
    expect(screen.getByRole("hcStage2-add-button")).toBeInTheDocument();
});
