import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
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

const HcStage2AgreeCreateDialogComponent = (props) => {
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
            TechName: _entity?.TechName,
            TechSign: _entity?.TechSign,
            TechDate: _entity?.TechDate,
            TechTrade: _entity?.TechTrade,
            SvName: _entity?.SvName,
            SvSign: _entity?.SvSign,
            SvDate: _entity?.SvDate,
            SvTrade: _entity?.SvTrade,
            MngrName: _entity?.MngrName,
            MngrSign: _entity?.MngrSign,
            MngrDate: _entity?.MngrDate,
            MngrTrade: _entity?.MngrTrade,
            Remarks: _entity?.Remarks,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("hcStage2Agree").create(_data);
        const eagerResult = await client
            .service("hcStage2Agree")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "Ref",
                    service : "hCMasterForm",
                    select:["RefNo"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info hcStage2Agree updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

     useEffect(() => {
                    //on mount hCMasterForm
                    client
                        .service("hCMasterForm")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setRef(res.data.map((e) => { return { name: e['RefNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "HCMasterForm", type: "error", message: error.message || "Failed get hCMasterForm" });
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
            style={{ maxWidth: "55vw" }} role="hcStage2Agree-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
                <span className="align-items-center">
                    <label htmlFor="Ref">Ref:</label>
                    <Dropdown id="Ref" value={_entity?.Ref?._id} optionLabel="name" optionValue="value" options={RefOptions} onChange={(e) => setValByKey("Ref", {_id : e.value})} />
                </span>
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
                <label htmlFor="TechTrade">TechTrade:</label>
                <InputText id="TechTrade" type="text" value={_entity?.TechTrade} onChange={(e) => setValByKey("TechTrade", e.target.value)}  />
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
                <label htmlFor="SvTrade">SvTrade:</label>
                <InputText id="SvTrade" type="text" value={_entity?.SvTrade} onChange={(e) => setValByKey("SvTrade", e.target.value)}  />
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
                <label htmlFor="MngrTrade">MngrTrade:</label>
                <InputText id="MngrTrade" type="text" value={_entity?.MngrTrade} onChange={(e) => setValByKey("MngrTrade", e.target.value)}  />
            </span>
            </div>
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="Remarks">Remarks:</label>
                <InputText id="Remarks" type="text" value={_entity?.Remarks} onChange={(e) => setValByKey("Remarks", e.target.value)}  />
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

export default connect(mapState, mapDispatch)(HcStage2AgreeCreateDialogComponent);
