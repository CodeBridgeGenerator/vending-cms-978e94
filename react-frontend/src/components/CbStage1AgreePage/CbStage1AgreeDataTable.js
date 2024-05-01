
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

import moment from "moment";

const CbStage1AgreeDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    const dt = useRef(null);
     
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.Ref?.RefNo}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.TechName}</p>
    const imageTemplate2 = (rowData, { rowIndex }) => <Image src={rowData.TechSign}  alt="Image" height="60px" />
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.TechDate}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.TechProceed}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.SvName}</p>
    const imageTemplate6 = (rowData, { rowIndex }) => <Image src={rowData.SvSign}  alt="Image" height="60px" />
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.SvDate}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.SvProceed}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.MngrName}</p>
    const imageTemplate10 = (rowData, { rowIndex }) => <Image src={rowData.MngrSign}  alt="Image" height="60px" />
    const pTemplate11 = (rowData, { rowIndex }) => <p >{rowData.MngrDate}</p>
    const pTemplate12 = (rowData, { rowIndex }) => <p >{rowData.MngrProceed}</p>
    const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.Remarks}</p>

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
            <Column field="Ref" header="Ref" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="TechName" header="TechName" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="TechSign" header="TechSign" body={imageTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="TechDate" header="TechDate" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="TechProceed" header="TechProceed" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="SvName" header="SvName" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="SvSign" header="SvSign" body={imageTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="SvDate" header="SvDate" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="SvProceed" header="SvProceed" body={pTemplate8} style={{ minWidth: "8rem" }} />
            <Column field="MngrName" header="MngrName" body={pTemplate9} style={{ minWidth: "8rem" }} />
            <Column field="MngrSign" header="MngrSign" body={imageTemplate10} style={{ minWidth: "8rem" }} />
            <Column field="MngrDate" header="MngrDate" body={pTemplate11} style={{ minWidth: "8rem" }} />
            <Column field="MngrProceed" header="MngrProceed" body={pTemplate12} style={{ minWidth: "8rem" }} />
            <Column field="Remarks" header="Remarks" body={pTemplate13} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        </DataTable>
    );
};

export default CbStage1AgreeDataTable;