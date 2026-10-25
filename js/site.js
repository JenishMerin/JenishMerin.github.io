(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(pointer: fine)").matches;
  if (reduce || !fine) return;

  const node = document.querySelector("[data-parallax]");
  if (!node) return;

  const root = document.documentElement;
  let tx = 0;
  let ty = 0;
  let x = 0;
  let y = 0;

  window.addEventListener(
    "pointermove",
    (event) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      tx = nx * 16;
      ty = ny * 10;
      root.style.setProperty("--spot-x", `${event.clientX}px`);
      root.style.setProperty("--spot-y", `${event.clientY}px`);
    },
    { passive: true }
  );

  const tick = () => {
    x += (tx - x) * 0.06;
    y += (ty - y) * 0.06;
    node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
})();
