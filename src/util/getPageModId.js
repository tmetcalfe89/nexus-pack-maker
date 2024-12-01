export default function getPageModId() {
  return window.location.pathname.split("/")[3];
}
