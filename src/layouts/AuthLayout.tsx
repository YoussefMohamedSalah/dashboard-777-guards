import { Suspense, lazy } from "react";
import Loading from "components/UI/Loading";

const SignIn = lazy(() => import("../components/Auth/SignIn"));

const AuthLayout = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="row g-0 justify-content-center" style={{ flex: 1 }}>
        <div className="col-lg-12" style={{ height: "100vh", flex: 1 }}>
          <Suspense fallback={<Loading />}>
            <SignIn />
          </Suspense>
        </div>
      </div>
    </div >
  );
};

export default AuthLayout;
