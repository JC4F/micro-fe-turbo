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
    <div className="rt-w-full rt-h-full rt-p-6 rt-flex rt-justify-center rt-items-center">
      <angular-page />
    </div>
  );
};

export default AngularPage;
