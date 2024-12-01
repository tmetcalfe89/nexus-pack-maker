import { createVibration } from "@tmetcalfe89/vibrations";
import parseStatus from "./sideEffects/parseStatus";
import statusDisplay from "./components/statusDisplay";
import modManagementDropdown from "./components/modManagementDropdown";
import toggleInPackButton from "./components/toggleInPackButton";
import saveMods from "./sideEffects/saveMods";
import toggleRejectButton from "./components/toggleRejectButton";

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
