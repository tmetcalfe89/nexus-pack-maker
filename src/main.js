import { createVibration } from "@tmetcalfe89/vibrations";
import parseStatus from "./sideEffects/parseStatus";
import statusDisplay from "./components/modPage/statusDisplay";
import modManagementDropdown from "./components/modPage/modManagementDropdown";
import saveMods from "./sideEffects/saveMods";
import toggleRejectButton from "./components/modPage/toggleRejectButton";
import toggleInPackButton from "./components/modPage/toggleInPackButton";

createVibration(
  {
    mods: JSON.parse(localStorage.getItem("tims-nexusmanager")),
    status: null,
  },
  [
    parseStatus,
    saveMods,
    statusDisplay,
    modManagementDropdown,
    toggleInPackButton,
    toggleRejectButton,
  ],
  {
    debug: true,
  }
);
