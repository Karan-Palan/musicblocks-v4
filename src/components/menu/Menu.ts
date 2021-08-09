import { useEffect, useState } from 'react';

import Monitor from '../Monitor';
import { IBlockSize } from '../../@types/monitor';
// -- model component ------------------------------------------------------------------------------

import _MenuModel from '../../models/menu/Menu';
const MenuModel = new _MenuModel();

// -- view component -------------------------------------------------------------------------------

import MenuView from '../../views/menu/Menu';

// -- view-model component definition --------------------------------------------------------------

/**
 * ViewModel of the Menu component.
 */
export default function (): JSX.Element {
    const [autoHide, setAutoHide] = useState<boolean>(true);
    const [autoHideTemp, setAutoHideTemp] = useState<boolean>(true);
    const [playMenuVisible, setPlayMenuVisible] = useState<boolean>(false);
    const [settingsMenuVisible, setSettingsMenuVisible] = useState<boolean>(false);
    const [projectMenuVisible, setProjectMenuVisible] = useState<boolean>(false);
    const [languageMenuVisible, setLanguageMenuVisible] = useState<boolean>(false);
    const [blockSizeMenuVisible, setBlockSizeMenuVisible] = useState<boolean>(false);
    const [musicSettingsMenuVisible, setMusicSettingsMenuVisible] = useState<boolean>(false);
    const [languages, setLanguages] = useState<string[]>([]);
    const [blockSizes, setBlockSizes] = useState<IBlockSize[]>([]);

    // fetch the languages and blockSizes from Monitor in initial render
    useEffect(() => {
        (async () => {
            setLanguages(await Monitor.menu.getLanguages());
            setBlockSizes(await Monitor.menu.getBlockSizes());
        })();
    }, []);

    const play = (): void => {
        Monitor.menu.play();
    };

    const playStepByStep = (): void => {
        Monitor.menu.playStepByStep();
    };

    const playSlowly = (): void => {
        Monitor.menu.playSlowly();
    };

    const hideBlocks = (): void => {
        Monitor.menu.hideBlocks();
    };

    const cleanArtwork = (): void => {
        Monitor.menu.cleanArtwork();
    };

    const collapseBlocks = (): void => {
        Monitor.menu.collapseBlocks();
    };

    const undo = (): void => {
        Monitor.menu.undo();
    };

    const redo = (): void => {
        Monitor.menu.redo();
    };

    let togglePlayMenu: () => void;
    let toggleSettingsMenu: () => void;
    let toggleProjectMenu: () => void;
    let toggleLanguageMenu: () => void;
    let toggleBlockSizeMenu: () => void;
    let toggleMusicSettingsMenu: () => void;

    const toggleAutoHideTemp = () => {
        MenuModel.toggleAutoHideTemp();
        setAutoHideTemp(MenuModel.autoHideTemp);
    };

    togglePlayMenu = () => {
        MenuModel.togglePlayMenu();
        setPlayMenuVisible(MenuModel.playMenuVisible);
        if (!playMenuVisible) {
            if (settingsMenuVisible) {
                toggleSettingsMenu();
            }
            if (projectMenuVisible) {
                toggleProjectMenu();
            }
            if (languageMenuVisible) {
                toggleLanguageMenu();
            }
            if (blockSizeMenuVisible) {
                toggleBlockSizeMenu();
            }
            if (musicSettingsMenuVisible) {
                toggleMusicSettingsMenu();
            }
        }
    };

    toggleSettingsMenu = () => {
        MenuModel.toggleSettingsMenu();
        setSettingsMenuVisible(MenuModel.settingsMenuVisible);
        if (!settingsMenuVisible) {
            if (playMenuVisible) {
                togglePlayMenu();
            }
            if (projectMenuVisible) {
                toggleProjectMenu();
            }
            if (languageMenuVisible) {
                toggleLanguageMenu();
            }
            if (blockSizeMenuVisible) {
                toggleBlockSizeMenu();
            }
            if (musicSettingsMenuVisible) {
                toggleMusicSettingsMenu();
            }
        }
    };

    toggleProjectMenu = () => {
        MenuModel.toggleProjectMenu();
        setProjectMenuVisible(MenuModel.projectMenuVisible);
        if (!projectMenuVisible) {
            if (playMenuVisible) {
                togglePlayMenu();
            }
            if (settingsMenuVisible) {
                toggleSettingsMenu();
            }
            if (languageMenuVisible) {
                toggleLanguageMenu();
            }
            if (blockSizeMenuVisible) {
                toggleBlockSizeMenu();
            }
            if (musicSettingsMenuVisible) {
                toggleMusicSettingsMenu();
            }
        }
    };

    toggleLanguageMenu = () => {
        MenuModel.toggleLanguageMenu();
        setLanguageMenuVisible(MenuModel.languageMenuVisible);
    };

    toggleBlockSizeMenu = () => {
        MenuModel.toggleBlockSizeMenu();
        setBlockSizeMenuVisible(MenuModel.blockSizeMenuVisible);
    };

    toggleMusicSettingsMenu = () => {
        MenuModel.toggleMusicSettingsMenu();
        setMusicSettingsMenuVisible(MenuModel.musicSettingsMenuVisible);
        if (!musicSettingsMenuVisible) {
            if (playMenuVisible) {
                togglePlayMenu();
            }
            if (settingsMenuVisible) {
                toggleSettingsMenu();
            }
            if (projectMenuVisible) {
                toggleProjectMenu();
            }
            if (languageMenuVisible) {
                toggleLanguageMenu();
            }
            if (blockSizeMenuVisible) {
                toggleBlockSizeMenu();
            }
        }
    };

    const toggleAutoHide = () => {
        MenuModel.toggleAutoHide();
        setAutoHide(MenuModel.autoHide);

        // closes any open submenu while auto-hiding the menu-dock
        if (!autoHide && autoHideTemp) {
            if (playMenuVisible) {
                togglePlayMenu();
            }
            if (settingsMenuVisible) {
                toggleSettingsMenu();
            }
            if (projectMenuVisible) {
                toggleProjectMenu();
            }
            if (languageMenuVisible) {
                toggleLanguageMenu();
            }
            if (blockSizeMenuVisible) {
                toggleBlockSizeMenu();
            }
            if (musicSettingsMenuVisible) {
                toggleMusicSettingsMenu();
            }
        }
    };

    const changeLanguage = (language: string) => {
        toggleLanguageMenu();
        Monitor.menu.changeLanguage(language);
    };

    const updateHorizontalScroll = (isEnabled: boolean) => {
        Monitor.menu.updateHorizontalScroll(isEnabled);
    };

    const updateTurtleWrap = (isWrapOn: boolean) => {
        Monitor.menu.updateTurtleWrap(isWrapOn);
    };

    const changeBlockSize = (blockSize: number) => {
        toggleBlockSizeMenu();
        Monitor.menu.changeBlockSize(blockSize);
    };

    const updateVolume = (vol: number) => {
        Monitor.menu.updateVolume(vol);
    };

    return MenuView({
        autoHide,
        autoHideTemp,
        playMenuVisible,
        settingsMenuVisible,
        projectMenuVisible,
        languageMenuVisible,
        blockSizeMenuVisible,
        musicSettingsMenuVisible,
        languages,
        blockSizes,
        changeLanguage,
        updateHorizontalScroll,
        updateTurtleWrap,
        changeBlockSize,
        updateVolume,
        toggleAutoHide,
        toggleAutoHideTemp,
        togglePlayMenu,
        toggleSettingsMenu,
        toggleProjectMenu,
        toggleLanguageMenu,
        toggleBlockSizeMenu,
        toggleMusicSettingsMenu,
        play,
        playStepByStep,
        playSlowly,
        hideBlocks,
        cleanArtwork,
        collapseBlocks,
        undo,
        redo,
    });
}
