import { Department } from "../helpers/departments";
import { MissionProfileModel } from "../helpers/missionProfiles";
import { MissionPod, MissionPodViewModel, SpaceframeHelper, SpaceframeViewModel } from "../helpers/spaceframes";
import { System } from "../helpers/systems";
import { TalentViewModel } from "../helpers/talents";
import { Weapon } from "../helpers/weapons";
import { CharacterType } from "./characterType";
import { Construct } from "./construct";

export class Starship extends Construct {
    registry: string = "";
    traits: string = "";
    serviceYear?: number;
    spaceframeModel?: SpaceframeViewModel = undefined;
    missionPod?: MissionPod;
    missionPodModel?: MissionPodViewModel;
    missionProfileModel?: MissionProfileModel;
    systems: number[];
    departments: number[];
    scale: number;
    profileTalent?: TalentViewModel;
    additionalTalents: TalentViewModel[] = [];
    refits: System[] = [];

    constructor() {
        super();
        this.systems = [];
        this.departments = [];
        this.scale = 0;
        this.name = "";
    }

    getAllTraits() {
        let trait = this.type === CharacterType.KlingonWarrior ? "Klingon Starship" : "Federation Starship";
        if (this.spaceframeModel) {
            trait = this.spaceframeModel.additionalTraits.join(', ');
        }
        if (this.missionProfileModel && this.missionProfileModel.traits && this.missionProfileModel.traits !== "") {
            trait += (", " + this.missionProfileModel.traits);
        }
        if (this.traits) {
            trait += `, ${this.traits}`;
        }
        return trait;
    }

    getBaseSystem(system: System) {
        let result = 0;
        if (this.spaceframeModel) {
            result = this.spaceframeModel.systems[system];
            if (this.spaceframeModel.isMissionPodAvailable && this.missionPodModel) {
                result += this.missionPodModel.systems[system];
            }
        }
        return result;
    }
    getSystemValue(system: System) {
        let base = this.getBaseSystem(system);
        this.refits.forEach(r => { if (r === system) base++});
        return base;
    }

    getTalentNameList() {
        let talents = [];

        if (this.spaceframeModel) {
            talents = [...this.spaceframeModel.talents.map(t => { return t.name; })];
        }

        if (this.profileTalent) {
            talents.push(this.profileTalent.name);
        }
        this.additionalTalents.forEach(t => {
            talents.push(t.name);
        });
        const missionPod = SpaceframeHelper.getMissionPod(this.missionPod);
        if (missionPod) {
            missionPod.talents.forEach(t => {
                talents.push(t.name);
            });
        }
        return talents;
    }

    getShields() {
        if (this.systems && this.departments) {
            let base = this.systems[System.Structure] + this.departments[Department.Security];
            if (this.getTalentNameList().indexOf("Advanced Shields") > -1) {
                base += 5;
            }
            return base;
        } else {
            return undefined;
        }
    }

    refitsAsString() {
        let systems: System[] = [ System.Comms, System.Computer, System.Engines, System.Sensors, System.Structure, System.Weapons ];
        let refitString = "";
        if (this.refits) {
            systems.forEach(s => {
                let value = 0;
                this.refits.forEach(r => value += (r === s) ? 1 : 0);
                if (value > 0) {
                    if (refitString !== "") {
                        refitString += ", ";
                    }
                    refitString += "+" + value + " " + System[s];
                }
            });
        }
        return refitString;
    }

    determineWeapons(): Weapon[] {
        var result = [];
        var secondary = [];
        const talents = this.getTalentNameList();
        const spaceframe = this.spaceframeModel;
        if (spaceframe) {
            for (var attack of spaceframe.attacks) {

                if (attack === 'Photon Torpedoes') {
                    result.push(new Weapon(attack, 3, "High Yield"));
                } else if (attack === 'Phaser Cannons' || attack === 'Phase Cannons') {
                    result.push(new Weapon(attack, 2, "Versatile 2", true));
                } else if (attack === 'Phaser Banks') {
                    result.push(new Weapon(attack, 1, "Versatile 2", true));
                } else if (attack === 'Phaser Arrays') {
                    result.push(new Weapon(attack, 0, "Versatile 2, Area or Spread", true));
                } else if (attack === 'Disruptor Cannons') {
                    result.push(new Weapon(attack, 2, "Viscious 1", true));
                } else if (attack === 'Disruptor Banks') {
                    result.push(new Weapon(attack, 1, "Viscious 1", true));
                } else if (attack === 'Disruptor Arrays') {
                    result.push(new Weapon(attack, 0, "Viscious 1, Area or Spread", true));
                } else if (attack === 'Plasma Torpedoes') {
                    result.push(new Weapon(attack, 3, "Persistent, Calibration"));
                } else if (attack.indexOf('Tractor Beam') >= 0 || attack.indexOf('Grappler Cables') >= 0) {
                    let index = attack.indexOf("(Strength");
                    let index2 = attack.indexOf(")", index);
                    let strength = index >= 0 && index2 >= 0 ? attack.substr(index + "(Strength".length + 1, index2) : "0";
                    secondary.push(new Weapon(attack.indexOf('Tractor Beam') >= 0 ? 'Tractor Beam' : 'Grappler Cables', parseInt(strength), ""));
                }
            }

            if (spaceframe.attacks.indexOf('Quantum Torpedoes') >= 0 || talents.indexOf('Quantum Torpedoes') >= 0) {
                result.push(new Weapon('Quantum Torpedoes', 4, "Vicious 1, Calibration, High Yield"));
            }

            if (spaceframe.attacks.indexOf('Spatial Torpedoes') >= 0 && talents.indexOf('Nuclear Warheads') >= 0) {
                result.push(new Weapon('Nuclear Warheads', 3, "Vicious 1, Calibration"));
            } else if (spaceframe.attacks.indexOf('Spatial Torpedoes') >= 0) {
                result.push(new Weapon('Spatial Torpedoes', 2, ""));
            } else if (spaceframe.attacks.indexOf('Nuclear Warheads') >= 0 || talents.indexOf('Nuclear Warheads') >= 0) {
                result.push(new Weapon('Nuclear Warheads', 3, "Vicious 1, Calibration"));
            }
        }

        secondary.forEach(w => {
            result.push(w);
        });

        return result;
    }

    static updateSystemAndDepartments(starship: Starship) {
        if (starship.spaceframeModel !== undefined && starship.missionProfileModel !== undefined) {
            const frame = starship.spaceframeModel;
            const missionPod = starship.missionPodModel;
            const profile = starship.missionProfileModel;

            starship.scale = frame.scale;

            frame.systems.forEach((s, i) => {
                starship.systems[i] = s;
            });

            frame.departments.forEach((d, i) => {
                starship.departments[i] = d;
            });

            if (missionPod) {
                missionPod.systems.forEach((s, i) => {
                    starship.systems[i] += s;
                });

                missionPod.departments.forEach((d, i) => {
                    starship.departments[i] += d;
                });
            }

            profile.departments.forEach((d, i) => {
                starship.departments[i] += d;
            });

            if (starship.refits) {
                starship.refits.forEach(r => starship.systems[r] += 1);
            }
        }
    }
}
