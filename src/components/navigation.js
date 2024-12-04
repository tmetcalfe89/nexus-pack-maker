import { component } from "@tmetcalfe89/vibrations";
import { cubeIcon } from "./icons";
import createModal from "../util/createModal";
import packReviewStyles from "../style/packReview.module.css";
import { isIn } from "../util/calculateStatuses";

function createModCards(statuses, mods, createElement, packList, search) {
  Object.entries(statuses)
    .filter(([_modId, status]) => {
      return isIn(status);
    })
    .sort(([aModId], [bModId]) => {
      const aName = mods[aModId]?.modTitle || aModId;
      const bName = mods[bModId]?.modTitle || bModId;
      return aName.localeCompare(bName);
    })
    .forEach(([modId, status]) => {
      const missingModData = !mods[modId]?.dependencies;
      const mod = mods[modId];
      if (search && !mod.modTitle.toLowerCase().includes(search.toLowerCase()))
        return;
      const dependentsNeedingReview = mod?.dependencies
        ? Object.entries(mod.dependencies).filter(
            ([_modId, { required } = {}]) => required === null
          )
        : [];
      const modCard = createElement(`modCard-${modId}`, "section", {
        className:
          missingModData || dependentsNeedingReview.length
            ? packReviewStyles.needsAttentionEntry
            : packReviewStyles.listEntry,
        innerHTML: `
        <header>
          <h2>
            <a href="https://www.nexusmods.com/skyrimspecialedition/mods/${modId}">
              ${mod?.modTitle || modId}
            </a>
            ${missingModData ? `<small>Go get the mod data</small>` : ""}
            ${missingModData ? "" : `<small>${status}</small>`}
          </h2>
        </header>
        <main>
          ${
            dependentsNeedingReview.length
              ? `<h3>Dependencies Need Review</h3>
              <p>${dependentsNeedingReview
                .map(
                  ([modId]) =>
                    `<a href="https://www.nexusmods.com/skyrimspecialedition/mods/${modId}">${modId}</a>`
                )
                .join(" ")}</p>`
              : ""
          }
        </main>
        `,
      });
      packList.appendChild(modCard);
    });
}

export default component(
  [".nav-interact-buttons"],
  { status: "statuses", mods: "mods" },
  (parent, { mods, statuses }, { createElement, listen, setInternalState }) => {
    setInternalState("search", "");
    const packReviewDiv = document.createElement("div");
    packReviewDiv.className = "nav-interact rj-upload";
    packReviewDiv.innerHTML = `
      <div class="ni-background"></div>
      ${cubeIcon()}
    `;
    const packList = createElement("packList", "div", {
      className: packReviewStyles.list,
      innerHTML: `
      <h2 class="${packReviewStyles.needsAttentionHeader}">Needs Attention</h2>
      <h2 class="${packReviewStyles.listHeader}">List</h2>`,
    });
    createModCards(statuses, mods, createElement, packList);
    const searchInput = createElement("searchInput", "input");
    searchInput.addEventListener("input", (e) => {
      setInternalState("search", e.target.value);
    });
    const packReviewModal = createModal(
      createElement,
      "packReviewModal",
      "Pack Review",
      {
        mainContent: packList,
        headerContent: searchInput,
      }
    );

    listen(
      packReviewDiv,
      "click",
      () => {
        packReviewModal.open = true;
      },
      { persistent: true }
    );

    parent.prepend(packReviewDiv);
  },
  (
    parent,
    { mods, statuses },
    { getElement, createElement, getInternalState }
  ) => {
    console.log(getInternalState("search"));
    const packList = getElement("packList");
    packList.querySelectorAll("section").forEach((e) => e.remove());
    createModCards(
      statuses,
      mods,
      createElement,
      packList,
      getInternalState("search")
    );
  }
);
