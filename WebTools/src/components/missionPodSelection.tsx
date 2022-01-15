import * as React from 'react';

import { CheckBox } from './checkBox';
import { System } from '../helpers/systems';
import { Department } from '../helpers/departments';
import { MissionPod, SpaceframeHelper } from '../helpers/spaceframes';

interface IMissionPodSelectionProperties {
    initialSelection?: MissionPod;
    onSelection: (s: MissionPod) => void;
}

class MissionPodSelection extends React.Component<IMissionPodSelectionProperties, {}> {

    render() {
        const missionProfiles = SpaceframeHelper.getMissionPods().map((p, i) => {
            const talents = p.talents.map((t, ti) => {
                if (t === null) {
                    console.log(t.name);
                }

                return (
                    <div key={ti} style={{padding: "2px"}}>{t.name}</div>
                );
            });
            return (
                <tbody key={i}>
                    <tr>
                        <td className="selection-header" rowSpan={4}>{p.name}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Comms</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.systems[System.Comms])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Engines</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.systems[System.Engines])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Structure</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.systems[System.Structure])}</td>
                        <td className="d=none d-md-table-cell" style={{ verticalAlign: "top", paddingLeft: "0.75rem" }} rowSpan={4}>{talents}</td>
                        <td rowSpan={4}>
                            <CheckBox
                                isChecked={this.props.initialSelection === p.id}
                                text=""
                                value={p.id}
                                onChanged={(val) => { this.props.onSelection(p.id); } }/>
                        </td>
                    </tr>
                    <tr>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Computers</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.systems[System.Computer])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Sensors</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.systems[System.Sensors])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Weapons</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.systems[System.Weapons])}</td>
                    </tr>
                    <tr>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Command</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.departments[Department.Command])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Security</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.departments[Department.Security])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Science</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.departments[Department.Science])}</td>
                    </tr>
                    <tr>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Conn</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.departments[Department.Conn])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Engineering</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.departments[Department.Engineering])}</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "right" }}>Medicine</td>
                        <td className="d=none d-md-table-cell" style={{ textAlign: "center" }}>{this.formatAsDelta(p.departments[Department.Medicine])}</td>
                    </tr>

                </tbody>
            );
        })

        return (
            <div>
                <table className="selection-list w-100">
                    <thead>
                        <tr>
                            <td></td>
                            <td className="d=none d-md-table-cell" colSpan={6}>Stats</td>
                            <td className="d=none d-md-table-cell" style={{paddingLeft: "0.75rem"}}>Talents</td>
                            <td></td>
                        </tr>
                    </thead>
                    {missionProfiles}
                </table>
            </div>);
    }
    formatAsDelta(value: number) {
        if (value && value > 0) {
            return "+" + value;
        } else if (value && value < 0) {
            return "" + value;
        } else if (value === 0) {
            return (<span>&ndash;</span>)
        } else {
            return (<span>&nbsp;</span>)
        }
    }
}

export default MissionPodSelection;