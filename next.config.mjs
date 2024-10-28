import BuilderDevTools from "@builder.io/dev-tools/next";

/** @type {import('next').NextConfig} */
const nextConfig = BuilderDevTools()(
  {
    experimental: {
      serverComponentsExternalPackages: ["isolated-vm"],
    },
    //Gestion svg 
    // https://nextjs.org/docs/app/api-reference/components/image#src
    // https://nextjs.org/docs/app/api-reference/components/image#dangerouslyallowsvg
    images: {
      dangerouslyAllowSVG: true,
      contentDispositionType: 'inline', //atach
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
  });

export default nextConfig;
