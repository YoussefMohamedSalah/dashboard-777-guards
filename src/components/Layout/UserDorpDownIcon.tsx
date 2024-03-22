import { useAuth } from "contexts/AuthContext";
import useApp from "hooks/useApp";
import { Dropdown } from "react-bootstrap";
import { Session } from "types/Session";
import { getImageUrl } from "utils/Helpers";
import { removeClientSession } from "utils/Session";

interface Props {
  session: Session;
}

const UserDorpDownIcon = ({ session }: Props) => {
  const { setSession } = useAuth();
  const { push } = useApp();

  const handleLogout = async () => {
    setSession(null);
    removeClientSession();
    push("/login");
  };

  return (
    <Dropdown className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center pointer">
      <Dropdown.Toggle as="a" className="nav-link dropdown-toggle pulse p-0">
        <div className="u-info me-2">
          <p className="mb-0 text-end line-height-sm">
            <span className="font-weight-bold">{session?.user?.name || "admin"}</span>
          </p>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
        <div className="card border-0 w280">
          <div className="card-body pb-0">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                push("/profile");
              }}>
              <div className="d-flex py-1">
                <div className="flex-fill ms-3">
                  <p className="mb-0">
                    <span className="font-weight-bold">{session?.user?.name || "admin"}</span>
                  </p>
                  <small className="">{session?.user?.email! || "admin@example.com"}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="list-group m-2 ">
            <div>
              <hr className="dropdown-divider border-dark" />
            </div>
            <span onClick={handleLogout} className="list-group-item list-group-item-action border-0 pointer">
              <i className="icofont-logout fs-6 me-3" />
              Sign out
            </span>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDorpDownIcon;
