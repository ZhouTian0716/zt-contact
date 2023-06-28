// Google Map
export const apiKey = import.meta.env.VITE_APP_GMAP_API_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
// Load google map api js
function loadAsyncScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src,
    });
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  });
}

export const initMapScript = () => {
  if (window.google) {
    return Promise.resolve();
  }
  const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly&callback=Function.prototype`;
  return loadAsyncScript(src);
};
