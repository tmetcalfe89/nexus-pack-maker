import { createVibration } from "@tmetcalfe89/vibrations";
import parseStatus from "./sideEffects/parseStatus";
import statusDisplay from "./components/statusDisplay";
import modManagementDropdown from "./components/modManagementDropdown";
import saveMods from "./sideEffects/saveMods";
import toggleRejectButton from "./components/toggleRejectButton";
import toggleInPackButton from "./components/toggleInPackButton";

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
