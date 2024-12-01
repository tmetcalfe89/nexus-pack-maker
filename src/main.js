import { createVibration } from "@tmetcalfe89/vibrations";
import components from "./components";
import sideEffects from "./sideEffects";

createVibration(
  {
    mods: JSON.parse(localStorage.getItem("tims-nexusmanager")),
    status: null,
  },
  [...components, ...sideEffects],
  {
    debug: true,
  }
);
