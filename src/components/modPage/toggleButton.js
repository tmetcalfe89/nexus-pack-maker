import modManagementDropdownEntry from "./modManagementDropdownEntry";

export default function toggleButton(
  dependencyKey,
  onToggle,
  turnOnText,
  turnOffText
) {
  return modManagementDropdownEntry(
    {
      [dependencyKey]: dependencyKey,
    },
    (parent, dependencies, { createButton, setState }) => {
      const dependency = dependencies[dependencyKey];
      createButton(
        {
          innerText: dependency ? turnOffText : turnOnText,
        },
        () => {
          onToggle(dependency, setState);
          setState(dependencyKey, !dependency);
        }
      );
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
