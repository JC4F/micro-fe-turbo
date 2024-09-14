// import { useRef, useEffect } from "react";
// import { createApp, defineAsyncComponent } from "vue";

// export const VuePage = () => {
//   const vueContainerRef = useRef(null);

//   useEffect(() => {
//     const VueComponent = defineAsyncComponent(() => import("vue/VuePage"));
//     const app = createApp(VueComponent);
//     console.log(1, VueComponent);

//     // Mount Vue app to the correct DOM node
//     if (vueContainerRef.current) {
//       app.mount(vueContainerRef.current);
//     }

//     return () => {
//       console.log(2);
//       // Unmount the Vue app to avoid multiple app instances on the same container
//       if (app) {
//         app.unmount();
//       }
//     };
//   }, []);

//   return <div ref={vueContainerRef}></div>;
// };

import("vue/VuePage");

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vue-page": any;
    }
  }
}

const VuePage = () => {
  return (
    <div className="rt-w-full rt-h-full rt-p-6 rt-flex rt-justify-center rt-items-center">
      <vue-page />
    </div>
  );
};

export default VuePage;
