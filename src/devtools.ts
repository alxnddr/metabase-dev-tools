console.log("devtools");

chrome.devtools.panels.create(
  "📊 Metabase",
  "src/panel-icon-16.png",
  "src/panel.html",
  (panel) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    console.log("panel", panel);
  }
);

export {};
