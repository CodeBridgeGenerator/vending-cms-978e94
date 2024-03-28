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

const CbStage2AgreeCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            TechName: _entity.TechName,
            TechSign: _entity.TechSign,
            TechDate: _entity.TechDate,
            TechTrade: _entity.TechTrade,
            SvName: _entity.SvName,
            SvSign: _entity.SvSign,
            SvDate: _entity.SvDate,
            SvTrade: _entity.SvTrade,
            MngrName: _entity.MngrName,
            MngrSign: _entity.MngrSign,
            MngrDate: _entity.MngrDate,
            MngrTrade: _entity.MngrTrade,
            Remarks: _entity.Remarks,
        };

        setLoading(true);
        try {
            
        const result = await client.service("cbStage2Agree").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info cbStage2Agree updated successfully" });
        props.onEditResult(result);
        
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

    

    return (
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="cbStage2Agree-edit-dialog-component">
                <div>
                <p className="m-0">TechName:</p>
                <InputText className="w-full mb-3" value={_entity?.TechName} onChange={(e) => setValByKey("TechName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">TechSign:</p>
                <InputText className="w-full mb-3" value={_entity?.TechSign} onChange={(e) => setValByKey("TechSign", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">TechDate:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.TechDate)} onChange={ (e) => setValByKey("TechDate", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">TechTrade:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.TechTrade)} onChange={ (e) => setValByKey("TechTrade", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">SvName:</p>
                <InputText className="w-full mb-3" value={_entity?.SvName} onChange={(e) => setValByKey("SvName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">SvSign:</p>
                <InputText className="w-full mb-3" value={_entity?.SvSign} onChange={(e) => setValByKey("SvSign", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">SvDate:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.SvDate)} onChange={ (e) => setValByKey("SvDate", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">SvTrade:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.SvTrade)} onChange={ (e) => setValByKey("SvTrade", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">MngrName:</p>
                <InputText className="w-full mb-3" value={_entity?.MngrName} onChange={(e) => setValByKey("MngrName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">MngrSign:</p>
                <InputText className="w-full mb-3" value={_entity?.MngrSign} onChange={(e) => setValByKey("MngrSign", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">MngrDate:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.MngrDate)} onChange={ (e) => setValByKey("MngrDate", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">MngrTrade:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.MngrTrade)} onChange={ (e) => setValByKey("MngrTrade", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">Remarks:</p>
                <InputText className="w-full mb-3" value={_entity?.Remarks} onChange={(e) => setValByKey("Remarks", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(CbStage2AgreeCreateDialogComponent);
