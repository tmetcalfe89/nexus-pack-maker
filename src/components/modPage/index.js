import extractModData from "./extractModData";
import modManagementDropdown from "./modManagementDropdown";
import statusDisplay from "./statusDisplay";
import toggleInPackButton from "./toggleInPackButton";
import toggleRejectButton from "./toggleRejectButton";

export default [
  ...extractModData,
  modManagementDropdown,
  statusDisplay,
  toggleInPackButton,
  toggleRejectButton,
];
