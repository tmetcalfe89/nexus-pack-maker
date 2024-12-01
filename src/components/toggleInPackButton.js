import getPageModId from "../util/getPageModId";
import { component } from "@tmetcalfe89/vibrations";

export default component(
  ['[data-target="mod-management"]'],
  {
    [`mods.'${getPageModId()}'.added`]: "added",
  },
  (parent, { added }, { createElement, setState, listen }) => {
    const listItem = document.createElement("li");
    const button = createElement("button", "a", {
      innerText: added ? "Remove" : "Add",
    });
    listItem.appendChild(button);
    parent.appendChild(listItem);

    listen(button, "click", () => {
      if (!added) {
        setState(`mods.'${getPageModId()}'.rejected`, false);
      }
      setState(`mods.'${getPageModId()}'.added`, !added);
    });
  },
  (parent, { added }, { getElement, listen, setState }) => {
    const button = getElement("button");
    button.innerText = added ? "Remove" : "Add";
    listen(button, "click", () => {
      if (!added) {
        setState(`mods.'${getPageModId()}'.rejected`, false);
      }
      setState(`mods.'${getPageModId()}'.added`, !added);
    });
  }
);
