import { component } from "@tmetcalfe89/vibrations";

export default component([".mod-tile"], {}, (parent, {}, { setState }) => {
  const nameLink = parent.querySelector(".tile-name a");
  const modId = nameLink.href.split("/")[5];
  setState(["mods", modId, "modTitle"], (p) => p || nameLink.innerText.trim());

  const descEl = parent.querySelector(".desc");
  setState(["mods", modId, "notes"], (p) => p || descEl.innerText.trim());
});
