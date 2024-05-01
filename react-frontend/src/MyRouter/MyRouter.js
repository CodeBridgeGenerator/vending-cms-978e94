import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';
import WhatToDoPage from '../components/WhatTodo';

import UsersPage from "../components/UsersPage/UsersPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
import UserProjectLayoutPage from "../components/UsersPage/UserProjectLayoutPage";
import HCMasterFormPage from "../components/HCMasterFormPage/HCMasterFormPage";
import SingleHCMasterFormPage from "../components/HCMasterFormPage/SingleHCMasterFormPage";
import CBMasterFormPage from "../components/CBMasterFormPage/CBMasterFormPage";
import SingleCBMasterFormPage from "../components/CBMasterFormPage/SingleCBMasterFormPage";
import HcStage1Page from "../components/HcStage1Page/HcStage1Page";
import SingleHcStage1Page from "../components/HcStage1Page/SingleHcStage1Page";
import HcStage2Page from "../components/HcStage2Page/HcStage2Page";
import SingleHcStage2Page from "../components/HcStage2Page/SingleHcStage2Page";
import HcStage1AgreePage from "../components/HcStage1AgreePage/HcStage1AgreePage";
import SingleHcStage1AgreePage from "../components/HcStage1AgreePage/SingleHcStage1AgreePage";
import HcStage2AgreePage from "../components/HcStage2AgreePage/HcStage2AgreePage";
import SingleHcStage2AgreePage from "../components/HcStage2AgreePage/SingleHcStage2AgreePage";
import CbStage1Page from "../components/CbStage1Page/CbStage1Page";
import SingleCbStage1Page from "../components/CbStage1Page/SingleCbStage1Page";
import CbStage2Page from "../components/CbStage2Page/CbStage2Page";
import SingleCbStage2Page from "../components/CbStage2Page/SingleCbStage2Page";
import CbStage1AgreePage from "../components/CbStage1AgreePage/CbStage1AgreePage";
import SingleCbStage1AgreePage from "../components/CbStage1AgreePage/SingleCbStage1AgreePage";
import CbStage2AgreePage from "../components/CbStage2AgreePage/CbStage2AgreePage";
import SingleCbStage2AgreePage from "../components/CbStage2AgreePage/SingleCbStage2AgreePage";
import TicketPage from "../components/TicketPage/TicketPage";
import SingleTicketPage from "../components/TicketPage/SingleTicketPage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
                    <Route path="/users" exact element={<UsersPage />} />
                    <Route path="/users/:singleUsersId" exact element={<UserProjectLayoutPage />} />
                    <Route path="/users/:singleUsersId/single" exact element={<SingleUsersPage />} />
                    <Route path="/hCMasterForm" exact element={<HCMasterFormPage />} />
                    <Route path="/hCMasterForm/:singleHCMasterFormId" exact element={<SingleHCMasterFormPage />} />
                    <Route path="/cBMasterForm" exact element={<CBMasterFormPage />} />
                    <Route path="/cBMasterForm/:singleCBMasterFormId" exact element={<SingleCBMasterFormPage />} />
                    <Route path="/hcStage1" exact element={<HcStage1Page />} />
                    <Route path="/hcStage1/:singleHcStage1Id" exact element={<SingleHcStage1Page />} />
                    <Route path="/hcStage2" exact element={<HcStage2Page />} />
                    <Route path="/hcStage2/:singleHcStage2Id" exact element={<SingleHcStage2Page />} />
                    <Route path="/hcStage1Agree" exact element={<HcStage1AgreePage />} />
                    <Route path="/hcStage1Agree/:singleHcStage1AgreeId" exact element={<SingleHcStage1AgreePage />} />
                    <Route path="/hcStage2Agree" exact element={<HcStage2AgreePage />} />
                    <Route path="/hcStage2Agree/:singleHcStage2AgreeId" exact element={<SingleHcStage2AgreePage />} />
                    <Route path="/cbStage1" exact element={<CbStage1Page />} />
                    <Route path="/cbStage1/:singleCbStage1Id" exact element={<SingleCbStage1Page />} />
                    <Route path="/cbStage2" exact element={<CbStage2Page />} />
                    <Route path="/cbStage2/:singleCbStage2Id" exact element={<SingleCbStage2Page />} />
                    <Route path="/cbStage1Agree" exact element={<CbStage1AgreePage />} />
                    <Route path="/cbStage1Agree/:singleCbStage1AgreeId" exact element={<SingleCbStage1AgreePage />} />
                    <Route path="/cbStage2Agree" exact element={<CbStage2AgreePage />} />
                    <Route path="/cbStage2Agree/:singleCbStage2AgreeId" exact element={<SingleCbStage2AgreePage />} />
                    <Route path="/ticket" exact element={<TicketPage />} />
                    <Route path="/ticket/:singleTicketId" exact element={<SingleTicketPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
