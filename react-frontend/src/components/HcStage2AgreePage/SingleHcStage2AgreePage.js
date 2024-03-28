import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleHcStage2AgreePage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [Ref, setRef] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("hcStage2Agree")
            .get(urlParams.singleHcStage2AgreeId, { query: { $populate: ["Ref"] }})
            .then((res) => {
                set_entity(res || {});
                const Ref = Array.isArray(res.Ref)
            ? res.Ref.map((elem) => ({ _id: elem._id, RefNo: elem.RefNo }))
            : res.Ref
                ? [{ _id: res.Ref._id, RefNo: res.Ref.RefNo }]
                : [];
        setRef(Ref);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "HcStage2Agree", type: "error", message: error.message || "Failed get hcStage2Agree" });
            });
    }, [props,urlParams.singleHcStage2AgreeId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">HcStage2Agree</h3>
                </div>
                <p>hcStage2Agree/{urlParams.singleHcStage2AgreeId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">TechName</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.TechName}</p></div>
                    <label className="text-sm text-primary">TechSign</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.TechSign}</p></div>
                    <label className="text-sm text-primary">TechDate</label>
                    <div className="ml-3">{moment(_entity?.TechDate).fromNow()}</div>
                    <label className="text-sm text-primary">TechTrade</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.TechTrade}</p></div>
                    <label className="text-sm text-primary">SvName</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.SvName}</p></div>
                    <label className="text-sm text-primary">SvSign</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.SvSign}</p></div>
                    <label className="text-sm text-primary">SvDate</label>
                    <div className="ml-3">{moment(_entity?.SvDate).fromNow()}</div>
                    <label className="text-sm text-primary">SvTrade</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.SvTrade}</p></div>
                    <label className="text-sm text-primary">MngrName</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.MngrName}</p></div>
                    <label className="text-sm text-primary">MngrSign</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.MngrSign}</p></div>
                    <label className="text-sm text-primary">MngrDate</label>
                    <div className="ml-3">{moment(_entity?.MngrDate).fromNow()}</div>
                    <label className="text-sm text-primary">MngrTrade</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.MngrTrade}</p></div>
                    <label className="text-sm text-primary">Remarks</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Remarks}</p></div>
            <label className="text-sm">Ref</label>
            {Ref.map((elem) => (
                    <Link key={elem._id} to={`/hCMasterForm/${elem._id}`}>
                        <div className="card">
                            <p>{elem.RefNo}</p>
                        </div>
                    </Link>
                ))}
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

export default connect(mapState, mapDispatch)(SingleHcStage2AgreePage);
