import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import moment from "moment";
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

const HcStage1CreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [Ref, setRef] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
                    //on mount hCMasterForm 
                    client
                        .service("hCMasterForm")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setRef(res.data.map((e) => ({ name: e['RefNo'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "HCMasterForm", type: "error", message: error.message || "Failed get hCMasterForm" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            Ref: _entity?.Ref?._id,
            InternalBody: _entity?.InternalBody,
            DisplayPanel: _entity?.DisplayPanel,
            DoorHandle: _entity?.DoorHandle,
            CoinReturnLever: _entity?.CoinReturnLever,
            CoinReturnPocket: _entity?.CoinReturnPocket,
            DeliveryDoorflap: _entity?.DeliveryDoorflap,
            SelectorButton: _entity?.SelectorButton,
            BodySticker: _entity?.BodySticker,
            ProductCanister: _entity?.ProductCanister,
            Chute: _entity?.Chute,
            Tube: _entity?.Tube,
            CarbonationUnit: _entity?.CarbonationUnit,
            SyrupCanister: _entity?.SyrupCanister,
            Valve: _entity?.Valve,
            MachineFloorBoard: _entity?.MachineFloorBoard,
            PaymentDevice: _entity?.PaymentDevice,
            CashlessUnit: _entity?.CashlessUnit,
            PSUBoard: _entity?.PSUBoard,
            VendBoard: _entity?.VendBoard,
            RelaySupply: _entity?.RelaySupply,
            MemoryBoard: _entity?.MemoryBoard,
            Remote: _entity?.Remote,
            Compressor: _entity?.Compressor,
            CoolingFan: _entity?.CoolingFan,
            IceMaker: _entity?.IceMaker,
        };

        setLoading(true);
        try {
            
        await client.service("hcStage1").patch(_entity._id, _data);
        const eagerResult = await client
            .service("hcStage1")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                
                {
                    path : "Ref",
                    service : "hCMasterForm",
                    select:["RefNo"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info hcStage1 updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

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
    // children dropdown options

    const RefOptions = Ref.map((elem) => ({ name: elem.name, value: elem.value })).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric : true, sensitivity: "base"}));

    return (
        <Dialog header="Edit ~cb-service-displayName~" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="hcStage1-edit-dialog-component">
                <div>
                <p className="m-0">Ref:</p>
                <Dropdown id="Ref" value={_entity?.Ref?._id} options={RefOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("Ref", {_id : e.value})} />
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
                <label htmlFor="DeliveryDoorflap">DeliveryDoorflap:</label>
                <InputText id="DeliveryDoorflap" type="text" value={_entity?.DeliveryDoorflap} onChange={(e) => setValByKey("DeliveryDoorflap", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="SelectorButton">SelectorButton:</label>
                <InputText id="SelectorButton" type="text" value={_entity?.SelectorButton} onChange={(e) => setValByKey("SelectorButton", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="BodySticker">BodySticker:</label>
                <InputText id="BodySticker" type="text" value={_entity?.BodySticker} onChange={(e) => setValByKey("BodySticker", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="ProductCanister">ProductCanister:</label>
                <InputText id="ProductCanister" type="text" value={_entity?.ProductCanister} onChange={(e) => setValByKey("ProductCanister", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Chute">Chute:</label>
                <InputText id="Chute" type="text" value={_entity?.Chute} onChange={(e) => setValByKey("Chute", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Tube">Tube:</label>
                <InputText id="Tube" type="text" value={_entity?.Tube} onChange={(e) => setValByKey("Tube", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="CarbonationUnit">CarbonationUnit:</label>
                <InputText id="CarbonationUnit" type="text" value={_entity?.CarbonationUnit} onChange={(e) => setValByKey("CarbonationUnit", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="SyrupCanister">SyrupCanister:</label>
                <InputText id="SyrupCanister" type="text" value={_entity?.SyrupCanister} onChange={(e) => setValByKey("SyrupCanister", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Valve">Valve:</label>
                <InputText id="Valve" type="text" value={_entity?.Valve} onChange={(e) => setValByKey("Valve", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="MachineFloorBoard">MachineFloorBoard:</label>
                <InputText id="MachineFloorBoard" type="text" value={_entity?.MachineFloorBoard} onChange={(e) => setValByKey("MachineFloorBoard", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="PaymentDevice">PaymentDevice:</label>
                <InputText id="PaymentDevice" type="text" value={_entity?.PaymentDevice} onChange={(e) => setValByKey("PaymentDevice", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="CashlessUnit">CashlessUnit:</label>
                <InputText id="CashlessUnit" type="text" value={_entity?.CashlessUnit} onChange={(e) => setValByKey("CashlessUnit", e.target.value)}  />
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
                <label htmlFor="IceMaker">IceMaker:</label>
                <InputText id="IceMaker" type="text" value={_entity?.IceMaker} onChange={(e) => setValByKey("IceMaker", e.target.value)}  />
            </span>
            </div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">createdAt:{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">lastUpdatedAt:{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">createdBy:{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">lastUpdatedBy:{" " +_entity?.updatedBy?.name}</p></div>
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

export default connect(mapState, mapDispatch)(HcStage1CreateDialogComponent);
