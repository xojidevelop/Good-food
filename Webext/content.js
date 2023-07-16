console.log("content.js starting");

const obs = new MutationObserver(() => {
  document.querySelectorAll("a").forEach(a => {
    a.style.backgroundColor = "red";
  });
});

obs.observe(document.documentElement, {
  childList: true,
  subtree: true,
});