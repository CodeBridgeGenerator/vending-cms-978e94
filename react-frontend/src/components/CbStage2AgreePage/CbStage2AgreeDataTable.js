
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

import moment from "moment";

const CbStage2AgreeDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.TechName?.RefNo}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.TechSign}</p>
    const calendarTemplate3 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.TechDate)} showTime ></Calendar>
    const calendarTemplate4 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.TechTrade)} showTime ></Calendar>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.SvName}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.SvSign}</p>
    const calendarTemplate7 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.SvDate)} showTime ></Calendar>
    const calendarTemplate8 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.SvTrade)} showTime ></Calendar>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.MngrName}</p>
    const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.MngrSign}</p>
    const calendarTemplate11 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.MngrDate)} showTime ></Calendar>
    const calendarTemplate12 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.MngrTrade)} showTime ></Calendar>
    const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.Remarks}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
      const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="TechName" header="TechName" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="TechSign" header="TechSign" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="TechDate" header="TechDate" body={calendarTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="TechTrade" header="TechTrade" body={calendarTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="SvName" header="SvName" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="SvSign" header="SvSign" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="SvDate" header="SvDate" body={calendarTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="SvTrade" header="SvTrade" body={calendarTemplate8} style={{ minWidth: "8rem" }} />
            <Column field="MngrName" header="MngrName" body={pTemplate9} style={{ minWidth: "8rem" }} />
            <Column field="MngrSign" header="MngrSign" body={pTemplate10} style={{ minWidth: "8rem" }} />
            <Column field="MngrDate" header="MngrDate" body={calendarTemplate11} style={{ minWidth: "8rem" }} />
            <Column field="MngrTrade" header="MngrTrade" body={calendarTemplate12} style={{ minWidth: "8rem" }} />
            <Column field="Remarks" header="Remarks" body={pTemplate13} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            <Column field="createdAt" header="created" body={pCreatedAt} style={{ minWidth: "8rem" }} />
            <Column field="updatedAt" header="updated" body={pUpdatedAt} style={{ minWidth: "8rem" }} />
        </DataTable>
    );
};

export default CbStage2AgreeDataTable;