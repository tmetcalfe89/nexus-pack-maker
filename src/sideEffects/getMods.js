import { sideEffect } from "@tmetcalfe89/vibrations";

export default sideEffect({}, ({}, { setState }) => {
  setState("mods", JSON.parse(localStorage.getItem("tims-nexusmanager")) || {});
});
