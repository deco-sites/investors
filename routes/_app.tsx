import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "$store/sections/Theme/Theme.tsx";
import { Context } from "@deco/deco";

const sw = () =>
  addEventListener(
    "load",
    () =>
      navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.register("/sw.js"),
  );

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      <Theme />

      <Head>
        <meta name="view-transition" content="same-origin" />
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://assets.decocache.com/investors/a252c16b-0755-45ad-859b-5ebb08a4a64d/neg-d-logo.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://assets.decocache.com/investors/a252c16b-0755-45ad-859b-5ebb08a4a64d/neg-d-logo.png"
        />
        <link rel="manifest" href={asset("/site.webmanifest")} />
        <style>{`html, body { background: #070707; margin: 0; padding: 0; }`}</style>
      </Head>

      {/*
        Atmospheric glow layer — scattered lime/yellow-green blobs on near-black.
        Each radial-gradient is an independent light source at an irregular position.
        filter:blur(80px) on the whole div melts them into one continuous soft field.
        No JS, no canvas — pure CSS.
      */}
      <div
        style={{
          position: "fixed",
          inset: "0",
          zIndex: "1",
          pointerEvents: "none",
          filter: "blur(80px)",
          background: [
            // upper-left — large lime wash
            "radial-gradient(ellipse 62% 42% at 7% 11%,  rgba(2,246,124,0.26) 0%, transparent 100%)",
            // upper-right — yellow-green, offset
            "radial-gradient(ellipse 40% 52% at 93% 6%,  rgba(168,224,32,0.20) 0%, transparent 100%)",
            // mid-left — smaller lime
            "radial-gradient(ellipse 30% 36% at 22% 47%, rgba(2,246,124,0.16) 0%, transparent 100%)",
            // centre-right — subtle yellow-green
            "radial-gradient(ellipse 44% 30% at 71% 34%, rgba(168,224,32,0.13) 0%, transparent 100%)",
            // lower-left — wide lime pool
            "radial-gradient(ellipse 55% 38% at 12% 78%, rgba(2,246,124,0.18) 0%, transparent 100%)",
            // lower-right — yellow-green flare
            "radial-gradient(ellipse 35% 44% at 85% 80%, rgba(168,224,32,0.22) 0%, transparent 100%)",
            // near-bottom centre — faint lime
            "radial-gradient(ellipse 50% 28% at 51% 94%, rgba(2,246,124,0.12) 0%, transparent 100%)",
            // off-centre stray — adds irregularity
            "radial-gradient(ellipse 26% 38% at 60% 58%, rgba(120,230,50,0.10) 0%, transparent 100%)",
          ].join(","),
        }}
      />

      {/* Content above the glow */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <ctx.Component />
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
