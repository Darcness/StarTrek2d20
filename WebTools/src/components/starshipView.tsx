import React from "react";
import { Starship } from "../common/starship";
import { CharacterType } from "../common/characterType";
import { Department } from "../helpers/departments";
import { Era } from "../helpers/eras";
import { CharacterSheetRegistry } from "../helpers/sheets";
import { System } from "../helpers/systems";
import { Button } from "./button";
import { CharacterSheetDialog } from "./characterSheetDialog";
import { Header } from "./header";
import { OutlineImage } from "./outlineImage";
import { StatView } from "./StatView";
import { WeaponView } from "./weaponView";

const NBSP = '\u00A0';

interface IStarshipViewProperties {
    starship: Starship;
}

export class StarshipView extends React.Component<IStarshipViewProperties, {}> {

    componentDidMount() {
        if (this.props.starship.name) {
            document.title = this.props.starship.name + " - STAR TREK ADVENTURES";
        }
    }

    render() {
        let name = "";
        if (this.props.starship.name) {
            name = this.props.starship.name;

            if (this.props.starship.type !== CharacterType.KlingonWarrior && this.props.starship.registry) {
                name += ' • ' + this.props.starship.registry;
            }
        } else {
            name = "Unnamed Starship";
        }

        return (<div>
            <Header>{name}</Header>
            <div className="row mt-4" style={{alignItems: "baseline"}}>
                <div className="col-md-2 view-field-label pb-2">Space Frame:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{this.props.starship.className ? this.props.starship.className : NBSP}</div></div>

                <div className="col-md-2 view-field-label pb-2">Service Date:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{this.props.starship.serviceYear? this.props.starship.serviceYear : NBSP}</div></div>
            </div>

            <div className="row" style={{alignItems: "baseline"}}>
                <div className="col-md-2 view-field-label pb-2">Mission Profile:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2">{this.props.starship.missionProfileModel ? this.props.starship.missionProfileModel.name : NBSP}</div></div>

                <div className="col-md-2 view-field-label pb-2">Refits:</div>
                <div className="col-md-4 text-white"><div className="view-border-bottom pb-2 small">{this.refitAsString()}</div></div>
            </div>

            <div className="row" style={{alignItems: "baseline"}}>
                <div className="col-md-2 view-field-label pb-2">Traits:</div>
                <div className="col-md-10 text-white"><div className="view-border-bottom pb-2">{this.getAllTraits()}</div></div>
            </div>

            <div className="row">
                <div className="col-xl-6 mt-4">
                    <Header level={2}>Systems</Header>

                    <div className="row row-cols-1 row-cols-md-3 mt-3">
                        <StatView name="Comms" value={this.props.starship.getSystemValue(System.Comms)} className="col mb-1" />
                        <StatView name="Engines" value={this.props.starship.getSystemValue(System.Engines)} className="col mb-1" />
                        <StatView name="Structure" value={this.props.starship.getSystemValue(System.Structure)} className="col mb-1" />
                        <StatView name="Computers" value={this.props.starship.getSystemValue(System.Computer)} className="col mb-1" />
                        <StatView name="Sensors" value={this.props.starship.getSystemValue(System.Sensors)} className="col mb-1" />
                        <StatView name="Weapons" value={this.props.starship.getSystemValue(System.Weapons)} className="col mb-1" />
                    </div>

                    <Header level={2} className="mt-4">Departments</Header>
                    <div className="row row-cols-1 row-cols-md-3 mt-3">
                        <StatView name="Command" value={this.props.starship.departments ? this.props.starship.departments[Department.Command] : undefined} className="col mb-1" />
                        <StatView name="Security" value={this.props.starship.departments ? this.props.starship.departments[Department.Security] : undefined} className="col mb-1" />
                        <StatView name="Science" value={this.props.starship.departments ? this.props.starship.departments[Department.Science] : undefined} className="col mb-1" />
                        <StatView name="Conn" value={this.props.starship.departments ? this.props.starship.departments[Department.Conn] : undefined} className="col mb-1" />
                        <StatView name="Engineering" value={this.props.starship.departments ? this.props.starship.departments[Department.Engineering] : undefined} className="col mb-1" />
                        <StatView name="Medicine" value={this.props.starship.departments ? this.props.starship.departments[Department.Medicine] : undefined} className="col mb-1" />
                    </div>

                    <div className="mt-3">
                        <OutlineImage starship={this.props.starship} size="lg" />

                        <div className="row row-cols-1 row-cols-xl-3 mb-1">
                            <StatView name="Resistance" value={this.props.starship.scale} className="col mb-1" colourClass="red" />
                            <StatView name="Scale" value={this.props.starship.scale} className="col mb-1" colourClass="red" />
                        </div>
                    </div>
                    <Header level={2} className="mt-4">Talents</Header>
                    {this.renderTalentNames()}

                </div>
                <div className="col-xl-6 mt-4">
                    <div className="row">
                        <div className="col-xl-6">
                            <Header level={2}>Shields</Header>
                            {this.renderShields()}
                        </div>
                        <div className="col-xl-6">
                            <Header level={2}>Power / Crew</Header>
                            <div className="row row-cols-1 row-cols-1 mb-1 mt-3">
                                <StatView name="Power" value={this.props.starship.power} className="col" />
                            </div>
                            <div className="row row-cols-1 row-cols-1 mb-2">
                                <StatView name="Crew" value={this.props.starship.crewSupport} className="col" />
                            </div>
                        </div>
                    </div>
                    <Header level={2} className="mt-4">Weapons</Header>
                    {this.renderWeapons()}
                </div>
            </div>

            <div className="button-container mt-5 mb-3">
                <Button text="Export to PDF" className="button-small" onClick={() => this.showExportDialog() } buttonType={true}/>
            </div>
       </div>);
    }

    private refitAsString() {
        let refitString = this.props.starship.refitsAsString();
        return  refitString === "" ? NBSP : refitString;
    }

    private showExportDialog() {
        CharacterSheetDialog.show(CharacterSheetRegistry.getStarshipSheets(this.props.starship, Era.NextGeneration), "starship", this.props.starship);
    }

    private getAllTraits() {
        let traits = this.props.starship.getAllTraits();
        return traits === "" ? NBSP : traits;
    }

    renderTalentNames() {
        let talents = this.props.starship.getTalentNameList().map((t, i) => (<div className="text-white view-border-bottom py-2" key={'talent-' + i}>{t}</div>));
        return talents;
    }

    renderShields() {
        let shield = this.props.starship.shields;
        if (shield) {
            let iterator = [];
            for (let i = 1; i <= Math.max(25, Math.ceil(shield / 5) * 5); i++) {
                iterator.push(i);
            }

            const pills = iterator.map(i => {
                if (i <= shield) {
                    return (<div className="empty-pill mb-2" key={'shield-' + i}></div>);
                } else {
                    return (<div className="empty-pill solid mb-2" key={'shield-' + i}></div>);
                }
            });
            return (<div className="d-flex flex-wrap mt-3 mb-2">
                    {pills}
                </div>);
        } else {
            return undefined;
        }
    }

    renderWeapons() {
        let weapons = this.props.starship.determineWeapons().map((w, i) => {
            let dice = w.dice;
            if (w.scaleApplies && this.props.starship.scale) {
                dice += this.props.starship.scale;
            }
            if (w.isTractorOrGrappler) {
                dice = this.props.starship.scale - 1;
                if (this.props.starship.hasTalent("High-Power Tractor Beam")) {
                    dice += 2;
                }
            }
            if (!w.isTractorOrGrappler && this.props.starship.departments) {
                dice += this.props.starship.departments[Department.Security];
                console.log("Security " + this.props.starship.departments[Department.Security]);
            }
            return (<WeaponView key={'weapon-' + i} weapon={w} dice={dice} />);
        });
        return (<div>{weapons}</div>);
    }

}