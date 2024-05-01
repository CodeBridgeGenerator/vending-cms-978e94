import React from "react";
import { render, screen } from "@testing-library/react";

import TicketPage from "../TicketPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders ticket page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TicketPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("ticket-datatable")).toBeInTheDocument();
    expect(screen.getByRole("ticket-add-button")).toBeInTheDocument();
});
