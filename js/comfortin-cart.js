(() => {
  const offset = "-55vh";
  const scale = "0.7";

  const apply = () => {
    const frames = document.querySelectorAll('iframe[title="chat widget"]');
    if (!frames.length) return;

    frames.forEach((frame) => {
      frame.style.setProperty(
        "transform",
        `translateY(${offset}) scale(${scale})`,
        "important",
      );
      frame.style.setProperty("transform-origin", "bottom right", "important");
      frame.style.setProperty("right", "10px", "important");
      frame.style.setProperty("left", "auto", "important");
      frame.style.setProperty("bottom", "0px", "important"); 
      frame.style.setProperty("top", "auto", "important");
    });
  };

  const init = () => {
    apply();
    setTimeout(apply, 500);
    setTimeout(apply, 1500);
    setTimeout(apply, 3000);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("resize", apply);
})();
