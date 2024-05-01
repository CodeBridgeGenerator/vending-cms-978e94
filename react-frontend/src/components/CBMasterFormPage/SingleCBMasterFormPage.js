import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleCBMasterFormPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("cBMasterForm")
            .get(urlParams.singleCBMasterFormId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "CBMasterForm", type: "error", message: error.message || "Failed get cBMasterForm" });
            });
    }, [props,urlParams.singleCBMasterFormId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">CBMasterForm</h3>
                </div>
                <p>cBMasterForm/{urlParams.singleCBMasterFormId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">RefNo</label><p className="" >{_entity?.RefNo}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Model</label><p className="" >{_entity?.Model}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">SerialNo</label><p className="" >{_entity?.SerialNo}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ManuYear</label><p className="" >{_entity?.ManuYear}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Branch</label><p className="" >{_entity?.Branch}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">DateInspec</label><p className="m-0 ml-3" >{moment(_entity?.DateInspec).fromNow()}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">DateRecall</label><p className="m-0 ml-3" >{moment(_entity?.DateRecall).fromNow()}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">RecallLoc</label><p className="" >{_entity?.RecallLoc}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">ActiveCase</label><i className={`pi ${_entity?.ActiveCase?"pi-check": "pi-times"}`}  ></i></div>
            

            <div className="col-12">&nbsp;</div>
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">created</label>
                <p className="">{moment(_entity?.createdAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">updated</label>
                <p className="">{moment(_entity?.updatedAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">createdBy</label>
                <p className="">{_entity?.createdBy?.name}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">lastUpdatedBy</label>
                <p className="">{_entity?.updatedBy?.name}</p>
            </div>

                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleCBMasterFormPage);
