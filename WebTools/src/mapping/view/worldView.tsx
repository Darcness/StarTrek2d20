import React from "react";
import { IPageProperties } from "../../pages/iPageProperties";
import { AsteroidBeltDetails, StandardWorldDetails, World, WorldClass, WorldDetails } from "../table/star";
import { StarSystem } from "../table/starSystem";
import { DataValueRow } from "./dataValueRow";

interface IWorldViewProperties extends IPageProperties {
    world: World;
    system: StarSystem;
}

export enum WorldCoreType {
    Heavy, Molten, Rocky, Icy
}

class WorldView extends React.Component<IWorldViewProperties, {}> {

    render() {
        let classification = "Class " + WorldClass[this.props.world.worldClass.id];
        if (this.props.world.worldClass.id === WorldClass.AsteroidBelt) {
            classification = this.props.world.worldClass.description;
        } else {
            classification += " (" + this.props.world.worldClass.description + ")";
        }

        return (<div className="mb-5">
            
            {this.renderDesignation()}
            <DataValueRow name="Classification:">{classification}</DataValueRow>
            <DataValueRow name="Orbital Radius:">{this.props.world.orbitalRadius.toFixed(2) + " AUs"}</DataValueRow>
            <DataValueRow name="Orbital Period:">{this.props.world.period.toFixed(3) + ' Earth Years'}</DataValueRow>
            {this.renderSatellites()}
            {this.renderSize(this.props.world)}
            {this.renderDetails(this.props.world.worldDetails)}
            {this.renderCore(this.props.world)}
        </div>);
    }

    renderDetails(worldDetails: WorldDetails) {
        if (worldDetails == null) {
            return undefined;
        } else if (worldDetails instanceof AsteroidBeltDetails) {
            let details = worldDetails as AsteroidBeltDetails;

            let sizeDetails = details.asteroidSize == null ? undefined :
                (<div className="row">
                <div className="col-md-4 view-field-label pb-2">Predominant Size:</div>
                <div className="col-md-8 text-white">
                    <div className="view-border-bottom pb-2">
                        {(details.asteroidSize >= 1000 ? ((details.asteroidSize / 1000).toFixed(0) + "km") : (details.asteroidSize.toFixed(0) + "m")) 
                            + " Diameter" }
                    </div>
                </div>
            </div>);
            return sizeDetails;
        } else if (worldDetails instanceof StandardWorldDetails) {
            let details = worldDetails as StandardWorldDetails;

            let rotationDetails = details.rotationPeriod == null ? undefined :
                    (<div className="row">
                    <div className="col-md-4 view-field-label pb-2">Rotation:</div>
                    <div className="col-md-8 text-white">
                        <div className="view-border-bottom pb-2">
                            {details.rotationPeriod.toFixed(2) + " hours" + (details.retrograde ? " (retrograde)" : "")}
                        </div>
                    </div>
                </div>);
            let tidallyLocked = details.tidallyLocked ? 
                (<div className="row">
                    <div className="col-md-4 view-field-label pb-2">Rotation:</div>
                    <div className="col-md-8 text-white">
                        <div className="view-border-bottom pb-2">
                            Tidally Locked
                        </div>
                    </div>
                </div>) : undefined;
            let waterDetails = details.hydrographicPercentage == null ? undefined :
                (<div className="row">
                    <div className="col-md-4 view-field-label pb-2">Water coverage:</div>
                    <div className="col-md-8 text-white">
                        <div className="view-border-bottom pb-2">
                            {details.hydrographicPercentage.toFixed(2) + '%'}
                        </div>
                    </div>
                </div>);
            let axialTilt = details.axialTilt == null ? undefined :
                (<div className="row">
                    <div className="col-md-4 view-field-label pb-2">Axial Tilt:</div>
                    <div className="col-md-8 text-white">
                        <div className="view-border-bottom pb-2">
                            {details.axialTilt.toFixed(2) + ' deg'}
                        </div>
                    </div>
                </div>);
            return (<div>
                {rotationDetails}
                {tidallyLocked}
                {axialTilt}
                {waterDetails}
            </div>);
        } else {
            return undefined;
        }
    }

    renderSize(world: World) {
        if (world == null) {
            return undefined;
        } else {
            let diameterDetails = world.diameter == null ? undefined :
                (<DataValueRow name="Diameter:">{Math.round(world.diameter).toLocaleString("en-US") + " km"}</DataValueRow>);
            let densityDetails = world.density == null ? undefined :
                (<DataValueRow name="Density:">{world.density.toFixed(2) + " Earth"}</DataValueRow>);
            let massDetails = world.mass == null ? undefined :
                (<DataValueRow name="Mass:">{(world.mass >= 1000 ? Math.round(world.mass).toLocaleString("en-US") : world.mass.toFixed(2)) + " Earth"}</DataValueRow>);
            let gravityDetails = world.gravity == null ? undefined :
                (<DataValueRow name="Gravity:">{(world.gravity.toFixed(2)) + " G"}</DataValueRow>);
            return (<div>
                    {diameterDetails}
                    {densityDetails}
                    {massDetails}
                    {gravityDetails}
                </div>);
        }
    }

    renderCore(world: World) {
        if (world.coreType == null) {
            return undefined;
        } else {
            return (<DataValueRow name="Core:">{WorldCoreType[world.coreType]}</DataValueRow>);
        }
    }

    renderSatellites() {
        if (this.props.world.worldClass.id === WorldClass.AsteroidBelt) {
            return undefined;
        } else {
            return (<DataValueRow name="Satellites:">{this.props.world.numberOfSatellites}</DataValueRow>);
        }
    }

    renderDesignation() {
        if (this.props.world && this.props.world.orbit != null) {
            return (<DataValueRow name="Designation:">
                {(this.props.system.friendlyName ? this.props.system.friendlyName + ' ' : '') + this.props.world.orbitLabel}
            </DataValueRow>);
        } else {
            return undefined;
        }
    }
}

export default WorldView;