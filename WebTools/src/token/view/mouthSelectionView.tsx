import React from "react";
import { Token } from "../model/token";
import { withTranslation, WithTranslation } from 'react-i18next';
import { connect } from "react-redux";
import NoseCatalog from "../model/noseCatalog";
import SwatchButton from "./swatchButton";
import store from "../../state/store";
import MouthCatalog from "../model/mouthCatalog";

interface IMouthSelectionViewProperties extends WithTranslation {
    token: Token;
}

class MouthSelectionView extends React.Component<IMouthSelectionViewProperties, {}> {

    render() {
        return (<>
        <p className="mt-4">Mouth:</p>
            <div className="d-flex" style={{gap: "0.5rem"}}>
            {MouthCatalog.instance.swatches.map(s => <SwatchButton svg={s.svg} title={s.name}
                onClick={() => {}} active={true}
                key={'mouth-swatch-' + s.id }/>)}
            </div>
        </>)
    }

}


function mapStateToProps(state, ownProps) {
    return {
        token: state.token
    };
}

export default withTranslation()(connect(mapStateToProps)(MouthSelectionView));