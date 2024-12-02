import { component } from "@tmetcalfe89/vibrations";
import getPageModId from "../../../util/getPageModId";

export default component(
  ['.tab-description .accordion dt[data-tracking*="View Requirements"] + dd'],
  {},
  (parent, {}, { setState }) => {
    const requirementTableAnchor = [...parent.querySelectorAll(`h3`)].find(
      (e) => e.innerText === "Nexus requirements"
    );
    let requirementTable = null;
    if (requirementTableAnchor) {
      requirementTable = requirementTableAnchor.nextElementSibling;
    } else {
      const requirementBlock = document.createElement("div");
      requirementBlock.className = "tabbed-block";
      requirementBlock.innerHTML = `<h3>Nexus requirements</h3>
        <table class="table desc-table">
          <thead>
            <tr>
              <th class="table-require-name header headerSortDown">
                <span class="table-header">Mod name</span>
              </th>
              <th class="table-require-notes">
                <span class="table-header">Notes</span>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>`;
      requirementTable = requirementBlock.querySelector("table");
      parent.prepend(requirementBlock);
    }

    const requirementRows = [...requirementTable.querySelectorAll("tbody tr")];
    requirementRows.forEach((reqRow) => {
      const reqId = reqRow
        .querySelector(".table-require-name a")
        .href.split("/")[5];
      const notesEl = reqRow.querySelector(".table-require-notes");
      const notes = notesEl.innerText.trim();
      setState(
        `mods.'${getPageModId()}'.dependencies.'${reqId}'`,
        (p) =>
          p || {
            required: null,
            manual: false,
            notes,
          }
      );
    });
  }
);
