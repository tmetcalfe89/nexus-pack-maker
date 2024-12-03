import addDependency from "./addDependency";
import addManualDependencyRows from "./addManualDependencyRows";
import extractModData from "./extractModData";
import modManagementDropdown from "./modManagementDropdown";
import removeNoDepsMessage from "./removeNoDepsMessage";
import setupRequirementTable from "./setupRequirementTable";
import statusDisplay from "./statusDisplay";
import toggleInPackButton from "./toggleInPackButton";
import toggleRejectButton from "./toggleRejectButton";

export default [
  ...extractModData,
  setupRequirementTable,
  addManualDependencyRows,
  modManagementDropdown,
  statusDisplay,
  toggleInPackButton,
  toggleRejectButton,
  removeNoDepsMessage,
  addDependency,
];
