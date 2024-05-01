
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

import moment from "moment";

const CBMasterFormDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    const dt = useRef(null);
     
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.RefNo}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.Model}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.SerialNo}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.ManuYear}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.Branch}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.DateInspec}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.DateRecall}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.RecallLoc}</p>
    const checkboxTemplate8 = (rowData, { rowIndex }) => <Checkbox checked={rowData.ActiveCase}  ></Checkbox>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    const pCreatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.createdAt).fromNow()}</p>);
    const pUpdatedAt = (rowData, { rowIndex }) => (<p>{moment(rowData.updatedAt).fromNow()}</p>);
    const pCreatedBy = (rowData, { rowIndex }) => (
        <p>{rowData.createdBy?.name}</p>
    );
    const pUpdatedBy = (rowData, { rowIndex }) => (<p>{rowData.updatedBy?.name}</p>);
    const paginatorLeft = (<Button type="button" icon="pi pi-refresh" text onClick={() => setRefresh(!refresh)}/>);
    const paginatorRight = <Button type="button" icon="pi pi-download" text onClick={() => exportCSV()}/>;
    const exportCSV = () => {dt.current?.exportCSV();};

    return (
        <DataTable value={items} ref={dt} onRowClick={onRowClick} scrollable rowHover stripedRows paginator rows={10} rowsPerPageOptions={[10, 50, 250, 500]} size={"small"}  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} rowClassName="cursor-pointer">
            <Column field="RefNo" header="RefNo" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="Model" header="Model" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="SerialNo" header="SerialNo" body={pTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="ManuYear" header="ManuYear" body={pTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="Branch" header="Branch" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="DateInspec" header="DateInspec" body={pTemplate5} sortable style={{ minWidth: "8rem" }} />
            <Column field="DateRecall" header="DateRecall" body={pTemplate6} sortable style={{ minWidth: "8rem" }} />
            <Column field="RecallLoc" header="RecallLoc" body={pTemplate7} sortable style={{ minWidth: "8rem" }} />
            <Column field="ActiveCase" header="ActiveCase" body={checkboxTemplate8} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        </DataTable>
    );
};

export default CBMasterFormDataTable;