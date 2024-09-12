import("angular/AngularPage");

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "angular-page": any;
    }
  }
}

const AngularPage = () => {
  return (
    <div className="w-full h-full p-6 flex justify-center items-center">
      <angular-page />
    </div>
  );
};

export default AngularPage;
