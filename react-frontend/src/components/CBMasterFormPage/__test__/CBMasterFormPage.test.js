import React from "react";
import { render, screen } from "@testing-library/react";

import CBMasterFormPage from "../CBMasterFormPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cBMasterForm page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CBMasterFormPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cBMasterForm-datatable")).toBeInTheDocument();
    expect(screen.getByRole("cBMasterForm-add-button")).toBeInTheDocument();
});
