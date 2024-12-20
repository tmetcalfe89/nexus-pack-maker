import { component } from "@tmetcalfe89/vibrations";
import searchPageStyles from "../../style/searchPage.module.css";
import { squarePlusIcon } from "../icons";

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
    addDependency(["mods", modId, "added"], "added");
    removeDependency("status");
    removeDependency("mods");
    const status = statuses?.[modId];
    const button = createElement("button", "i", {
      className: `${searchPageStyles.inPack}`,
      innerHTML: squarePlusIcon(),
      title: status || "Unreviewed",
    });
    button.dataset.status = status || "Unreviewed";
    listen(button, "click", () => {
      if (!mods[modId]?.added) {
        setState(["mods", modId, "rejected"], false);
      }
      setState(["mods", modId, "added"], (p) => {
        console.log(p);
        return !p;
      });
    });

    parent.appendChild(button);
  },
  (parent, { status, added }, { getElement, listen, setState }) => {
    const modId = parent.dataset.modId;
    const button = getElement("button");
    button.dataset.status = status || "Unreviewed";
    button.title = status || "Unreviewed";

    listen(button, "click", () => {
      if (!added) {
        setState(["mods", modId, "rejected"], false);
      }
      setState(["mods", modId, "added"], (p) => !p);
    });
  }
);
