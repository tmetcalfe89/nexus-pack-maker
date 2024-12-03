import { component } from "@tmetcalfe89/vibrations";

export default function modManagementDropdownEntry(
  dependencies,
  init,
  updater
) {
  return component(
    ['[data-target="mod-management"]'],
    dependencies,
    (parent, state, aux) => {
      const { createElement, listen } = aux;
      const listItem = createElement("listItem", "li");
      const createButton = (props, onClick, listenerProps) => {
        const button = createElement("button", "a", props);
        listItem.appendChild(button);
        if (onClick) listen(button, "click", onClick, listenerProps);
        return button;
      };
      init(listItem, state, { ...aux, createButton });
      parent.appendChild(listItem);
    },
    (parent, state, aux) => {
      const { getElement } = aux;
      const listItem = getElement("listItem");
      updater(listItem, state, aux);
    }
  );
}
