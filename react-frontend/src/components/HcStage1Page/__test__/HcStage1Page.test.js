import React from "react";
import { render, screen } from "@testing-library/react";

import HcStage1Page from "../HcStage1Page";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hcStage1 page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HcStage1Page />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hcStage1-datatable")).toBeInTheDocument();
    expect(screen.getByRole("hcStage1-add-button")).toBeInTheDocument();
});
