import { component } from "@tmetcalfe89/vibrations";
import getPageModId from "../../util/getPageModId";

export default component(
  ['[data-target="dependency-table"] tbody'],
  {
    mods: "mods",
  },
  (parent, { mods }, { createElement }) => {
    const deps = mods[getPageModId()]?.dependencies;
    if (!deps) return;
    Object.entries(deps).forEach(([modId, { manual }]) => {
      if (!manual) return;
      const mod = mods[modId];
      const modTitle = mod?.modTitle || modId;
      const modNotes = mod?.notes || "";
      const row = createElement(`customDep-${modId}`, "tr", {
        innerHTML: `<td>
          <a href="https://www.nexusmods.com/skyrimspecialedition/mods/${modId}">${modTitle}</a>
        </td>
        <td>${modNotes}</td>`,
      });
      row.dataset.manualDepRow = "true";
      parent.appendChild(row);
    });
  },
  (parent, { mods }, { createElement }) => {
    parent
      .querySelectorAll('[data-manual-dep-row="true"]')
      .forEach((el) => el.remove());
    const deps = mods[getPageModId()]?.dependencies;
    if (!deps) return;
    Object.entries(deps).forEach(([modId, { manual } = {}]) => {
      if (!manual) return;
      const mod = mods[modId];
      const modTitle = mod?.modTitle || modId;
      const modNotes = mod?.notes || "";
      const row = createElement(`customDep-${modId}`, "tr", {
        innerHTML: `<td>
          <a href="https://www.nexusmods.com/skyrimspecialedition/mods/${modId}">${modTitle}</a>
        </td>
        <td>${modNotes}</td>
        <td></td>`,
      });
      row.dataset.manualDepRow = "true";
      parent.appendChild(row);
    });
  }
);
