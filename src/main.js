import { createVibration } from "@tmetcalfe89/vibrations";
import components from "./components";
import sideEffects from "./sideEffects";
import "./style/overwrite.css";

createVibration(
  {
    mods: null,
    status: null,
  },
  [...sideEffects, ...components],
  {
    debug: true,
  }
);
