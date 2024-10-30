import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = BuilderDevTools()({
  /* config options here */
  // Builder.io props? 2 ways bindings in visual
  // error hydration https://nextjs.org/docs/messages/react-hydration-error
  //si j'utilise sur page local / a voir ds visual mode builder
  // serverExternalPackages: ["isolated-vm"],
  //Gestion svg à check 
  // https://nextjs.org/docs/app/api-reference/components/image#src
  // https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowsvg
  // images: {
  //   dangerouslyAllowSVG: true,
  //   contentDispositionType: 'inline', //atach
  //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  // },
});

export default nextConfig;
