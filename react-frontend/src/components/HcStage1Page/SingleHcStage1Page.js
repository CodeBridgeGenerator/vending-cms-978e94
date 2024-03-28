import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleHcStage1Page = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [Ref, setRef] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("hcStage1")
            .get(urlParams.singleHcStage1Id, { query: { $populate: ["Ref"] }})
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
                props.alert({ title: "HcStage1", type: "error", message: error.message || "Failed get hcStage1" });
            });
    }, [props,urlParams.singleHcStage1Id]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">HcStage1</h3>
                </div>
                <p>hcStage1/{urlParams.singleHcStage1Id}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">DisplayPanel</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.DisplayPanel}</p></div>
                    <label className="text-sm text-primary">DoorHandle</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.DoorHandle}</p></div>
                    <label className="text-sm text-primary">CoinReturnLever</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.CoinReturnLever}</p></div>
                    <label className="text-sm text-primary">CoinReturnPocket</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.CoinReturnPocket}</p></div>
                    <label className="text-sm text-primary">DeliveryDoorflap</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.DeliveryDoorflap}</p></div>
                    <label className="text-sm text-primary">SelectorButton</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.SelectorButton}</p></div>
                    <label className="text-sm text-primary">BodySticker</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.BodySticker}</p></div>
                    <label className="text-sm text-primary">ProductCanister</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.ProductCanister}</p></div>
                    <label className="text-sm text-primary">Chute</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Chute}</p></div>
                    <label className="text-sm text-primary">Tube</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Tube}</p></div>
                    <label className="text-sm text-primary">CarbonationUnit</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.CarbonationUnit}</p></div>
                    <label className="text-sm text-primary">SyrupCanister</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.SyrupCanister}</p></div>
                    <label className="text-sm text-primary">Valve</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Valve}</p></div>
                    <label className="text-sm text-primary">MachineFloorBoard</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.MachineFloorBoard}</p></div>
                    <label className="text-sm text-primary">PaymentDevice</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.PaymentDevice}</p></div>
                    <label className="text-sm text-primary">CashlessUnit</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.CashlessUnit}</p></div>
                    <label className="text-sm text-primary">PSUBoard</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.PSUBoard}</p></div>
                    <label className="text-sm text-primary">VendBoard</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.VendBoard}</p></div>
                    <label className="text-sm text-primary">RelaySupply</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.RelaySupply}</p></div>
                    <label className="text-sm text-primary">MemoryBoard</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.MemoryBoard}</p></div>
                    <label className="text-sm text-primary">Remote</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Remote}</p></div>
                    <label className="text-sm text-primary">Compressor</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.Compressor}</p></div>
                    <label className="text-sm text-primary">CoolingFan</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.CoolingFan}</p></div>
                    <label className="text-sm text-primary">IceMaker</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.IceMaker}</p></div>
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

export default connect(mapState, mapDispatch)(SingleHcStage1Page);
