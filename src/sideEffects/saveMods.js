import { sideEffect } from "@tmetcalfe89/vibrations";

export default sideEffect(
  {
    mods: "mods",
  },
  ({ mods }) => {
    localStorage.setItem("tims-nexusmanager", JSON.stringify(mods));
  }
);
