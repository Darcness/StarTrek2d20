﻿import React = require("react");
import { SetHeaderText } from "../common/extensions";
import { DropDownInput } from "../components/dropDownInput";
import { Skill, SkillsHelper } from "../helpers/skills";
import { TalentModel, TalentsHelper, TalentAliasModel } from "../helpers/talents";
import { Source, SourcesHelper } from "../helpers/sources";
import { character } from "../common/character";
import { Species, SpeciesHelper } from "../helpers/species";

class TalentViewModel {
    name: string;
    description: string;
    notes: string;
    source: string;

    constructor(name: string, description: string, source: string, notes: string) {
        this.name = name;
        this.description = description;
        this.source = source;
        this.notes = notes;
    }

    static from(talent: TalentModel) {
        let sourceString = SourcesHelper.getSourceName(TalentsHelper.getSourceForTalentModel(talent));
        let notes = ""

        for (var a of talent.aliases) {
            var sourcesDescription = ""
            for (var s of a.sources) {
                if (sourcesDescription.length > 0) {
                    sourcesDescription += " and ";
                }
                sourcesDescription += SourcesHelper.getSourceName([ s ]);
            }

            notes += "This talent is known as " + a.name + " in the " + sourcesDescription + (a.sources.length > 1 ? " source books." : " source book.");
        }

        let result = new TalentViewModel(talent.name, talent.description, sourceString, notes);
        return result;
    }
}

export class TalentsOverviewPage extends React.Component<{}, {}> {
    private _categories: string[] = [];
    private _category: string = "";
    private _talents: { [category: string]: TalentViewModel[] } = {};

    constructor(props: {}) {
        super(props);

        SetHeaderText("Talents");

        this.setupSources();
        this.setupCategories();
        this.loadTalents();
    }

    render() {
        const talents = this._talents[this._category].map((t, i) => {
            let notes = <span></span>
            if (t.notes != null && t.notes.length > 0) {
                notes = (<p><i>{t.notes}</i></p>);
            }

            return (
                <tr key={i}>
                    <td className="selection-header">
                        {t.name}
                        <div className="selection-header-small">
                            ({t.source})
                        </div>
                    </td>
                    <td>{t.description} {notes}</td>
                </tr>
            );
        });

        return (
            <div>
                <div className="float-top">
                    <DropDownInput items={this._categories} defaultValue={this._category} onChange={(index) => { this.onCategoryChanged(index); }} />
                </div>
                <div className="page">
                    <table className="selection-list">
                        <tbody>
                            {talents}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private setupSources() {
        for (let source in Object.keys(Source).filter(src => !isNaN(Number(Source[src])))) {
            let src = Number(source);
            character.addSource(src);
        }
    }

    private setupCategories() {
        var skillFilter = [6];

        for (let sk in Object.keys(Skill).filter(skill => !isNaN(Number(Skill[skill])))) {
            if (skillFilter.indexOf(Number(sk)) === -1) {
                let s = SkillsHelper.getSkillName(Number(sk));
                this._categories.push(s);
            }
        }

        this._categories.push("General");
        this._categories.push("Career");
        this._categories.push("Enhancement");
        this._categories.push("Starship");

        for (let sp in Object.keys(Species).filter(species => !isNaN(Number(Species[species])))) {
            const species = SpeciesHelper.getSpeciesByType(Number(sp));
            if (species.talents.length > 0) {
                if (this._categories.indexOf(species.name) === -1) {
                    this._categories.push(species.name);
                }
            }
        }

        this._categories = this._categories.sort((a, b) => a.localeCompare(b));
        this._category = this._categories[0];

        for (var c = 0; c < this._categories.length; c++) {
            const category = this._categories[c];
            if (!this._talents[category]) {
                this._talents[category] = [];
            }
        }
    }

    private loadTalents() {
        for (var c = 0; c < this._categories.length; c++) {
            const category = this._categories[c];
            const skill = SkillsHelper.toSkill(category);
            if (skill !== Skill.None) {
                const talents = TalentsHelper.getTalents()[skill];
                for (var i = 0; i < talents.length; i++) {
                    const talent = talents[i];
                    this._talents[category].push(TalentViewModel.from(talent));
                }
            }
            else {
                const talents = TalentsHelper.getTalents()[Skill.None];
                for (var i = 0; i < talents.length; i++) {
                    const talent = talents[i];
                    if (talent.category === category) {
                        this._talents[category].push(TalentViewModel.from(talent));
                    }
                }
            }

            this._talents[category].sort((a, b) => a.name.localeCompare(b.name));
        }
    }

    private getSource(talent: string) {
        return SourcesHelper.getSourceName(TalentsHelper.getSourceForTalent(talent));
    }

    private prerequisitesToString(pre: {}[]) {
        return "";
    }

    private onCategoryChanged(index: number) {
        this._category = this._categories[index];
        console.log(this._category);
        this.forceUpdate();
    }
}
