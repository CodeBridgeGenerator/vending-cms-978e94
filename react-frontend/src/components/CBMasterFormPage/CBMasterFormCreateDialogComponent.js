import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';



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

const CBMasterFormCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const onSave = async () => {
        let _data = {
            RefNo: _entity.RefNo,
            Model: _entity.Model,
            SerialNo: _entity.SerialNo,
            ManuYear: _entity.ManuYear,
            Branch: _entity.Branch,
            DateInspec: _entity.DateInspec,
            DateRecall: _entity.DateRecall,
            RecallLoc: _entity.RecallLoc,
        };

        setLoading(true);

        try {
            
        const result = await client.service("cBMasterForm").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info cBMasterForm created successfully" });
        props.onCreateResult(result);
        
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
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

    

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="cBMasterForm-create-dialog-component">
            <div>
                <p className="m-0">RefNo:</p>
                <InputText className="w-full mb-3" value={_entity?.RefNo} onChange={(e) => setValByKey("RefNo", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Model:</p>
                <InputText className="w-full mb-3" value={_entity?.Model} onChange={(e) => setValByKey("Model", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">SerialNo:</p>
                <InputText className="w-full mb-3" value={_entity?.SerialNo} onChange={(e) => setValByKey("SerialNo", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ManuYear:</p>
                <InputText className="w-full mb-3" value={_entity?.ManuYear} onChange={(e) => setValByKey("ManuYear", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">Branch:</p>
                <InputText className="w-full mb-3" value={_entity?.Branch} onChange={(e) => setValByKey("Branch", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">DateInspec:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.DateInspec)} onChange={ (e) => setValByKey("DateInspec", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">DateRecall:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.DateRecall)} onChange={ (e) => setValByKey("DateRecall", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">RecallLoc:</p>
                <InputText className="w-full mb-3" value={_entity?.RecallLoc} onChange={(e) => setValByKey("RecallLoc", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(CBMasterFormCreateDialogComponent);
