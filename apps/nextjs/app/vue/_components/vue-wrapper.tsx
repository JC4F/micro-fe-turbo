"use client";
import React, { Suspense, useEffect, useRef } from "react";
import loadable from "@loadable/component";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

const RemoteComponent = () => {
  const vueContainerRef = useRef(null);

  useEffect(() => {
    // Dynamically import the Vue component
    loadRemote("vue/VuePage").then(async ({ default: VueComponent }) => {
      console.log(111, VueComponent);

      const { createApp } = await import("vue");
      const app = createApp(VueComponent);
      app.mount(vueContainerRef.current!);
    });

    return () => {
      // Optionally unmount the Vue app on component cleanup
    };
  }, []);

  return <div ref={vueContainerRef}></div>;
};

const RemoteComponentWrapper = loadable(async () => {
  init({
    name: "load-vue",
    remotes: [
      {
        name: "vue",
        entry: "http://localhost:4002/assets/remoteEntry.js",
      },
    ],
  });

  return RemoteComponent;
});

export const VueWrapper = () => {
  return (
    <Suspense fallback={<div>Loading Vue Component...</div>}>
      <RemoteComponentWrapper />
    </Suspense>
  );
};

// Lazy load the Vue component via dynamic import
// export const VueWrapper = () => {
//   const vueContainerRef = useRef(null);

//   useEffect(() => {
//     // Dynamically import the Vue component
//     import("vue/VuePage").then(async ({ default: VueComponent }) => {
//       console.log(VueComponent);

//       const { createApp } = await import("vue");
//       const app = createApp(VueComponent);
//       app.mount(vueContainerRef.current!);
//     });

//     return () => {
//       // Optionally unmount the Vue app on component cleanup
//     };
//   }, []);

//   return <div ref={vueContainerRef}></div>;
// };
