﻿import * as React from 'react';
import AppVersion from './components/appVersion';
import {character} from './common/character';
import { Events, EventIdentity } from './common/eventChannel';
import News from './components/news';
import { PageFactory } from './pages/pageFactory';
import { PageHeader } from './components/pageHeader';
import { PageIdentity } from './pages/pageIdentity';
import { History } from './components/history';
import { CharacterSheet } from './components/characterSheet';

import './scss/main.scss';

interface IAppState {
    showNews: boolean;
    showHistory: boolean;
    showProfile: boolean;
    activePage: PageIdentity;
}

export class CharacterCreationApp extends React.Component<{}, IAppState> {

    private pageFactory: PageFactory;
    constructor(props) {
        super(props);

        let url = new URL(window.location.href);
        this.state = {
            showNews: false,
            showHistory: false,
            showProfile: false,
            activePage: url.pathname === "/view" ? PageIdentity.ViewSheet : PageIdentity.Selection
        };
        this.pageFactory = new PageFactory();
    }

    componentDidMount() {

        Events.listen(EventIdentity.ShowPage, (page: any) => {
            this.activatePage(page as PageIdentity, false);
        });

        Events.listen(EventIdentity.HistoryBack, (page: any) => {
            this.activatePage(page as PageIdentity, true);
        });
    }

    private activatePage(page: PageIdentity, isHistory: boolean) {
        document.getElementById("app")!.scrollTop = 0;

        if (page === this.state.activePage) {
            var pageComponent = document.getElementsByClassName('page')[0];
            pageComponent.classList.remove('page-out');
            return;
        }

        this.setState({
            ...this.state,
            activePage: page
        })

        if (!isHistory) {
            character.saveStep(this.state.activePage);
        }
    }

    render() {
        const page = this.pageFactory.createPage(this.state.activePage);

        return [
            <div className="lcar-container" key="main-container">
                <div className="lcar-header">
                    <div className="lcar-header-start"><a href="index.html"><img src="./static/img/logo.png" className="logo" alt="Star Trek Adventures Logo"/></a></div>
                    <div></div>
                    <div className="lcar-header-middle"></div>
                    <PageHeader page={this.state.activePage} />
                    <div className="lcar-header-end"></div>
                </div>
                <div className="lcar-content">
                    <div className="lcar-content-start">
                        <div className="lcar-content-start-top"></div>
                        <div className="lcar-content-action">
                            <div id="history-button" className="lcar-content-history" onClick={ () => this.toggleHistory() }>History</div>
                            <div id="history-container" className="history-container-hidden">
                                <History showHistory={this.state.showHistory} />
                            </div>
                        </div>
                        <div className="lcar-content-action">
                            <div id="profile-button" className="lcar-content-profile" onClick={ () => this.toggleProfile() }>Profile</div>
                            <CharacterSheet showProfile={this.state.showProfile} />
                        </div>
                        <div className="lcar-content-feedback" onClick={ () => this.showFeedbackPage() }>Feedback</div>
                        <div className="lcar-content-news" onClick={() => this.showNews()}>
                            <div id="news-button" className="lcar-news">News</div>
                        </div>
                        <div></div>
                    </div>
                    <div className="lcar-content-round"></div>
                    <div id="app">{page}</div>
                </div>
                <div className="lcar-footer">
                    <div className="lcar-footer-start"></div>
                    <div className="lcar-footer-end"></div>
                </div>
                <div className="legal">
                    TM &amp; &copy; 2022 CBS Studios Inc. STAR TREK and related marks and logos are trademarks of CBS Studios Inc. All Rights Reserved.
                </div>
            </div>,
            <AppVersion key="app-version"/>,
            <div id="dialog" key="modal-dialog"></div>,
            <News showModal={this.state.showNews} onClose={() => {this.hideNews()}} key="news"/>
        ];
    }

    showFeedbackPage() {
        window.open("https://github.com/bcholmes/StarTrek2d20/discussions", "_blank");
    }

    toggleHistory() {
        this.setState({
            ...this.state,
            showHistory: !this.state.showHistory
        })
    }

    toggleProfile() {
        this.setState({
            ...this.state,
            showProfile: !this.state.showProfile
        })
    }

    showNews() {
        this.setState({
            ...this.state,
            showNews: true
        })
    }

    hideNews() {
        this.setState({
            ...this.state,
            showNews: false
        })
    }
}

export default CharacterCreationApp;
