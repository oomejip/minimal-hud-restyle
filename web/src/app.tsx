import { useNuiEvent } from "@/hooks/useNuiEvent.ts";
import { useEffect, useState } from "react";
import {
    useSetMinimapState,
    type MinimapStateInterface,
} from "./states/minimap";
import type { ConfigInterface } from "./tyes/config";
import { debug, setDebugMode } from "./utils/debug";
import { fetchNui } from "./utils/fetchNui";
import { isEnvBrowser } from "./utils/misc";
import CarHud from "./components/car-hud";
import PlayerStatus from "./components/player-status";
import Compass from "./components/compass";

if (isEnvBrowser()) {
    const body = document.body;

    body.style.backgroundColor = "#242424";
    debug("App loaded in browser");
}

export function App() {
    const [visible, setVisible] = useState(true);
    const setMinimapState = useSetMinimapState();

    useNuiEvent("setVisible", (state) => {
        const newState = state === "toggle" ? !visible : state;
        setVisible(newState);

        debug(
            `(App) NUI message received: setVisible ${state}`,
            `newState: ${newState}`
        );
    });

    useEffect(() => {
        fetchNui("uiLoaded")
            .then(
                (res: {
                    config: ConfigInterface;
                    minimap: MinimapStateInterface;
                }) => {
                    setDebugMode(res.config.debug ?? false);
                    setMinimapState(res.minimap);
                }
            )
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                debug("(App) fetched uiLoaded callback");
            });
    }, []);

    if (!visible) {
        debug("(App) Returning with no children since the app is not visible.");
        return <></>;
    }

    return (
        <>
            <PlayerStatus />
            <CarHud />
            <Compass />
        </>
    );
}
