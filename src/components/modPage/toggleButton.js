import { component } from "@tmetcalfe89/vibrations";

export default function toggleButton(
  dependencyKey,
  onToggle,
  turnOnText,
  turnOffText
) {
  return component(
    ['[data-target="mod-management"]'],
    {
      [dependencyKey]: dependencyKey,
    },
    (parent, dependencies, { createElement, setState, listen }) => {
      const dependency = dependencies[dependencyKey];
      const listItem = document.createElement("li");
      const button = createElement("button", "a", {
        innerText: dependency ? turnOffText : turnOnText,
      });
      listItem.appendChild(button);
      parent.appendChild(listItem);

      listen(button, "click", () => {
        onToggle(dependency, setState);
        setState(dependencyKey, !dependency);
      });
    },
    (parent, dependencies, { getElement, listen, setState }) => {
      const dependency = dependencies[dependencyKey];
      const button = getElement("button");
      button.innerText = dependency ? turnOffText : turnOnText;
      listen(button, "click", () => {
        onToggle(dependency, setState);
        setState(dependencyKey, !dependency);
      });
    }
  );
}
