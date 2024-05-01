import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleTicketPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    

    useEffect(() => {
        //on mount
        client
            .service("ticket")
            .get(urlParams.singleTicketId, { query: { $populate: [            {
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
                props.alert({ title: "Ticket", type: "error", message: error.message || "Failed get ticket" });
            });
    }, [props,urlParams.singleTicketId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Ticket</h3>
                </div>
                <p>ticket/{urlParams.singleTicketId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Location</label><p className="" >{_entity?.Location}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">DateRaised</label><p className="m-0 ml-3" >{moment(_entity?.DateRaised).fromNow()}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Address</label><p className="" >{_entity?.Address}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Description</label><p className="" >{_entity?.Description}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Status</label><p className="" >{_entity?.Status}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">AssignedTo</label><p className="" >{_entity?.assignedTo}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">DateAssigned</label><p className="m-0 ml-3" >{moment(_entity?.DateAssigned).fromNow()}</p></div>
                    <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">DateClosed</label><p className="m-0 ml-3" >{moment(_entity?.DateClosed).fromNow()}</p></div>
            

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

export default connect(mapState, mapDispatch)(SingleTicketPage);
