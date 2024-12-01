import { component } from "@tmetcalfe89/vibrations";
import getPageModId from "../util/getPageModId";

export default component(
  ['[data-target="mod-management"]'],
  {
    [`mods.'${getPageModId()}'.rejected`]: "rejected",
  },
  (parent, { rejected }, { createElement, listen, setState }) => {
    const listItem = document.createElement("li");
    const button = createElement("button", "a", {
      innerText: rejected ? "Unreject" : "Reject",
    });
    listItem.appendChild(button);
    parent.appendChild(listItem);

    listen(button, "click", () => {
      if (!rejected) {
        setState(`mods.'${getPageModId()}'.added`, false);
      }
      setState(`mods.'${getPageModId()}'.rejected`, !rejected);
    });
  },
  (parent, { rejected }, { getElement, listen, setState }) => {
    const button = getElement("button");
    button.innerText = rejected ? "Unreject" : "Reject";

    listen(button, "click", () => {
      if (!rejected) {
        setState(`mods.'${getPageModId()}'.added`, false);
      }
      setState(`mods.'${getPageModId()}'.rejected`, !rejected);
    });
  }
);
