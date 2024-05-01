import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
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

const CbStage1AgreeCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [Ref, setRef] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    useEffect(() => {
                    //on mount cBMasterForm 
                    client
                        .service("cBMasterForm")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setRef(res.data.map((e) => ({ name: e['RefNo'], value: e._id })));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "CBMasterForm", type: "error", message: error.message || "Failed get cBMasterForm" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            Ref: _entity?.Ref?._id,
            TechName: _entity?.TechName,
            TechSign: _entity?.TechSign,
            TechDate: _entity?.TechDate,
            TechProceed: _entity?.TechProceed,
            SvName: _entity?.SvName,
            SvSign: _entity?.SvSign,
            SvDate: _entity?.SvDate,
            SvProceed: _entity?.SvProceed,
            MngrName: _entity?.MngrName,
            MngrSign: _entity?.MngrSign,
            MngrDate: _entity?.MngrDate,
            MngrProceed: _entity?.MngrProceed,
            Remarks: _entity?.Remarks,
        };

        setLoading(true);
        try {
            
        await client.service("cbStage1Agree").patch(_entity._id, _data);
        const eagerResult = await client
            .service("cbStage1Agree")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                
                {
                    path : "Ref",
                    service : "cBMasterForm",
                    select:["RefNo"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info cbStage1Agree updated successfully" });
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
            style={{ maxWidth: "55vw" }} role="cbStage1Agree-edit-dialog-component">
                <div>
                <p className="m-0">Ref:</p>
                <Dropdown id="Ref" value={_entity?.Ref?._id} options={RefOptions} optionLabel="name" optionValue="value" onChange={(e) => setValByKey("Ref", {_id : e.value})} />
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="TechName">TechName:</label>
                <InputText id="TechName" type="text" value={_entity?.TechName} onChange={(e) => setValByKey("TechName", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="TechSign">TechSign:</label>
                <InputText id="TechSign" type="text" value={_entity?.TechSign} onChange={(e) => setValByKey("TechSign", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="TechDate">TechDate:</label>
                <Calendar id="TechDate" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(_entity?.TechDate)} onChange={ (e) => setValByKey("TechDate", new Date(e.target.value))} showIcon showButtonBar ></Calendar>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="TechProceed">TechProceed:</label>
                <InputText id="TechProceed" type="text" value={_entity?.TechProceed} onChange={(e) => setValByKey("TechProceed", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="SvName">SvName:</label>
                <InputText id="SvName" type="text" value={_entity?.SvName} onChange={(e) => setValByKey("SvName", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="SvSign">SvSign:</label>
                <InputText id="SvSign" type="text" value={_entity?.SvSign} onChange={(e) => setValByKey("SvSign", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="SvDate">SvDate:</label>
                <Calendar id="SvDate" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(_entity?.SvDate)} onChange={ (e) => setValByKey("SvDate", new Date(e.target.value))} showIcon showButtonBar ></Calendar>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="SvProceed">SvProceed:</label>
                <InputText id="SvProceed" type="text" value={_entity?.SvProceed} onChange={(e) => setValByKey("SvProceed", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="MngrName">MngrName:</label>
                <InputText id="MngrName" type="text" value={_entity?.MngrName} onChange={(e) => setValByKey("MngrName", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="MngrSign">MngrSign:</label>
                <InputText id="MngrSign" type="text" value={_entity?.MngrSign} onChange={(e) => setValByKey("MngrSign", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="MngrDate">MngrDate:</label>
                <Calendar id="MngrDate" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(_entity?.MngrDate)} onChange={ (e) => setValByKey("MngrDate", new Date(e.target.value))} showIcon showButtonBar ></Calendar>
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="MngrProceed">MngrProceed:</label>
                <InputText id="MngrProceed" type="text" value={_entity?.MngrProceed} onChange={(e) => setValByKey("MngrProceed", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Remarks">Remarks:</label>
                <InputText id="Remarks" type="text" value={_entity?.Remarks} onChange={(e) => setValByKey("Remarks", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(CbStage1AgreeCreateDialogComponent);
