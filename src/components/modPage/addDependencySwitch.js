import { component } from "@tmetcalfe89/vibrations";
import switchStyles from "../../style/switch.module.css";
import getPageModId from "../../util/getPageModId";

export default component(
  ['[data-target="dependency-table"] tbody tr'],
  {
    mods: "mods",
  },
  (
    parent,
    { mods },
    { createElement, removeDependency, addDependency, listen, setState }
  ) => {
    const depId = parent.querySelector("a").href.split("/")[5];
    const depSwitch = createElement("depSwitch", "label", {
      className: `${switchStyles.switch} tim-req-switch`,
      innerHTML: `<input type="checkbox" />
      <span class="${switchStyles.slider} ${switchStyles.round}"></span>`,
    });
    const td = document.createElement("td");
    td.appendChild(depSwitch);
    const depSwitchInput = depSwitch.querySelector("input");
    const required = mods[getPageModId()]?.dependencies[depId]?.required;
    if (required === null || required === undefined) {
      depSwitchInput.indeterminate = true;
    } else {
      depSwitchInput.checked = required;
    }
    parent.appendChild(td);

    listen(
      depSwitchInput,
      "change",
      () => {
        setState(
          `mods.'${getPageModId()}'.dependencies.'${depId}'.required`,
          (p) => !p
        );
      },
      { persistent: true }
    );

    removeDependency("mods");
    addDependency(
      `mods.'${getPageModId()}'.dependencies.'${depId}'.required`,
      "required"
    );
  },
  (parent, { required }, { getElement }) => {
    const depSwitchInput = getElement("depSwitch").querySelector("input");
    if (required === null || required === undefined) {
      depSwitchInput.indeterminate = true;
    } else {
      depSwitchInput.checked = required;
    }
  }
);
