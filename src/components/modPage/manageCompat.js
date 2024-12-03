import createModal from "../../util/createModal";
import getPageModId from "../../util/getPageModId";
import modManagementDropdownEntry from "./modManagementDropdownEntry";
import manageCompatStyles from "../../style/manageCompat.module.css";
import utilityStyles from "../../style/utility.module.css";

function renderCards(mods, createElement, compatBody, setState) {
  const mod = mods[getPageModId()];
  const compat = mod?.compat || [];
  for (const i in compat) {
    const list = compat[i];
    const compatCard = createElement(`compatCard-${list}`, "div", {
      className: manageCompatStyles.modCompatCard,
      innerHTML: `
      <div class="${utilityStyles.row}" style="align-items: center; justify-content: space-between;">
        <h2>Compat List ${i}</h2>
        <button data-action="remove">x</button>
      </div>
      <ul></ul>
      `,
    });
    const addDepForm = createElement("addDepForm", "form", {
      className: utilityStyles.row,
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
      const modId = e.target.dep.value;
      setState(`mods.'${getPageModId()}'.compat.${i}`, (p) =>
        p.includes(modId) ? p : [...(p || []), modId]
      );
    });
    compatBody.appendChild(compatCard);
    const removeButton = compatCard.querySelector('[data-action="remove"]');
    removeButton.addEventListener("click", () => {
      setState(`mods.'${getPageModId()}'.compat`, (p) =>
        p.filter((_e, index) => index != i)
      );
    });
    const listEl = compatCard.querySelector("ul");
    listEl.before(addDepForm);

    for (const modId of list) {
      const mod = mods[modId];
      const modTitle = mod?.modTitle || modId;
      const compatCardLine = createElement(
        `compatCard-${list}-${modId}`,
        "li",
        {
          innerHTML: `${modTitle}<button data-action="remove">x</button>`,
        }
      );
      const removeButton = compatCardLine.querySelector(
        '[data-action="remove"]'
      );
      removeButton.addEventListener("click", () => {
        setState(`mods.'${getPageModId()}'.compat.${i}`, (p) =>
          p.filter((pModId) => pModId !== modId)
        );
      });
      listEl.appendChild(compatCardLine);
    }
  }
}

export default modManagementDropdownEntry(
  { mods: "mods" },
  (parent, { mods }, { createButton, createElement, listen, setState }) => {
    const compatBody = createElement("compatBody", "div", {
      innerHTML: `
      <button>Add Compat List</button>
      `,
    });
    listen(
      compatBody.querySelector("button"),
      "click",
      () => {
        setState(`mods.'${getPageModId()}'.compat`, (p) => [...(p || []), []]);
      },
      { persistent: true }
    );
    renderCards(mods, createElement, compatBody, setState);
    const modal = createModal(
      createElement,
      "manageCompatModal",
      "Manage Compat",
      {
        mainContent: compatBody,
      }
    );
    createButton(
      {
        innerText: "Compat",
      },
      () => {
        modal.open = true;
      },
      { persistent: true }
    );
  },
  (parent, { mods }, { createElement, getElement, setState }) => {
    const compatBody = getElement("compatBody");
    compatBody
      .querySelectorAll(`.${manageCompatStyles.modCompatCard}`)
      .forEach((e) => e.remove());
    renderCards(mods, createElement, compatBody, setState);
  }
);
