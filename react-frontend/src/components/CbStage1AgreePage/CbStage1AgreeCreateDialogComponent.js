import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
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

const CbStage1AgreeCreateDialogComponent = (props) => {
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
            TechName: _entity.TechName,
            TechSign: _entity.TechSign,
            TechDate: _entity.TechDate,
            TechProceed: _entity.TechProceed,
            SvName: _entity.SvName,
            SvSign: _entity.SvSign,
            SvDate: _entity.SvDate,
            SvProcedd: _entity.SvProcedd,
            MngrName: _entity.MngrName,
            MngrSign: _entity.MngrSign,
            MngrDate: _entity.MngrDate,
            MngrProceed: _entity.MngrProceed,
            Remarks: _entity.Remarks,
        };

        setLoading(true);

        try {
            
        const result = await client.service("cbStage1Agree").create(_data);
        const eagerResult = await client
            .service("cbStage1Agree")
            .find({ query: { $limit: 100 ,  _id :  { $in :[result._id]}, $populate : [
                
                {
                    path : "Ref",
                    service : "cBMasterForm",
                    select:["RefNo"]
                }
            
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info cbStage1Agree updated successfully" });
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
            <div role="cbStage1Agree-create-dialog-component">
            <div>
                <p className="m-0">Ref:</p>
                <Dropdown value={_entity?.Ref} optionLabel="name" optionValue="value" options={RefOptions} onChange={(e) => setValByKey("Ref", e.value)} />
            </div>
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
                <p className="m-0">SvProcedd:</p>
                <Checkbox checked={_entity?.SvProcedd} onChange={ (e) => setValByKey("SvProcedd", e.checked)}  ></Checkbox>
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
                <p className="m-0">MngrProceed:</p>
                <Checkbox checked={_entity?.MngrProceed} onChange={ (e) => setValByKey("MngrProceed", e.checked)}  ></Checkbox>
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
    return {}
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(CbStage1AgreeCreateDialogComponent);
