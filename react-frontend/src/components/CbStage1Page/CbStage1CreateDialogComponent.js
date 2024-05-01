import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const CbStage1CreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [Ref, setRef] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            Ref: _entity?.Ref?._id,
            ExternalBody: _entity?.ExternalBody,
            InternalBody: _entity?.InternalBody,
            DisplayPanel: _entity?.DisplayPanel,
            DoorHandle: _entity?.DoorHandle,
            CoinReturnLever: _entity?.CoinReturnLever,
            CoinReturnPocket: _entity?.CoinReturnPocket,
            DeliveryDoorFlap: _entity?.DeliveryDoorFlap,
            SecDoorPanel: _entity?.SecDoorPanel,
            SecDoorFlap: _entity?.SecDoorFlap,
            ColumnStnd: _entity?.ColumnStnd,
            ColumnMod: _entity?.ColumnMod,
            ColumnFlipper: _entity?.ColumnFlipper,
            ProductChute: _entity?.ProductChute,
            MachineMaintenance: _entity?.MachineMaintenance,
            PSUBoard: _entity?.PSUBoard,
            VendBoard: _entity?.VendBoard,
            RelaySupply: _entity?.RelaySupply,
            MemoryBoard: _entity?.MemoryBoard,
            Remote: _entity?.Remote,
            Compressor: _entity?.Compressor,
            CoolingFan: _entity?.CoolingFan,
            Wiring: _entity?.Wiring,
            Motor: _entity?.Motor,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("cbStage1").create(_data);
        const eagerResult = await client
            .service("cbStage1")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "Ref",
                    service : "cBMasterForm",
                    select:["RefNo"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info cbStage1 updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

     useEffect(() => {
                    //on mount cBMasterForm
                    client
                        .service("cBMasterForm")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setRef(res.data.map((e) => { return { name: e['RefNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "CBMasterForm", type: "error", message: error.message || "Failed get cBMasterForm" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    const RefOptions = Ref.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create ~cb-service-displayName~" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="cbStage1-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="Ref">Ref:</label>
                    <Dropdown id="Ref" value={_entity?.Ref?._id} optionLabel="name" optionValue="value" options={RefOptions} onChange={(e) => setValByKey("Ref", {_id : e.value})} />
                </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ExternalBody">ExternalBody:</label>
                <InputText id="ExternalBody" type="text" value={_entity?.ExternalBody} onChange={(e) => setValByKey("ExternalBody", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="InternalBody">InternalBody:</label>
                <InputText id="InternalBody" type="text" value={_entity?.InternalBody} onChange={(e) => setValByKey("InternalBody", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="DisplayPanel">DisplayPanel:</label>
                <InputText id="DisplayPanel" type="text" value={_entity?.DisplayPanel} onChange={(e) => setValByKey("DisplayPanel", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="DoorHandle">DoorHandle:</label>
                <InputText id="DoorHandle" type="text" value={_entity?.DoorHandle} onChange={(e) => setValByKey("DoorHandle", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="CoinReturnLever">CoinReturnLever:</label>
                <InputText id="CoinReturnLever" type="text" value={_entity?.CoinReturnLever} onChange={(e) => setValByKey("CoinReturnLever", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="CoinReturnPocket">CoinReturnPocket:</label>
                <InputText id="CoinReturnPocket" type="text" value={_entity?.CoinReturnPocket} onChange={(e) => setValByKey("CoinReturnPocket", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="DeliveryDoorFlap">DeliveryDoorFlap:</label>
                <InputText id="DeliveryDoorFlap" type="text" value={_entity?.DeliveryDoorFlap} onChange={(e) => setValByKey("DeliveryDoorFlap", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="SecDoorPanel">SecDoorPanel:</label>
                <InputText id="SecDoorPanel" type="text" value={_entity?.SecDoorPanel} onChange={(e) => setValByKey("SecDoorPanel", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="SecDoorFlap">SecDoorFlap:</label>
                <InputText id="SecDoorFlap" type="text" value={_entity?.SecDoorFlap} onChange={(e) => setValByKey("SecDoorFlap", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ColumnStnd">ColumnStnd:</label>
                <InputText id="ColumnStnd" type="text" value={_entity?.ColumnStnd} onChange={(e) => setValByKey("ColumnStnd", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ColumnMod">ColumnMod:</label>
                <InputText id="ColumnMod" type="text" value={_entity?.ColumnMod} onChange={(e) => setValByKey("ColumnMod", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ColumnFlipper">ColumnFlipper:</label>
                <InputText id="ColumnFlipper" type="text" value={_entity?.ColumnFlipper} onChange={(e) => setValByKey("ColumnFlipper", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ProductChute">ProductChute:</label>
                <InputText id="ProductChute" type="text" value={_entity?.ProductChute} onChange={(e) => setValByKey("ProductChute", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="MachineMaintenance">MachineMaintenance:</label>
                <InputText id="MachineMaintenance" type="text" value={_entity?.MachineMaintenance} onChange={(e) => setValByKey("MachineMaintenance", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="PSUBoard">PSUBoard:</label>
                <InputText id="PSUBoard" type="text" value={_entity?.PSUBoard} onChange={(e) => setValByKey("PSUBoard", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="VendBoard">VendBoard:</label>
                <InputText id="VendBoard" type="text" value={_entity?.VendBoard} onChange={(e) => setValByKey("VendBoard", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="RelaySupply">RelaySupply:</label>
                <InputText id="RelaySupply" type="text" value={_entity?.RelaySupply} onChange={(e) => setValByKey("RelaySupply", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="MemoryBoard">MemoryBoard:</label>
                <InputText id="MemoryBoard" type="text" value={_entity?.MemoryBoard} onChange={(e) => setValByKey("MemoryBoard", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Remote">Remote:</label>
                <InputText id="Remote" type="text" value={_entity?.Remote} onChange={(e) => setValByKey("Remote", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Compressor">Compressor:</label>
                <InputText id="Compressor" type="text" value={_entity?.Compressor} onChange={(e) => setValByKey("Compressor", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="CoolingFan">CoolingFan:</label>
                <InputText id="CoolingFan" type="text" value={_entity?.CoolingFan} onChange={(e) => setValByKey("CoolingFan", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Wiring">Wiring:</label>
                <InputText id="Wiring" type="text" value={_entity?.Wiring} onChange={(e) => setValByKey("Wiring", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Motor">Motor:</label>
                <InputText id="Motor" type="text" value={_entity?.Motor} onChange={(e) => setValByKey("Motor", e.target.value)}  />
            </span>
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CbStage1CreateDialogComponent);
