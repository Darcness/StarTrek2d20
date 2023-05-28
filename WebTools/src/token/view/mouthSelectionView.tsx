import React from "react";
import { Token } from "../model/token";
import { withTranslation, WithTranslation } from 'react-i18next';
import { connect } from "react-redux";
import SwatchButton from "./swatchButton";
import MouthCatalog from "../model/mouthCatalog";
import store from "../../state/store";
import { setTokenFacialHairTypes, setTokenLipstickColor, setTokenMouthType } from "../../state/tokenActions";
import ColorSelection from "./colorSelection";
import SpeciesRestrictions from "../model/speciesRestrictions";
import FacialHairCatalog, { FacialHairPlacement } from "../model/facialHairCatalog";
import { FacialHairCategory, FacialHairType } from "../model/facialHairEnum";

interface IMouthSelectionViewProperties extends WithTranslation {
    token: Token;
}

class MouthSelectionView extends React.Component<IMouthSelectionViewProperties, {}> {

    render() {
        const { token } = this.props;
        return (<>
            <p className="mt-4">Mouth:</p>
            <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
            {MouthCatalog.instance.getSwatches(token).map(s => <SwatchButton svg={s.svg} title={s.name}
                onClick={() => store.dispatch(setTokenMouthType(s.id))} active={s.id === token.mouthType}
                token={token}
                key={'mouth-swatch-' + s.id }/>)}
            </div>

            <p className="mt-4">Lipstick Color:</p>
            <ColorSelection colors={SpeciesRestrictions.getLipstickColors(token.species)} onSelection={(c) => store.dispatch(setTokenLipstickColor(c))} />

            <p className="mt-4">Moustache:</p>
            <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
            {FacialHairCatalog.instance.getSwatches(token, FacialHairPlacement.UpperLip).map(s => <SwatchButton svg={s.svg} title={s.name}
                onClick={() => this.addFacialHairType(token, s.id)} active={this.getMoustacheType(token) === s.id}
                token={token}
                key={'facial-hair-swatch-' + s.id }/>)}
            </div>

            <p className="mt-4">Beard:</p>
            <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
            {FacialHairCatalog.instance.getSwatches(token, FacialHairPlacement.Chin).map(s => <SwatchButton svg={s.svg} title={s.name}
                onClick={() => this.addFacialHairType(token, s.id)} active={this.getBeardTypes(token).indexOf(s.id) >= 0}
                token={token}
                key={'facial-hair-swatch-' + s.id }/>)}
            </div>

        </>);
    }

    addFacialHairType(token: Token, type: FacialHairType) {
        let newTypes = [];
        let placement = FacialHairCatalog.instance.getPlacementFor(type);
        token.facialHairType.filter(t => FacialHairCatalog.instance.getPlacementFor(t) !== placement).forEach(t => newTypes.push(t));

        if (type !== FacialHairType.NoBeard && type !== FacialHairType.NoMoustache && newTypes.indexOf(type) < 0) {
            newTypes.push(type);
        }

        store.dispatch(setTokenFacialHairTypes(newTypes));
    }

    getMoustacheType(token: Token) {
        let type = token.facialHairType.filter(f => FacialHairCatalog.instance.getPlacementFor(f) === FacialHairPlacement.UpperLip);
        return type?.length ? type[0] : FacialHairType.NoMoustache;
    }

    getBeardTypes(token: Token) {
        let types = token.facialHairType.filter(f => FacialHairCatalog.instance.getPlacementFor(f) === FacialHairPlacement.Chin);
        return types?.length ? types : [ FacialHairType.NoBeard ];
    }

}


function mapStateToProps(state, ownProps) {
    return {
        token: state.token
    };
}

export default withTranslation()(connect(mapStateToProps)(MouthSelectionView));