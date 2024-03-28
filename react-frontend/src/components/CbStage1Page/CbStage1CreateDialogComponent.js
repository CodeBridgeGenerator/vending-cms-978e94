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
            Ref: _entity.Ref,
            ExternalBody: _entity.ExternalBody,
            InternalBody: _entity.InternalBody,
            DisplayPanel: _entity.DisplayPanel,
            DoorHandle: _entity.DoorHandle,
            CoinReturnLever: _entity.CoinReturnLever,
            CoinReturnPocket: _entity.CoinReturnPocket,
            DeliveryDoorFlap: _entity.DeliveryDoorFlap,
            SecDoorPanel: _entity.SecDoorPanel,
            SecDoorFlap: _entity.SecDoorFlap,
            ColumnStnd: _entity.ColumnStnd,
            ColumnMod: _entity.ColumnMod,
            ColumnFlipper: _entity.ColumnFlipper,
            ProductChute: _entity.ProductChute,
            MachineMaintenance: _entity.MachineMaintenance,
            PSUBoard: _entity.PSUBoard,
            VendBoard: _entity.VendBoard,
            RelaySupply: _entity.RelaySupply,
            MemoryBoard: _entity.MemoryBoard,
            Remote: _entity.Remote,
            Compressor: _entity.Compressor,
            CoolingFan: _entity.CoolingFan,
            Wiring: _entity.Wiring,
            Motor: _entity.Motor,
        };

        setLoading(true);

        try {
            
        const result = await client.service("cbStage1").create(_data);
        const eagerResult = await client
            .service("cbStage1")
            .find({ query: { $limit: 100 ,  _id :  { $in :[result._id]}, $populate : [
                
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
                        .find({ query: { $limit: 100 } })
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
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="cbStage1-create-dialog-component">
            <div>
                <p className="m-0">Ref:</p>
                <Dropdown value={_entity?.Ref} optionLabel="name" optionValue="value" options={RefOptions} onChange={(e) => setValByKey("Ref", e.value)} />
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
                <p className="m-0">SecDoorPanel:</p>
                <InputText className="w-full mb-3" value={_entity?.SecDoorPanel} onChange={(e) => setValByKey("SecDoorPanel", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">SecDoorFlap:</p>
                <InputText className="w-full mb-3" value={_entity?.SecDoorFlap} onChange={(e) => setValByKey("SecDoorFlap", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ColumnStnd:</p>
                <InputText className="w-full mb-3" value={_entity?.ColumnStnd} onChange={(e) => setValByKey("ColumnStnd", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ColumnMod:</p>
                <InputText className="w-full mb-3" value={_entity?.ColumnMod} onChange={(e) => setValByKey("ColumnMod", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ColumnFlipper:</p>
                <InputText className="w-full mb-3" value={_entity?.ColumnFlipper} onChange={(e) => setValByKey("ColumnFlipper", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ProductChute:</p>
                <InputText className="w-full mb-3" value={_entity?.ProductChute} onChange={(e) => setValByKey("ProductChute", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">MachineMaintenance:</p>
                <InputText className="w-full mb-3" value={_entity?.MachineMaintenance} onChange={(e) => setValByKey("MachineMaintenance", e.target.value)}  />
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
                <p className="m-0">Wiring:</p>
                <InputText className="w-full mb-3" value={_entity?.Wiring} onChange={(e) => setValByKey("Wiring", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Motor:</p>
                <InputText className="w-full mb-3" value={_entity?.Motor} onChange={(e) => setValByKey("Motor", e.target.value)}  />
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
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CbStage1CreateDialogComponent);
