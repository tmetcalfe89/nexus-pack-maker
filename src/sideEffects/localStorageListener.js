import { sideEffect } from "@tmetcalfe89/vibrations";

export default sideEffect({}, ({}, { setState }) => {
  window.addEventListener("storage", function (event) {
    if (event.key === "tims-nexusmanager") {
      setState("mods", JSON.parse(event.newValue));
    }
  });
});
