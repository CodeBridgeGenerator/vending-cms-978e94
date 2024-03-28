import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';



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

const HcStage1AgreeCreateDialogComponent = (props) => {
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
            TechProceed: _entity.TechProceed,
            SvName: _entity.SvName,
            SvSign: _entity.SvSign,
            SvDate: _entity.SvDate,
            SvProceed: _entity.SvProceed,
            ManagerName: _entity.ManagerName,
            ManagerSign: _entity.ManagerSign,
            ManagerDate: _entity.ManagerDate,
            ManagerProceed: _entity.ManagerProceed,
            Remarks: _entity.Remarks,
        };

        setLoading(true);
        try {
            
        const result = await client.service("hcStage1Agree").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info hcStage1Agree updated successfully" });
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
            <div role="hcStage1Agree-edit-dialog-component">
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
                <p className="m-0">TechProceed:</p>
                <Checkbox checked={_entity?.TechProceed} onChange={ (e) => setValByKey("TechProceed", e.checked)}  ></Checkbox>
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
                <p className="m-0">SvProceed:</p>
                <Checkbox checked={_entity?.SvProceed} onChange={ (e) => setValByKey("SvProceed", e.checked)}  ></Checkbox>
            </div>
            <div>
                <p className="m-0">ManagerName:</p>
                <InputText className="w-full mb-3" value={_entity?.ManagerName} onChange={(e) => setValByKey("ManagerName", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ManagerSign:</p>
                <InputText className="w-full mb-3" value={_entity?.ManagerSign} onChange={(e) => setValByKey("ManagerSign", e.target.value)}  />
            </div>
            <div>
                <p className="m-0">ManagerDate:</p>
                <Calendar dateFormat="dd/mm/yy hh:mm" placeholder={"dd/mm/yy hh:mm"} value={new Date(_entity?.ManagerDate)} onChange={ (e) => setValByKey("ManagerDate", e.target.value)} showTime showIcon showButtonBar ></Calendar>
            </div>
            <div>
                <p className="m-0">ManagerProceed:</p>
                <Checkbox checked={_entity?.ManagerProceed} onChange={ (e) => setValByKey("ManagerProceed", e.checked)}  ></Checkbox>
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

export default connect(mapState, mapDispatch)(HcStage1AgreeCreateDialogComponent);
