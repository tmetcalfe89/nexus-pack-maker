import manageCustomDependencies from "./manageCustomDependencies";
import addDependencySwitch from "./addDependencySwitch";
import addManualDependencyRows from "./addManualDependencyRows";
import extractModData from "./extractModData";
import modManagementDropdown from "./modManagementDropdown";
import removeNoDepsMessage from "./removeNoDepsMessage";
import setupRequirementTable from "./setupRequirementTable";
import statusDisplay from "./statusDisplay";
import toggleInPackButton from "./toggleInPackButton";
import toggleRejectButton from "./toggleRejectButton";
import manageCompat from "./manageCompat";

export default [
  ...extractModData,
  addDependencySwitch,
  setupRequirementTable,
  addManualDependencyRows,
  modManagementDropdown,
  statusDisplay,
  toggleInPackButton,
  toggleRejectButton,
  removeNoDepsMessage,
  manageCustomDependencies,
  manageCompat,
];
