import { connect } from "react-redux";
import { Character } from "../../common/character";
import { t } from "i18next";
import { Header } from "../../components/header";
import { ModifyBreadcrumb } from "../modifyBreadcrumb";
import { ModificationType } from "../model/modificationType";

interface IFreeformPageProperties {
    character?: Character;
}

const FreeformPage: React.FC<IFreeformPageProperties> = ({character}) => { 
    return (<div className="page container ms-0">
    <ModifyBreadcrumb modificationType={ModificationType.Freeform} />

    <Header>{t("Page.title.modificationFreeform")}</Header>
    <p>{t('MilestonePage.instruction')}</p>


    {/* <div className="mt-4 text-end">
        <Button onClick={() => nextPage()} className="btn btn-primary btn-sm">{t('Common.button.next')}</Button>
    </div> */}

</div>)
}

function mapStateToProps(state, ownProps) {
    return {
        character: state.character.currentCharacter
    };
}

export default connect(mapStateToProps)(FreeformPage);