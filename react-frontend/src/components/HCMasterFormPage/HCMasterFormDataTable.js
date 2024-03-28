
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

import moment from "moment";

const HCMasterFormDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.RefNo}</p>
    const inputTemplate1 = (rowData, { rowIndex }) => <InputText value={rowData.Model}  />
    const inputTemplate2 = (rowData, { rowIndex }) => <InputText value={rowData.SerialNo}  />
    const inputTemplate3 = (rowData, { rowIndex }) => <InputText value={rowData.ManuYear}  />
    const inputTemplate4 = (rowData, { rowIndex }) => <InputText value={rowData.Branch}  />
    const calendarTemplate5 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.DateInspec)} showTime ></Calendar>
    const calendarTemplate6 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.DateRecall)} showTime ></Calendar>
    const inputTemplate7 = (rowData, { rowIndex }) => <InputText value={rowData.RecallLoc}  />

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="RefNo" header="RefNo" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="Model" header="Model" body={inputTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="SerialNo" header="SerialNo" body={inputTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="ManuYear" header="ManuYear" body={inputTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="Branch" header="Branch" body={inputTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="DateInspec" header="DateInspec" body={calendarTemplate5} sortable style={{ minWidth: "8rem" }} />
            <Column field="DateRecall" header="DateRecall" body={calendarTemplate6} sortable style={{ minWidth: "8rem" }} />
            <Column field="RecallLoc" header="RecallLoc" body={inputTemplate7} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default HCMasterFormDataTable;