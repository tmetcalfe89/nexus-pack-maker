import { component } from "@tmetcalfe89/vibrations";

export default component(
  ['.tab-description .accordion dt[data-tracking*="View Requirements"] + dd'],
  {},
  (parent) => {
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
    requirementTable.dataset.target = "dependency-table";
    const theadTh = document.createElement("th");
    theadTh.innerText = "Toggle";
    requirementTable.querySelector("thead tr").appendChild(theadTh);
  }
);
