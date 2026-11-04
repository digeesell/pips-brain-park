(async () => {
  const parts = await Promise.all(
    [1, 2, 3, 4, 5].map((n) => fetch("/js/app.p" + n + ".b64").then((r) => r.text()))
  );
  parts[0] = parts[0].replace("dGhlIH9yZGVy", "dGhlIG9yZGVy");
  if (!parts[3].replace(/\s/g, "").endsWith("ZEV2")) parts[3] += "V2";
  const bin = Uint8Array.from(atob(parts.join("").replace(/\s/g, "")), (c) => c.charCodeAt(0));
  const code = new TextDecoder().decode(bin).replace("shapeSvg cur)", "shapeSvg(cur)");
  (0, eval)(code);
})();
