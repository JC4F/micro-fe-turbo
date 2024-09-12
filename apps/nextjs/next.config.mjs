// import NextFederationPlugin from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
  },

  // // eslint-disable-next-line no-unused-vars
  // webpack(config, _options) {
  //   // const { isServer } = options;
  //   config.plugins.push(
  //     new NextFederationPlugin({
  //       name: "nextjs",
  //       remotes: {
  //         vue: `http://localhost:4002/assets/remoteEntry.js`,
  //       },
  //       filename: "static/chunks/remoteEntry.js",
  //       shared: {
  //         // whatever else
  //       },
  //     })
  //   );

  //   return config;
  // },
};

export default nextConfig;
