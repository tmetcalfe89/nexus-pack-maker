import modalStyle from "../style/modal.module.css";

export default function createModal(
  createElement,
  modalId,
  title,
  { headerContent, mainContent, footerContent } = {}
) {
  const modal = createElement(modalId || "modal", "dialog", {
    className: modalStyle.modal,
    innerHTML: `
    <header>
      <h1>${title}</h1>
      <div class="${modalStyle.headerSide}">
        <button>x</button>
      </div>
    </header>
    <main></main>
    ${footerContent ? `<footer></footer>` : ""}`,
  });
  modal.querySelector("button").addEventListener("click", () => {
    modal.open = false;
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      modal.open = false;
    }
  });
  modal.querySelector(`.${modalStyle.headerSide}`).prepend(headerContent || "");
  modal.querySelector("main").append(mainContent || "");
  modal.querySelector("footer")?.append(footerContent || "");
  document.body.appendChild(modal);
  return modal;
}
