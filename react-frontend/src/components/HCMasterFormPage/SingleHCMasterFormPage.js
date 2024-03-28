import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleHCMasterFormPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("hCMasterForm")
            .get(urlParams.singleHCMasterFormId, { query: { $populate: [] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "HCMasterForm", type: "error", message: error.message || "Failed get hCMasterForm" });
            });
    }, [props,urlParams.singleHCMasterFormId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">HCMasterForm</h3>
                </div>
                <p>hCMasterForm/{urlParams.singleHCMasterFormId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">RefNo</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.RefNo}</p></div>
                    <label className="text-sm text-primary">Model</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Model}</p></div>
                    <label className="text-sm text-primary">SerialNo</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.SerialNo}</p></div>
                    <label className="text-sm text-primary">ManuYear</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.ManuYear}</p></div>
                    <label className="text-sm text-primary">Branch</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Branch}</p></div>
                    <label className="text-sm text-primary">DateInspec</label>
                    <div className="ml-3">{moment(_entity?.DateInspec).fromNow()}</div>
                    <label className="text-sm text-primary">DateRecall</label>
                    <div className="ml-3">{moment(_entity?.DateRecall).fromNow()}</div>
                    <label className="text-sm text-primary">RecallLoc</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.RecallLoc}</p></div>
            
                    <label className="text-sm text-primary">created</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">updated</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
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

export default connect(mapState, mapDispatch)(SingleHCMasterFormPage);
