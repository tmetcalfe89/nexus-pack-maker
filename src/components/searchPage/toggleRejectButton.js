import { component } from "@tmetcalfe89/vibrations";
import searchPageStyles from "../../style/searchPage.module.css";
import { squareMinusIcon } from "../icons";

export default component(
  ['[data-target="mod-management-search-page-mod-tile"]'],
  {
    status: "statuses",
    mods: "mods",
  },
  (
    parent,
    { statuses, mods },
    { createElement, addDependency, removeDependency, listen, setState }
  ) => {
    const modId = parent.dataset.modId;
    addDependency(["status", modId], "status");
    addDependency(["mods", modId, "rejected"], "rejected");
    removeDependency("status");
    removeDependency("mods");
    const status = statuses?.[modId];
    const rejected = status === "Rejected";
    const button = createElement("button", "i", {
      className: `${searchPageStyles.rejected}`,
      innerHTML: squareMinusIcon(),
      title: rejected ? "Rejected" : "Unrejected",
    });
    button.dataset.rejected = rejected;
    listen(button, "click", () => {
      if (!mods[modId]?.rejected) {
        setState(["mods", modId, "added"], false);
      }
      setState(["mods", modId, "rejected"], (p) => !p);
    });

    parent.appendChild(button);
  },
  (parent, { rejected }, { getElement, listen, setState }) => {
    const modId = parent.dataset.modId;
    const button = getElement("button");
    button.dataset.rejected = rejected;
    button.title = rejected ? "Rejected" : "Unrejected";

    listen(button, "click", () => {
      if (!rejected) {
        setState(["mods", modId, "added"], false);
      }
      setState(["mods", modId, "rejected"], (p) => !p);
    });
  }
);
