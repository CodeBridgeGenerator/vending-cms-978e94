import React from "react";
import { render, screen } from "@testing-library/react";

import HCMasterFormPage from "../HCMasterFormPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hCMasterForm page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HCMasterFormPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hCMasterForm-datatable")).toBeInTheDocument();
    expect(screen.getByRole("hCMasterForm-add-button")).toBeInTheDocument();
});
