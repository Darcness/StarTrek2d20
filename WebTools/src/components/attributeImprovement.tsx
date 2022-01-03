﻿import * as React from 'react';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {character} from '../common/character';

interface IAttributeImprovementProperties {
    controller: AttributeImprovementCollection;
    attribute: Attribute;
    value: number;
    showIncrease: boolean;
    showDecrease: boolean;
}

export class AttributeImprovement extends React.Component<IAttributeImprovementProperties, {}> {

    render() {
        const {attribute, value, showDecrease, showIncrease} = this.props;

        const dec = showDecrease
            ? (<img style={{ float: "left" }} height="20" src="static/img/dec.png" onClick={ () => { this.onDecrease() } } alt="-"/>)
            : undefined;

        const inc = showIncrease
            ? (<img style={{ float: "right" }} height="20" src="static/img/inc.png" onClick={ () => { this.onIncrease() } }alt="+"/>)
            : undefined;

        return (
            <div className="stat pb-2">
                <div className="stat-entry-name purple">
                    {AttributesHelper.getAttributeName(attribute) }
                </div>
                <div className="stat-entry-value">
                    {dec}
                    {value}
                    {inc}
                </div>
            </div>
        );
    }

    private onDecrease() {
        this.props.controller.onDecrease(this.props.attribute);
    }

    private onIncrease() {
        this.props.controller.onIncrease(this.props.attribute);
    }
}

export enum AttributeImprovementCollectionMode {
    Increase,
    StarTrek,
    Customization,
    Academy,
    Ktarian,
    ReadOnly,
}

interface AttributeImprovementCollectionProperties {
    points: number;
    mode: AttributeImprovementCollectionMode;
    onDone?: (done: boolean) => void;
    filter?: Attribute[];
}

class AttributeContainer {
    attribute: Attribute;
    value: number;
    minValue: number;
    maxValue: number;
    showDecrease: boolean;
    showIncrease: boolean;

    constructor(attribute: Attribute, value: number, minValue: number, maxValue: number, showDecrease: boolean, showIncrease: boolean) {
        this.attribute = attribute;
        this.value = value;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.showDecrease = showDecrease;
        this.showIncrease = showIncrease;
    }
}

export class AttributeImprovementCollection extends React.Component<AttributeImprovementCollectionProperties, {}> {
    private _absoluteMax: number = 12;

    private _points: number = 0;
    private _attributes: AttributeContainer[] = [];
    private _ktarianAttributes: Attribute[] = [Attribute.Fitness, Attribute.Presence];

    constructor(props: AttributeImprovementCollectionProperties) {
        super(props);

        this._points = props.points;

        if (character.isYoung()) {
            this._absoluteMax = 11;
        }

        if (character.hasMaxedAttribute()) {
            this._absoluteMax--;
        }

        this.initializeAttributeContainers();
        this.state = { mode: props.mode };
    }

    componentDidUpdate(prevProps) {
        if (this.props.points !== prevProps.points) {
            this._points = this.props.points;
        }
        if (this.props.mode !== prevProps.mode) {
            this.setState({ mode: this.props.mode });
            this.initializeAttributeContainers();
        }
    }

    initializeAttributeContainers() {
        this._attributes = [];
        switch (this.props.mode) {
            case AttributeImprovementCollectionMode.ReadOnly:
                for (let i = 0; i < character.attributes.length; i++) {
                    if (!this.props.filter || this.props.filter.indexOf(i) > -1) {
                        this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, character.attributes[i].value, this._absoluteMax, false, false));
                    }
                }
                break;
            case AttributeImprovementCollectionMode.Increase:
                for (let i = 0; i < character.attributes.length; i++) {
                    if (!this.props.filter || this.props.filter.indexOf(i) > -1) {
                        this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, character.attributes[i].value, this._absoluteMax, false, character.attributes[i].value < this._absoluteMax));
                    }
                }
                break;
            case AttributeImprovementCollectionMode.StarTrek:
                for (let i = 0; i < character.attributes.length; i++) {
                    this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, character.attributes[i].value, 8, false, true));
                }
                break;
            case AttributeImprovementCollectionMode.Customization:
                for (let i = 0; i < character.attributes.length; i++) {
                    this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, character.attributes[i].value, Math.min(this._absoluteMax, character.attributes[i].value + 1), false, character.attributes[i].value < this._absoluteMax));
                }
                break;
            case AttributeImprovementCollectionMode.Academy:
                for (let i = 0; i < character.attributes.length; i++) {
                    if (!this.props.filter || this.props.filter.indexOf(i) > -1) {
                        const upperLimit = Math.min(character.attributes[i].value + 2, this._absoluteMax);
                        this._attributes.push(new AttributeContainer(character.attributes[i].attribute, character.attributes[i].value, character.attributes[i].value, upperLimit, false, character.attributes[i].value < upperLimit));
                    }
                }
                break;
            case AttributeImprovementCollectionMode.Ktarian:
                this._ktarianAttributes.forEach(a => {
                    this._attributes.push(new AttributeContainer(a, character.attributes[a].value, character.attributes[a].value, character.attributes[a].value + 1, false, true));
                });
        }
    }

    render() {
        const attributes = this._attributes.map((a, i) => {
            return <AttributeImprovement
                key={i}
                controller={this}
                attribute={a.attribute}
                value={a.value}
                showIncrease={a.showIncrease}
                showDecrease={a.showDecrease} />
        });

        return (
            <div>
                {attributes}
            </div>
        );
    }

    onDecrease(attr: Attribute) {
        for (let i = 0; i < this._attributes.length; i++) {
            let a = this._attributes[i];
            if (a.attribute === attr) {
                a.value--;
                character.attributes[a.attribute].value = a.value;
                break;
            }
        }

        switch (this.props.mode) {
            case AttributeImprovementCollectionMode.Increase:
            case AttributeImprovementCollectionMode.Academy:
                this._points++;

                for (let i = 0; i < this._attributes.length; i++) {
                    let a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue;
                }
                break;
            case AttributeImprovementCollectionMode.StarTrek:
            case AttributeImprovementCollectionMode.Customization:
            case AttributeImprovementCollectionMode.Ktarian:
                this._points++;

                for (let i = 0; i < this._attributes.length; i++) {
                    let a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue;
                }
                break;
        }

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }

        this.forceUpdate();
    }

    onIncrease(attr: Attribute) {
        for (let i = 0; i < this._attributes.length; i++) {
            let a = this._attributes[i];
            if (a.attribute === attr) {
                a.value++;
                character.attributes[a.attribute].value = a.value;
                break;
            }
        }

        switch (this.props.mode) {
            case AttributeImprovementCollectionMode.Increase:
            case AttributeImprovementCollectionMode.Academy:
                this._points--;

                for (let i = 0; i < this._attributes.length; i++) {
                    let a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;
                    a.showIncrease = a.value < a.maxValue && this._points > 0;
                }
                break;
            case AttributeImprovementCollectionMode.StarTrek:
            case AttributeImprovementCollectionMode.Customization:
            case AttributeImprovementCollectionMode.Ktarian:
                this._points--;

                for (let i = 0; i < this._attributes.length; i++) {
                    let a = this._attributes[i];
                    a.showDecrease = a.value > a.minValue;

                    const absoluteMax = character.isYoung() ? 11 : 12;
                    let maxValue = a.maxValue;
                    if (character.hasMaxedAttribute() && maxValue === absoluteMax) {
                        maxValue--;
                    }

                    a.showIncrease = a.value < maxValue && this._points > 0;
                }
                break;
        }

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }

        this.forceUpdate();
    }
}