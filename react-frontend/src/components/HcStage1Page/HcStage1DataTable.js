
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';

import moment from "moment";

const HcStage1DataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    const dt = useRef(null);
     
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.Ref?.RefNo}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.ExternalBody}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.InternalBody}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.DisplayPanel}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.DoorHandle}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.CoinReturnLever}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.CoinReturnPocket}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.DeliveryDoorflap}</p>
    const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.SelectorButton}</p>
    const pTemplate9 = (rowData, { rowIndex }) => <p >{rowData.BodySticker}</p>
    const pTemplate10 = (rowData, { rowIndex }) => <p >{rowData.ProductCanister}</p>
    const pTemplate11 = (rowData, { rowIndex }) => <p >{rowData.Chute}</p>
    const pTemplate12 = (rowData, { rowIndex }) => <p >{rowData.Tube}</p>
    const pTemplate13 = (rowData, { rowIndex }) => <p >{rowData.CarbonationUnit}</p>
    const pTemplate14 = (rowData, { rowIndex }) => <p >{rowData.SyrupCanister}</p>
    const pTemplate15 = (rowData, { rowIndex }) => <p >{rowData.Valve}</p>
    const pTemplate16 = (rowData, { rowIndex }) => <p >{rowData.MachineFloorBoard}</p>
    const pTemplate17 = (rowData, { rowIndex }) => <p >{rowData.PaymentDevice}</p>
    const pTemplate18 = (rowData, { rowIndex }) => <p >{rowData.CashlessUnit}</p>
    const pTemplate19 = (rowData, { rowIndex }) => <p >{rowData.PSUBoard}</p>
    const pTemplate20 = (rowData, { rowIndex }) => <p >{rowData.VendBoard}</p>
    const pTemplate21 = (rowData, { rowIndex }) => <p >{rowData.RelaySupply}</p>
    const pTemplate22 = (rowData, { rowIndex }) => <p >{rowData.MemoryBoard}</p>
    const pTemplate23 = (rowData, { rowIndex }) => <p >{rowData.Remote}</p>
    const pTemplate24 = (rowData, { rowIndex }) => <p >{rowData.Compressor}</p>
    const pTemplate25 = (rowData, { rowIndex }) => <p >{rowData.CoolingFan}</p>
    const pTemplate26 = (rowData, { rowIndex }) => <p >{rowData.IceMaker}</p>

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
            <Column field="ExternalBody" header="ExternalBody" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="InternalBody" header="InternalBody" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="DisplayPanel" header="DisplayPanel" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="DoorHandle" header="DoorHandle" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="CoinReturnLever" header="CoinReturnLever" body={pTemplate5} style={{ minWidth: "8rem" }} />
            <Column field="CoinReturnPocket" header="CoinReturnPocket" body={pTemplate6} style={{ minWidth: "8rem" }} />
            <Column field="DeliveryDoorflap" header="DeliveryDoorflap" body={pTemplate7} style={{ minWidth: "8rem" }} />
            <Column field="SelectorButton" header="SelectorButton" body={pTemplate8} style={{ minWidth: "8rem" }} />
            <Column field="BodySticker" header="BodySticker" body={pTemplate9} style={{ minWidth: "8rem" }} />
            <Column field="ProductCanister" header="ProductCanister" body={pTemplate10} style={{ minWidth: "8rem" }} />
            <Column field="Chute" header="Chute" body={pTemplate11} style={{ minWidth: "8rem" }} />
            <Column field="Tube" header="Tube" body={pTemplate12} style={{ minWidth: "8rem" }} />
            <Column field="CarbonationUnit" header="CarbonationUnit" body={pTemplate13} style={{ minWidth: "8rem" }} />
            <Column field="SyrupCanister" header="SyrupCanister" body={pTemplate14} style={{ minWidth: "8rem" }} />
            <Column field="Valve" header="Valve" body={pTemplate15} style={{ minWidth: "8rem" }} />
            <Column field="MachineFloorBoard" header="MachineFloorBoard" body={pTemplate16} style={{ minWidth: "8rem" }} />
            <Column field="PaymentDevice" header="PaymentDevice" body={pTemplate17} style={{ minWidth: "8rem" }} />
            <Column field="CashlessUnit" header="CashlessUnit" body={pTemplate18} style={{ minWidth: "8rem" }} />
            <Column field="PSUBoard" header="PSUBoard" body={pTemplate19} style={{ minWidth: "8rem" }} />
            <Column field="VendBoard" header="VendBoard" body={pTemplate20} style={{ minWidth: "8rem" }} />
            <Column field="RelaySupply" header="RelaySupply" body={pTemplate21} style={{ minWidth: "8rem" }} />
            <Column field="MemoryBoard" header="MemoryBoard" body={pTemplate22} style={{ minWidth: "8rem" }} />
            <Column field="Remote" header="Remote" body={pTemplate23} style={{ minWidth: "8rem" }} />
            <Column field="Compressor" header="Compressor" body={pTemplate24} style={{ minWidth: "8rem" }} />
            <Column field="CoolingFan" header="CoolingFan" body={pTemplate25} style={{ minWidth: "8rem" }} />
            <Column field="IceMaker" header="IceMaker" body={pTemplate26} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            {/*<Column field="createdAt" header="created" body={pCreatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedAt" header="updated" body={pUpdatedAt} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="createdBy" header="createdBy" body={pCreatedBy} sortable style={{ minWidth: "8rem" }} />*/}
            {/*<Column field="updatedBy" header="updatedBy" body={pUpdatedBy} sortable style={{ minWidth: "8rem" }} />*/}
        </DataTable>
    );
};

export default HcStage1DataTable;