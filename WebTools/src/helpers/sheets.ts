import { character } from '../common/character';
import { CharacterType } from '../common/characterType';
import { Attribute } from '../helpers/attributes';
import { Skill } from '../helpers/skills';
import { PDFDocument, PDFFont, PDFForm, PDFPage, rgb, StandardFonts } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { CharacterSerializer } from '../common/characterSerializer';
import { Era } from './eras';
import { MissionProfileHelper } from '../helpers/missionProfiles';
import { Department } from './departments';
import { System } from './systems';
import { Weapon } from './weapons';
import { SheetOutlineOptions, SpaceframeOutline, XYLocation } from './spaceframeOutlineHelper';
import { TalentsHelper } from './talents';
import { CareerEventsHelper } from './careerEvents';
import { RolesHelper } from './roles';

class TextBlock {
    text: string;
    fontSize: number;
    font: PDFFont;
    height: number;
    width: number;
}

class Line {
    blocks: TextBlock[];
    column: Column;
    location: XYLocation; // represents the upper-left-hand corner of the line

    constructor(location: XYLocation, column: Column, blocks?: TextBlock[]) {
        this.location = location;
        this.blocks = blocks || [];
        this.column = column;
    }

    height() {
        let h = 0.0;
        this.blocks.forEach(b => {if (b.height > h) h = b.height; });
        return h;
    }
    bottom() {
        return new XYLocation(this.location.x, this.location.y - this.height());
    }
    availableWidth() {
        let w = 0.0;
        this.blocks.forEach(b => w += b.width);
        return this.column.width - w;
    }
    isEmpty() {
        return this.blocks.length === 0;
    }
    add(block: TextBlock) {
        this.blocks.push(block);
    }

    moveToNextColumnIfNecessary(page: PDFPage) {
        if (this.column.contains(this.bottom(), page)) {
            return this;
        } else if (this.column.nextColumn == null) {
            return null;
        } else {
            return new Line(this.column.nextColumn.translatedStart(page), this.column.nextColumn, this.blocks);
        }
    }
}

class FontSpecification {
    font: PDFFont; 
    size: number;

    constructor(font: PDFFont, size: number) {
        this.font = font;
        this.size = size;
    }
}


class Column {
    start: XYLocation;
    height: number;
    width: number;
    nextColumn?: Column;

    constructor(x: number, y: number, height: number, width: number, nextColumn?: Column) {
        this.start = new XYLocation(x, y);
        this.height = height;
        this.width = width;
        this.nextColumn = nextColumn;
    }

    contains(point: XYLocation, page: PDFPage) {
        return point.x >= this.start.x && point.x <= (this.start.x + this.width)
            && point.y <= (page.getSize().height - this.start.y) && point.y >= (page.getSize().height - this.start.y - this.height);
    }
    translatedStart(page: PDFPage) {
        let x = this.start.x;
        let y = page.getSize().height - this.start.y;
        return new XYLocation(x, y);
    }
}

export interface ICharacterSheet {
    getName(): string;
    getThumbnailUrl(): string;
    getPdfUrl(): string;
    populate(pdf: PDFDocument);
    createFileName(suffix: string);
}

abstract class BasicSheet implements ICharacterSheet {
    getName(): string {
        throw new Error('Method not implemented.');
    }
    getThumbnailUrl(): string {
        throw new Error('Method not implemented.');
    }
    getPdfUrl(): string {
        throw new Error('Method not implemented.');
    }
    async populate(pdf: PDFDocument) {
        const form = pdf.getForm();
        this.populateForm(form);
    }

    populateForm(form: PDFForm) {
    }

    fillField(form: PDFForm, name: string, value: string) {
        if (value) {
            try {
                const field = form.getTextField(name)
                if (field) {
                    field.setText(value)
                }
            } catch (e) {
                // ignore it
            }
        }
    }
    createFileName(suffix: string): string {
        if (character.name == null || character.name.length === 0) {
            return suffix + ".pdf";
        } else {
            var escaped = character.name.replace(/\\/g, '_').replace(/\//g, '_').replace(/\s/g, '_');
            return escaped + '-'  + suffix + ".pdf";
        }
    }

    findSecurityValue() {
        return 0;
    }

    determineWeapons(): Weapon[] {
        return [];
    }
    fillWeapons(form: PDFForm) {
        var weapons = this.determineWeapons();
        weapons.forEach( (w, i) => {
            this.fillWeapon(form, w, i+1);
        });
    }

    fillWeapon(form: PDFForm, weapon: Weapon, index: number) {
        const security = this.findSecurityValue() || 0;

        this.fillField(form, 'Weapon ' + index + ' name', weapon.name);
        this.fillField(form, 'Weapon ' + index + ' dice', "" + (security + weapon.dice));
        this.fillField(form, 'Weapon ' + index + ' qualities', weapon.qualities);
    }

    fillCheckbox(form: PDFForm, name: string, value: boolean) {
        try {
            const field = form.getCheckBox(name)
            if (field) {
                if (value) {
                    field.check();
                } else {
                    field.uncheck();
                }
            }
        } catch (e) {
            // ignore it
        }
    }
}

abstract class BasicStarshipSheet extends BasicSheet {

    populateForm(form: PDFForm) {
        this.fillField(form, 'Name', character.starship.name);
        this.fillField(form, 'Service Date', character.starship.serviceYear.toString());
        if (character.isKlingon()) {
            this.fillField(form, 'Designation', 'N/A');
        } else {
            this.fillField(form, 'Designation', character.starship.registry);
        }
        let trait = character.isKlingon() ? "Klingon Starship" : "Federation Starship";

        const talents = character.starship.getTalentNameList();

        const spaceframe = character.starship.spaceframeModel;
        if (spaceframe) {
            this.fillField(form, 'Space Frame', spaceframe.name);
            this.fillField(form, 'Scale', spaceframe.scale.toString());
            trait = spaceframe.additionalTraits.join(', ');
        }
        if (character.starship.traits) {
            trait += `, ${character.starship.traits}`;
        }
        this.fillField(form, 'Traits', trait);
        const missionProfile = MissionProfileHelper.getMissionProfile(character.starship.missionProfile, character.type);
        if (missionProfile) {
            this.fillField(form, 'Mission Profile', missionProfile.name);
        }

        if (character.starship.systems[System.Engines]) {
            this.fillField(form, "Power Total", this.calculatePower(character.starship.systems[System.Engines], talents));
        }
        if (character.starship.scale) {
            this.fillField(form, "Resistance",  this.calculateResistance(character.starship.scale, talents));
            this.fillField(form, "Crew Total",  this.calculateCrewSupport(character.starship.scale));
        }

        if (character.starship.systems[System.Structure] && character.starship.departments[Department.Security]) {
            this.fillShields(form, this.calculateShields(character.starship.systems[System.Structure] + character.starship.departments[Department.Security], talents));
        }

        this.fillRefits(form);
        this.fillSystems(form);
        this.fillDepartments(form);
        this.fillTalents(form, talents);
        this.fillWeapons(form);
    }

    fillRefits(form: PDFForm) {
        let systems: System[] = [ System.Comms, System.Computer, System.Engines, System.Sensors, System.Structure, System.Weapons ];
        let refitString = "";
        if (character.starship.refits) {
            systems.forEach(s => {
                let value = 0;
                character.starship.refits.forEach(r => value += (r === s) ? 1 : 0);
                if (value > 0) {
                    if (refitString !== "") {
                        refitString += ", ";
                    }
                    refitString += "+" + value + " " + System[s];
                }
            });
        }
        console.log("Refit: " + refitString);
        this.fillField(form, "Refit", refitString);
    }

    calculateCrewSupport(scale: number) {
        var crew = scale;
        return crew.toString();
    }

    calculateResistance(scale: number, talents: string[]) {
        var resistance = scale;

        if (talents.indexOf("Ablative Armor") > -1) {
            resistance += 2;
        }

        if (talents.indexOf("Improved Hull Integrity") > -1) {
            resistance++;
        }

        return resistance.toString();
    }

    calculatePower(base: number, talents: string[]) {
        var power = base;

        if (talents.indexOf("Secondary Reactors") > -1) {
            power += 5;
        }

        return power.toString();
    }

    fillTalents(form: PDFForm, talents: string[]) {
        var i = 1;
        for (var talent of talents) {
            this.fillField(form, 'Talent ' + i, talent);
            i++;
        }
    }

    calculateShields(base: number, talents: string[]) {
        var shields = base;
        if (talents.indexOf("Advanced Shields") > -1) {
            shields += 5;
        }
        return shields;
    }

    fillShields(form: PDFForm, shields: number) {
        for (var i = 1; i <= 30; i++) {
            this.fillCheckbox(form, "Shields " + i, i > shields);
        }
    }

    findSecurityValue() {
        return character.starship.departments[Department.Security];
    }

    determineWeapons(): Weapon[] {
        var result = [];
        var secondary = [];
        const talents = character.starship.getTalentNameList();
        const spaceframe = character.starship.spaceframeModel;
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

    fillSystems(form: PDFForm) {
        this.fillFieldWithNumber(form, "Engines", character.starship.getSystemValue(System.Engines));
        this.fillFieldWithNumber(form, "Structure", character.starship.getSystemValue(System.Structure));
        this.fillFieldWithNumber(form, "Computers", character.starship.getSystemValue(System.Computer));
        this.fillFieldWithNumber(form, "Sensors", character.starship.getSystemValue(System.Sensors));
        this.fillFieldWithNumber(form, "Weapons", character.starship.getSystemValue(System.Weapons));
        this.fillFieldWithNumber(form, "Communications", character.starship.getSystemValue(System.Comms));
    }

    fillDepartments(form: PDFForm) {
        this.fillFieldWithNumber(form, "Command", character.starship.departments[Department.Command]);
        this.fillFieldWithNumber(form, "Conn", character.starship.departments[Department.Conn]);
        this.fillFieldWithNumber(form, "Security", character.starship.departments[Department.Security]);
        this.fillFieldWithNumber(form, "Engineering", character.starship.departments[Department.Engineering]);
        this.fillFieldWithNumber(form, "Science", character.starship.departments[Department.Science]);
        this.fillFieldWithNumber(form, "Medicine", character.starship.departments[Department.Medicine]);
    }

    fillFieldWithNumber(form: PDFForm, name: string, value: number) {
        if (value) {
            this.fillField(form, name, value.toString());
        }
    }
    createFileName(suffix: string): string {
        if (character.starship.name) {
            var escaped = character.starship.name.replace(/\\/g, '_').replace(/\//g, '_').replace(/\s/g, '_');
            return escaped + '-'  + suffix + ".pdf";
        } else {
            return suffix + ".pdf";
        }
    }

    fillWeapon(form: PDFForm, weapon: Weapon, index: number) {
        const security = this.findSecurityValue() || 0;

        let dice = security + weapon.dice;
        if (weapon.isTractorOrGrappler) {
            dice = weapon.dice;
        }
        if (weapon.scaleApplies) {
            const scale = character.starship && character.starship.scale ? character.starship.scale : 0;
            dice += scale;
        }

        this.fillField(form, 'Weapon ' + index + ' name', weapon.name);
        this.fillField(form, 'Weapon ' + index + ' dice', "" + dice);
        this.fillField(form, 'Weapon ' + index + ' qualities', weapon.qualities);
    }
}

class StandardTngStarshipSheet extends BasicStarshipSheet {
    getName(): string {
        return 'TNG Standard Starship Sheet (Landscape)'
    }
    getThumbnailUrl(): string {
        return 'https://sta.bcholmes.org/static/img/sheets/TNG_Standard_Starship_Sheet.png'
    }
    getPdfUrl(): string {
        return 'https://sta.bcholmes.org/static/pdf/TNG_Standard_Starship_Sheet_no_outline.pdf'
    }

    async populate(pdf: PDFDocument) {
        super.populate(pdf);

        const spaceframe = character.starship.spaceframeModel;
        SpaceframeOutline.draw(pdf, new SheetOutlineOptions(new XYLocation(43.5, 290.25), rgb(245.0/255, 157.0/255.0, 8.0/255.0)), spaceframe, character.starship.serviceYear);
    }
}

class StandardTosStarshipSheet extends BasicStarshipSheet {
    getName(): string {
        return 'TOS Standard Starship Sheet (Landscape)'
    }
    getThumbnailUrl(): string {
        return 'https://sta.bcholmes.org/static/img/sheets/TOS_Standard_Starship_Sheet.png'
    }
    getPdfUrl(): string {
        return 'https://sta.bcholmes.org/static/pdf/TOS_Starship_Sheet_no_outline.pdf'
    }

    async populate(pdf: PDFDocument) {
        super.populate(pdf);

        const spaceframe = character.starship.spaceframeModel;
        SpaceframeOutline.draw(pdf, new SheetOutlineOptions(new XYLocation(42.5, 243.0), rgb(237.0/255, 27.0/255.0, 47.0/255.0)), spaceframe, character.starship.serviceYear);
    }
}

class StandardKlingonStarshipSheet extends BasicStarshipSheet {
    getName(): string {
        return 'Klingon Starship Sheet (Landscape)'
    }
    getThumbnailUrl(): string {
        return 'https://sta.bcholmes.org/static/img/sheets/STA_Klingon_Starship_Sheet.png'
    }
    getPdfUrl(): string {
        return 'https://sta.bcholmes.org/static/pdf/STA_Klingon_Starship_Sheet.pdf'
    }
}


abstract class BasicShortCharacterSheet extends BasicSheet {

    getName(): string {
        throw new Error('Method not implemented.');
    }
    getThumbnailUrl(): string {
        throw new Error('Method not implemented.');
    }
    getPdfUrl(): string {
        throw new Error('Method not implemented.');
    }
    async populate(pdf: PDFDocument) {
        const form = pdf.getForm();
        this.populateForm(form);
    }

    populateForm(form: PDFForm) {
        this.fillName(form);
        this.fillField(form, 'Department', CharacterSerializer.serializeAssignment(character));
        this.fillField(form, 'Purpose', CharacterSerializer.serializeAssignment(character));
        this.fillField(form, 'Rank', character.rank);
        this.fillField(form, 'Species', CharacterSerializer.serializeSpecies(character.species, character.mixedSpecies));
        let traits = character.baseTraits;
        if (character.additionalTraits) {
            traits.push(character.additionalTraits);
        }

        this.fillField(form, 'Traits', CharacterSerializer.serializeTraits(traits));
        character.focuses.forEach( (f, i) => {
            this.fillField(form, 'Focus ' + (i+1), f);
        });

        this.fillAttributes(form);
        this.fillSkills(form);
        this.fillStress(form);
    }

    fillName(form: PDFForm) {
        this.fillField(form, 'Name', this.formatName());
    }

    formatNameWithoutPronouns() {
        return CharacterSerializer.serializeName(character);
    }

    formatName() {
        let name = this.formatNameWithoutPronouns();
        if (character.pronouns.length > 0) {
            name += " (" + character.pronouns + ")";
        }
        return name;
    }

    fillStress(form: PDFForm) {
        var stress = character.stress || 0; 
        if (stress === 0) {
            character.attributes.forEach( (a, i) => {
                switch(a.attribute) {
                case Attribute.Fitness:
                    stress += a.value;
                    break;
                default:
                }
            })

            character.skills.forEach( (s, i) => {
                switch(s.skill) {
                case Skill.Security:
                    stress += s.expertise;
                    break;
                default:
                }
            })
        }

        if (character.hasTalent("Resolute")) {
            stress += 3;
        }

        for (var i = 1; i <= 30; i++) {
            this.fillCheckbox(form, "Stress " + i, i > stress);
        }
    }

    fillAttributes(form: PDFForm) {
        character.attributes.forEach( (a, i) => {
            switch (a.attribute) {
            case Attribute.Control:
                this.fillField(form, 'Control', "" + a.value);
                break;
            case Attribute.Fitness:
                this.fillField(form, 'Fitness', "" + a.value);
                break;
            case Attribute.Presence:
                this.fillField(form, 'Presence', "" + a.value);
                break;
            case Attribute.Daring:
                this.fillField(form, 'Daring', "" + a.value);
                break;
            case Attribute.Insight:
                this.fillField(form, 'Insight', "" + a.value);
                break;
            case Attribute.Reason:
                this.fillField(form, 'Reason', "" + a.value);
                break;
            }
        });
    }

    fillSkills(form: PDFForm) {
        character.skills.forEach( (a, i) => {
            switch (a.skill) {
            case Skill.Command:
                this.fillField(form, 'Command', "" + a.expertise);
                break;
            case Skill.Security:
                this.fillField(form, 'Security', "" + a.expertise);
                break;
            case Skill.Science:
                this.fillField(form, 'Science', "" + a.expertise);
                break;
            case Skill.Conn:
                this.fillField(form, 'Conn', "" + a.expertise);
                break;
            case Skill.Engineering:
                this.fillField(form, 'Engineering', "" + a.expertise);
                break;
            case Skill.Medicine:
                this.fillField(form, 'Medicine', "" + a.expertise);
                break;
            }
        });
    }

    fillField(form: PDFForm, name: string, value: string) {
        try {
            const field = form.getTextField(name)
            if (field) {
                field.setText(value)
            }
        } catch (e) {
            // ignore it
        }
    }

    fillCheckbox(form: PDFForm, name: string, value: boolean) {
        try {
            const field = form.getCheckBox(name)
            if (field) {
                if (value) {
                    field.check();
                } else {
                    field.uncheck();
                }
            }
        } catch (e) {
            // ignore it
        }
    }
}

abstract class BasicFullCharacterSheet extends BasicShortCharacterSheet {

    populateForm(form: PDFForm) {
        super.populateForm(form);

        var upbringing = character.upbringing;
        if (upbringing) {
            this.fillField(form, 'Upbringing', upbringing.name + (character.acceptedUpbringing ? " (A)" : " (R)"));
        }
        this.fillField(form, 'Assignment', CharacterSerializer.serializeAssignment(character));
        this.fillField(form, 'Environment', CharacterSerializer.serializeEnvironment(character.environment, character.otherSpeciesWorld));

        this.fillValues(form);
        this.fillTalents(form);
        this.fillEquipment(form);

        this.fillWeapons(form);
    }

    findSecurityValue() {
        var result = undefined;
        character.skills.forEach( (s, i) => {
            if (s.skill === Skill.Security) {
                result = s.expertise;
            }
        });
        return result;
    }    

    fillWeapons(form: PDFForm) {
        var weapons = this.determineWeapons();
        const security = this.findSecurityValue() || 0;

        weapons.forEach( (w, i) => {
            this.fillField(form, 'Weapon ' + (i+1) + ' name', w.name);
            this.fillField(form, 'Weapon ' + (i+1) + ' dice', "" + (security + w.dice));
            this.fillField(form, 'Weapon ' + (i+1) + ' qualities', w.qualities);
        });
    }

    determineWeapons() {
        var result: Weapon[] = [];
        
        if (character.hasTalent("Mean Right Hook")) {
            result.push(new Weapon("Unarmed Strike", 1, "Knockdown, Non-lethal Vicious 1"));
        } else {
            result.push(new Weapon("Unarmed Strike", 1, "Knockdown"));
        }

        if (character.hasTalent("The Ushaan")) {
            result.push(new Weapon("Ushaan-tor", 1, "Vicious 1"));
        }

        if (character.hasTalent("Warrior's Spirit")) {
            result.push(new Weapon("Bat'leth", 3, "Vicious 1"));
        }

        if (character.type === CharacterType.Starfleet) {
            result.push(new Weapon("Phaser type-2", 3, "Charges"));
        } else {
            if (character.isKlingon()) {
                result.push(new Weapon("d’k tahg dagger", 1, "Vicious 1, Deadly, Hidden 1"));
            }
            result.push(new Weapon("Disruptor Pistol", 3, "Vicious 1"));
        }
        return result;
    }

    fillTalents(form: PDFForm) {
        var i = 1;
        for (var talent in character.talents) {
            this.fillField(form, 'Talent ' + i, talent);
            i++;
        }
    }

    fillEquipment(form: PDFForm) {
        character.equipment.forEach( (e, i) => {
            this.fillField(form, 'Equipment ' + (i+1), e);
        });
    }

    fillValues(form: PDFForm) {
        this.fillField(form, 'Value 1', character.environmentValue);
        this.fillField(form, 'Value 2', character.trackValue);
        this.fillField(form, 'Value 3', character.careerValue);
        this.fillField(form, 'Value 4', character.finishValue);
    }
}

class HalfPageSupportingCharacterSheet extends BasicShortCharacterSheet {
    getName(): string {
        return 'Half-Page Supporting Character Sheet'
    }
    getThumbnailUrl(): string {
        return 'https://sta.bcholmes.org/static/img/sheets/TNG_Supporting_Character_Half_Page.png'
    }
    getPdfUrl(): string {
        return 'https://sta.bcholmes.org/static/pdf/TNG_Supporting_Character_Half_Page.pdf'
    }
}

class StandardTngCharacterSheet extends BasicFullCharacterSheet {
    getName(): string {
        return 'Standard TNG Character Sheet'
    }
    getThumbnailUrl(): string {
        return 'https://sta.bcholmes.org/static/img/sheets/TNG_Standard_Character_Sheet.png'
    }
    getPdfUrl(): string {
        return 'https://sta.bcholmes.org/static/pdf/TNG_Standard_Character_Sheet.pdf'
    }
}

class StandardTosCharacterSheet extends BasicFullCharacterSheet {
    getName(): string {
        return 'TOS Character Sheet (Landscape)'
    }
    getThumbnailUrl(): string {
        return 'https://sta.bcholmes.org/static/img/sheets/TOS_Standard_Character_Sheet.png'
    }
    getPdfUrl(): string {
        return 'https://sta.bcholmes.org/static/pdf/TOS_Standard_Character_Sheet.pdf'
    }
}


class KlingonCharacterSheet extends BasicFullCharacterSheet {
    getName(): string {
        return 'Klingon Character Sheet'
    }
    getThumbnailUrl(): string {
        return 'https://sta.bcholmes.org/static/img/sheets/STA_Klingon_Character_Sheet.png'
    }
    getPdfUrl(): string {
        return 'https://sta.bcholmes.org/static/pdf/STA_Klingon_Character_Sheet.pdf'
    }

    populateForm(form: PDFForm) {
        super.populateForm(form);

        this.fillField(form, 'House', character.house);
    }

    formatNameWithoutPronouns() {
        var result = character.name;
        if (character.lineage) {
            result += (", " + character.lineage);
        }
        return result;
    }
}

class BaseTextCharacterSheet extends BasicFullCharacterSheet {

    addBlankLineAfter(lines: Line[], page: PDFPage) {
        let currentColumn = null;
        let newLocation = null;
        if (lines.length > 0) {
            let line = lines[lines.length-1];
            newLocation = line.location;
            currentColumn = line.column;
            newLocation = new XYLocation(line.bottom().x, line.bottom().y - (0.5 * line.height()));
        }

        if (newLocation && currentColumn) {
            let line = new Line(newLocation, currentColumn);
            line = line.moveToNextColumnIfNecessary(page);
            return line;
        } else {
            return null;
        }
    }

    writeRoleAndTalents(page: PDFPage, titleStyle: FontSpecification, paragraphStyle: FontSpecification, currentColumn: Column) {
        let start = currentColumn.translatedStart(page);
        let lines: Line[] = [];
        let startLine = new Line(start, currentColumn);
        if (character.role) {
            let role = RolesHelper.getRoleModelByName(character.role);
            if (role) {
                let blocks = this.createTextBlocks(role.name + ":", titleStyle, startLine, page);
                blocks.forEach((b, i) => { if (i < blocks.length -1) lines.push(b); });

                let line = (blocks.length > 0) ? blocks[blocks.length - 1] : new Line(startLine.location, startLine.column);

                blocks = this.createTextBlocks(role.ability, paragraphStyle, line, page);
                blocks.forEach(b => lines.push(b));
                startLine = this.addBlankLineAfter(lines, page);
            }
        }

        if (startLine) {
            for (var t in character.talents) {   
                const text = t;

                let blocks = this.createTextBlocks(text + ":", titleStyle, startLine, page);
                blocks.forEach((b, i) => { if (i < blocks.length -1) lines.push(b); });
                let line = (blocks.length > 0) ? blocks[blocks.length - 1] : new Line(startLine.location, startLine.column);

                const talent = TalentsHelper.getTalent(t);
                if (talent) {
                    blocks = this.createTextBlocks(talent.description, paragraphStyle, line, page);
                    blocks.forEach(b => lines.push(b));
                    startLine = this.addBlankLineAfter(lines, page);
                    if (startLine == null) {
                        break;
                    }
                }
            };
        }

        lines.forEach(t => 
            this.writeTextBlock(t, page)
        );
    }

    createTextBlocks(text: string, fontSpec: FontSpecification, line: Line, page: PDFPage) {
        let result: Line[] = [];
        if (line) {
            let textBlock = this.createTextBlock(line.isEmpty() ? text : (" " + text), fontSpec);
            if (textBlock.width < line.availableWidth()) {
                line.add(textBlock);        
                result.push(line);
            } else {
                let words = text.split(/\s+/);
                let previousBlock = null;
                let textPortion = "";
                for (let i = 0; i < words.length; i++) {
                    if (textPortion === "" && line.isEmpty()) {
                        textPortion = words[i];
                    } else {
                        textPortion += (" " + words[i]);
                    }
                    let block = this.createTextBlock(textPortion, fontSpec);
                    if (block.width < line.availableWidth()) {
                        previousBlock = block;
                    } else {
                        if (previousBlock != null) {
                            line.add(previousBlock);
                            line = line.moveToNextColumnIfNecessary(page);
                            previousBlock = null;
                            if (line) {
                                result.push(line);
                                line = new Line(line.bottom(), line.column);
                            } else {
                                break;
                            }
                        }
                        textPortion = words[i];
                        previousBlock = this.createTextBlock(textPortion, fontSpec);
                    }
                }
                if (previousBlock != null && line != null) {
                    line.add(previousBlock);
                    result.push(line);
                }
            }
        }
        return result;
    }

    createTextBlock(text: string, fontSpec: FontSpecification) {
        let textBlock = new TextBlock();
        textBlock.text = text;
        const textWidth = fontSpec.font.widthOfTextAtSize(text, fontSpec.size);
        const textHeight = fontSpec.font.heightAtSize(fontSpec.size);
        textBlock.height = textHeight;
        textBlock.width = textWidth;
        textBlock.font = fontSpec.font;
        textBlock.fontSize = fontSpec.size;
        return textBlock;
    }

    writeTextBlock(line: Line, page: PDFPage) {
        let x = line.bottom().x;
        line.blocks.forEach(textBlock => {
            page.drawText(textBlock.text, {
                x: x,
                y: line.bottom().y,
                size: textBlock.fontSize,
                font: textBlock.font,
                color: rgb(0.1, 0.1, 0.1)
            });
            x += textBlock.width;
        });
    }
}

class TwoPageTngCharacterSheet extends BaseTextCharacterSheet {
    getName(): string {
        return '2-Page TNG Character Sheet'
    }
    getThumbnailUrl(): string {
        return 'https://sta.bcholmes.org/static/img/sheets/TNG_2_Page_Character_Sheet.png'
    }
    getPdfUrl(): string {
        return 'https://sta.bcholmes.org/static/pdf/TNG_2_Page_Character_Sheet.pdf'
    }

    async populate(pdf: PDFDocument) {
        pdf.registerFontkit(fontkit);
        await super.populate(pdf);
        await this.fillPageTwo(pdf);
    }

    populateForm(form: PDFForm): void {
        super.populateForm(form);
        
        if (character.careerEvents && character.careerEvents.length > 0) {
            let event1 = CareerEventsHelper.getCareerEvent(character.careerEvents[0]);
            if (event1) {
                this.fillField(form, 'Career Event 1', event1.name);
            }

            if (character.careerEvents && character.careerEvents.length > 1) {
                let event2 = CareerEventsHelper.getCareerEvent(character.careerEvents[1]);
                if (event2) {
                    this.fillField(form, 'Career Event 2', event2.name);
                }
            }
        }
    }

    async fillPageTwo(pdf: PDFDocument) {
        const page2 = pdf.getPages()[1];
        const helveticaBold = await pdf.embedFont(StandardFonts.HelveticaBold);
        const helvetica = await pdf.embedFont(StandardFonts.Helvetica);
        const titleStyle = new FontSpecification(helveticaBold, 10);
        const paragraphStyle = new FontSpecification(helvetica, 10);

        let column2 = new Column(392, 204, 550, 196);
        let column1 = new Column(180, 204, 550, 196, column2);
        let currentColumn = column1;

        this.writeRoleAndTalents(page2, titleStyle, paragraphStyle, currentColumn);
    }
}

class LandscapeTngCharacterSheet extends BaseTextCharacterSheet {
    getName(): string {
        return 'Landscape TNG Character Sheet'
    }
    getThumbnailUrl(): string {
        return 'https://sta.bcholmes.org/static/img/sheets/TNG_Landscape_Character_Sheet.png'
    }
    getPdfUrl(): string {
        return 'https://sta.bcholmes.org/static/pdf/TNG_Landscape_Character_Sheet.pdf'
    }

    async populate(pdf: PDFDocument) {
        pdf.registerFontkit(fontkit);
        await super.populate(pdf);
        await this.fillTalentTextBlock(pdf);
    }

    async fillTalentTextBlock(pdf: PDFDocument) {
        const page = pdf.getPages()[0];
        const boldFontBytes = await fetch("/static/font/OpenSansCondensed-Bold.ttf").then(res => res.arrayBuffer())
        const lightFontBytes = await fetch("/static/font/OpenSansCondensed-Light.ttf").then(res => res.arrayBuffer())

        const openSansBold = await pdf.embedFont(boldFontBytes);
        const openSansLight = await pdf.embedFont(lightFontBytes);
        const titleStyle = new FontSpecification(openSansBold, 9);
        const paragraphStyle = new FontSpecification(openSansLight, 9);

        let currentColumn = new Column(583, 45, 563-45, 757-583);

        this.writeRoleAndTalents(page, titleStyle, paragraphStyle, currentColumn);
    }

    populateForm(form: PDFForm): void {
        super.populateForm(form);
        
        this.fillField(form, "Pronouns", character.pronouns);

        if (character.careerEvents && character.careerEvents.length > 0) {
            let event1 = CareerEventsHelper.getCareerEvent(character.careerEvents[0]);
            if (event1) {
                this.fillField(form, 'Career Event 1', event1.name);
            }

            if (character.careerEvents && character.careerEvents.length > 1) {
                let event2 = CareerEventsHelper.getCareerEvent(character.careerEvents[1]);
                if (event2) {
                    this.fillField(form, 'Career Event 2', event2.name);
                }
            }
        }
    }

    fillName(form: PDFForm) {
        this.fillField(form, 'Name', this.formatNameWithoutPronouns());
    }
}

class CharacterSheets {
    public getSupportingCharacterSheet(): ICharacterSheet[] {
        if (character.isKlingon()) {
            return [ new KlingonCharacterSheet(), new StandardTngCharacterSheet(), new StandardTosCharacterSheet(), new HalfPageSupportingCharacterSheet() ];
        } else if (character.era === Era.NextGeneration) {
            return [ new StandardTngCharacterSheet(), new HalfPageSupportingCharacterSheet(), new StandardTosCharacterSheet(), new KlingonCharacterSheet()  ];
        } else {
            return [ new StandardTosCharacterSheet(), new StandardTngCharacterSheet(), new HalfPageSupportingCharacterSheet(), new KlingonCharacterSheet() ];
        }
    }

    public getCharacterSheets(): ICharacterSheet[] {
        if (character.isKlingon()) {
            return [ new KlingonCharacterSheet(), new StandardTngCharacterSheet(), new StandardTosCharacterSheet(), new LandscapeTngCharacterSheet() ];
        } else if (character.era === Era.NextGeneration) {
            return [ new StandardTngCharacterSheet(), new KlingonCharacterSheet(), new StandardTosCharacterSheet(), new LandscapeTngCharacterSheet(), new TwoPageTngCharacterSheet() ];
        } else {
            return [ new StandardTosCharacterSheet(), new KlingonCharacterSheet(), new StandardTngCharacterSheet(), new LandscapeTngCharacterSheet() ];
        }
    }

    public getStarshipSheets(): ICharacterSheet[] {
        if (character.isKlingon()) {
            return [ new StandardKlingonStarshipSheet(), new StandardTngStarshipSheet(), new StandardTosStarshipSheet() ];
        } else if (character.era === Era.NextGeneration) {
            return [ new StandardTngStarshipSheet(), new StandardTosStarshipSheet(), new StandardKlingonStarshipSheet() ];
        } else {
            return [ new StandardTosStarshipSheet(), new StandardTngStarshipSheet(), new StandardKlingonStarshipSheet() ];
        }
    }
}

export const CharacterSheetRegistry = new CharacterSheets();