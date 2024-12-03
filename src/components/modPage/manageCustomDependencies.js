import createModal from "../../util/createModal";
import getPageModId from "../../util/getPageModId";
import modManagementDropdownEntry from "./modManagementDropdownEntry";
import utilityStyle from "../../style/utility.module.css";

export default modManagementDropdownEntry(
  { mods: "mods" },
  (parent, { mods }, { createButton, createElement, setState, listen }) => {
    const manualDeps = createElement("manualDeps", "ul", {
      innerHTML: Object.entries(mods[getPageModId()].dependencies || {})
        .map(([modId, { manual } = {}]) =>
          manual
            ? `<li>
                ${mods[modId]?.modTitle || modId}
                <button data-mod-id-remove="${modId}">x</button>
              </li>`
            : ""
        )
        .join(""),
    });
    manualDeps.querySelectorAll("[data-mod-id-remove]").forEach((el) => {
      listen(el, "click", () => {
        setState(
          `mods.'${getPageModId()}'.dependencies.'${el.dataset.modIdRemove}'`,
          undefined
        );
      });
    });
    const addDepForm = createElement("addDepForm", "form", {
      className: utilityStyle.row,
      innerHTML: `<select style="flex-grow: 1;" name="dep">${Object.entries(
        mods
      )
        .sort(
          (
            [modIdA, { modTitle: modTitleA }],
            [modIdB, { modTitle: modTitleB }]
          ) => (modTitleA || modIdA).localeCompare(modTitleB || modIdB)
        )
        .map(
          ([modId, { modTitle }]) =>
            `<option value="${modId}">${modTitle}</option>`
        )
        .join("")}</select>
        <button>+</button>`,
    });
    addDepForm.addEventListener("submit", (e) => {
      e.preventDefault();
      setState(
        `mods.'${getPageModId()}'.dependencies.'${e.target.dep.value}'`,
        {
          required: true,
          manual: true,
          notes: "",
        }
      );
    });
    const mainContent = createElement("addDepContainer", "div");
    mainContent.appendChild(addDepForm);
    addDepForm.after(manualDeps);
    const modal = createModal(createElement, "addDepModal", "Add Dependency", {
      mainContent,
    });

    const main = modal.querySelector("main");
    main.style.display = "flex";
    main.style.flexDirection = "column";

    createButton(
      {
        innerText: "Deps",
      },
      () => {
        modal.open = true;
      },
      { persistent: true }
    );
  },
  (parent, { mods }, { getElement, listen, setState }) => {
    const manualDeps = getElement("manualDeps");
    manualDeps.innerHTML = Object.entries(
      mods[getPageModId()].dependencies || {}
    )
      .map(([modId, { manual } = {}]) =>
        manual
          ? `<li>
                ${mods[modId]?.modTitle || modId}
                <button data-mod-id-remove="${modId}">x</button>
              </li>`
          : ""
      )
      .join("");
    manualDeps.querySelectorAll("[data-mod-id-remove]").forEach((el) => {
      listen(el, "click", () => {
        setState(
          `mods.'${getPageModId()}'.dependencies.'${el.dataset.modIdRemove}'`,
          undefined
        );
      });
    });
  }
);
