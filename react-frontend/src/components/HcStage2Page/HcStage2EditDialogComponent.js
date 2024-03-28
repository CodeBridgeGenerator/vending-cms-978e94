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

const HcStage2CreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [RefNo, setRefNo] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
                    //on mount hCMasterForm 
                    client
                        .service("hCMasterForm")
                        .find({ query: { $limit: 100 } })
                        .then((res) => {
                            setRefNo(res.data.map((e) => ({ name: e['RefNo'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "HCMasterForm", type: "error", message: error.message || "Failed get hCMasterForm" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            RefNo: _entity.RefNo,
            ExternalBody: _entity.ExternalBody,
            InternalBody: _entity.InternalBody,
            DisplayPanel: _entity.DisplayPanel,
            DoorHandle: _entity.DoorHandle,
            CoinReturnLever: _entity.CoinReturnLever,
            CoinReturnPocket: _entity.CoinReturnPocket,
            DeliveryDoorFlap: _entity.DeliveryDoorFlap,
            SelectorButton: _entity.SelectorButton,
            BodySticker: _entity.BodySticker,
            ProductCanister: _entity.ProductCanister,
            Chute: _entity.Chute,
            Tube: _entity.Tube,
            CarbonationUnit: _entity.CarbonationUnit,
            SyrupCanister: _entity.SyrupCanister,
            Valve: _entity.Valve,
            MachineFloorBoard: _entity.MachineFloorBoard,
            PaymentDevice: _entity.PaymentDevice,
            CashlessUnit: _entity.CashlessUnit,
            PSUBoard: _entity.PSUBoard,
            VendBoard: _entity.VendBoard,
            RelaySupply: _entity.RelaySupply,
            MemoryBoard: _entity.MemoryBoard,
            Remote: _entity.Remote,
            Compressor: _entity.Compressor,
            CoolingFan: _entity.CoolingFan,
            IceMaker: _entity.IceMaker,
        };

        setLoading(true);
        try {
            
        await client.service("hcStage2").patch(_entity._id, _data);
        const eagerResult = await client
            .service("hcStage2")
            .find({ query: { $limit: 100 ,  _id :  { $in :[_entity._id]}, $populate : [
                
                {
                    path : "RefNo",
                    service : "hCMasterForm",
                    select:["RefNo"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info hcStage2 updated successfully" });
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

    const RefNoOptions = RefNo.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="hcStage2-edit-dialog-component">
                <div>
                <p className="m-0">Reference No:</p>
                <Dropdown value={_entity?.RefNo?._id} options={RefNoOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("RefNo", e.value)} />
            </div>
            <div>
                <p className="m-0">ExternalBody:</p>
                <InputText className="w-full mb-3" value={_entity?.ExternalBody} onChange={(e) => setValByKey("ExternalBody", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">InternalBody:</p>
                <InputText className="w-full mb-3" value={_entity?.InternalBody} onChange={(e) => setValByKey("InternalBody", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">DisplayPanel:</p>
                <InputText className="w-full mb-3" value={_entity?.DisplayPanel} onChange={(e) => setValByKey("DisplayPanel", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">DoorHandle:</p>
                <InputText className="w-full mb-3" value={_entity?.DoorHandle} onChange={(e) => setValByKey("DoorHandle", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">CoinReturnLever:</p>
                <InputText className="w-full mb-3" value={_entity?.CoinReturnLever} onChange={(e) => setValByKey("CoinReturnLever", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">CoinReturnPocket:</p>
                <InputText className="w-full mb-3" value={_entity?.CoinReturnPocket} onChange={(e) => setValByKey("CoinReturnPocket", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">DeliveryDoorFlap:</p>
                <InputText className="w-full mb-3" value={_entity?.DeliveryDoorFlap} onChange={(e) => setValByKey("DeliveryDoorFlap", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">SelectorButton:</p>
                <InputText className="w-full mb-3" value={_entity?.SelectorButton} onChange={(e) => setValByKey("SelectorButton", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">BodySticker:</p>
                <InputText className="w-full mb-3" value={_entity?.BodySticker} onChange={(e) => setValByKey("BodySticker", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ProductCanister:</p>
                <InputText className="w-full mb-3" value={_entity?.ProductCanister} onChange={(e) => setValByKey("ProductCanister", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Chute:</p>
                <InputText className="w-full mb-3" value={_entity?.Chute} onChange={(e) => setValByKey("Chute", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Tube:</p>
                <InputText className="w-full mb-3" value={_entity?.Tube} onChange={(e) => setValByKey("Tube", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">CarbonationUnit:</p>
                <InputText className="w-full mb-3" value={_entity?.CarbonationUnit} onChange={(e) => setValByKey("CarbonationUnit", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">SyrupCanister:</p>
                <InputText className="w-full mb-3" value={_entity?.SyrupCanister} onChange={(e) => setValByKey("SyrupCanister", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Valve:</p>
                <InputText className="w-full mb-3" value={_entity?.Valve} onChange={(e) => setValByKey("Valve", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">MachineFloorBoard:</p>
                <InputText className="w-full mb-3" value={_entity?.MachineFloorBoard} onChange={(e) => setValByKey("MachineFloorBoard", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">PaymentDevice:</p>
                <InputText className="w-full mb-3" value={_entity?.PaymentDevice} onChange={(e) => setValByKey("PaymentDevice", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">CashlessUnit:</p>
                <InputText className="w-full mb-3" value={_entity?.CashlessUnit} onChange={(e) => setValByKey("CashlessUnit", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">PSUBoard:</p>
                <InputText className="w-full mb-3" value={_entity?.PSUBoard} onChange={(e) => setValByKey("PSUBoard", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">VendBoard:</p>
                <InputText className="w-full mb-3" value={_entity?.VendBoard} onChange={(e) => setValByKey("VendBoard", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">RelaySupply:</p>
                <InputText className="w-full mb-3" value={_entity?.RelaySupply} onChange={(e) => setValByKey("RelaySupply", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">MemoryBoard:</p>
                <InputText className="w-full mb-3" value={_entity?.MemoryBoard} onChange={(e) => setValByKey("MemoryBoard", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Remote:</p>
                <InputText className="w-full mb-3" value={_entity?.Remote} onChange={(e) => setValByKey("Remote", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Compressor:</p>
                <InputText className="w-full mb-3" value={_entity?.Compressor} onChange={(e) => setValByKey("Compressor", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">CoolingFan:</p>
                <InputText className="w-full mb-3" value={_entity?.CoolingFan} onChange={(e) => setValByKey("CoolingFan", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">IceMaker:</p>
                <InputText className="w-full mb-3" value={_entity?.IceMaker} onChange={(e) => setValByKey("IceMaker", e.target.value)}  />
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
    return{}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(HcStage2CreateDialogComponent);
