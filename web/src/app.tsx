import { useNuiEvent } from "@/hooks/useNuiEvent.ts";
import { useEffect, useState } from "react";
import CarHud from "./components/car-hud";
import Compass from "./components/compass";
import PlayerStatus from "./components/player-status";
import {
  useSetMinimapState,
  type MinimapStateInterface,
} from "./states/minimap";
import type { ConfigInterface } from "./types/config";
import { debug, setDebugMode } from "./utils/debug";
import { fetchNui } from "./utils/fetchNui";
import { isEnvBrowser } from "./utils/misc";
import { useCompassLocationStore } from "./states/compass-location";
import compass from "./components/compass";

if (isEnvBrowser()) {
  const body = document.body;
  body!.style.backgroundImage = 'url("https://images.hdqwalls.com/download/dodge-charger-srt-hellcat-enforcer-n1-3840x2400.jpg")';
  body!.style.backgroundSize = 'cover';
  body!.style.backgroundRepeat = 'no-repeat';
  debug("App loaded in browser");
}

export function App() {
  const [visible, setVisible] = useState(true);
  const setMinimapState = useSetMinimapState();
  const [compassLocation, setCompassLocation] = useCompassLocationStore();

  useNuiEvent("setVisible", (state) => {
    const newState = state === "toggle" ? !visible : state;
    setVisible(newState);

    debug(
      `(App) NUI message received: setVisible ${state}`,
      `newState: ${newState}`,
    );
  });

  useEffect(() => {
    fetchNui("uiLoaded")
      .then(
        (res: { config: ConfigInterface; minimap: MinimapStateInterface }) => {
          setDebugMode(res.config.debug ?? false);
          setMinimapState(res.minimap);
          setCompassLocation(res.config.compassLocation);
        },
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
      {compassLocation !== "hidden" && (
        <>
          <Compass />
        </>
      )}
    </>
  );
}
