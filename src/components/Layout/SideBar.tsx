import { useState } from "react";
import { Session } from "types/Session";
import useApp from "hooks/useApp";
import { useUI } from "contexts/UIContext";
import { sidebarMenu } from "./SidebarMenu";
import logoImage from "./logo.png"

type IState = {
  isSidebarMini: boolean;
  isOpenMenu2: boolean;
  darkLightMode: any;
  updateRtl: any;
};

const INITIAL_STATE: IState = {
  isSidebarMini: false,
  isOpenMenu2: false,
  darkLightMode: "light",
  updateRtl: false,
};

interface Props {
  session: Session | null;
};

const SideBar: React.FC<Props> = ({ session }) => {
  const [state, setState] = useState<IState>(INITIAL_STATE);
  const { isSidebarMini } = state;
  const activeKey = window.location.pathname;
  const { push } = useApp();
  const { isOpenSidebar } = useUI();

  const openChildren = (id: any) => {
    var otherTabs: any = document.getElementsByClassName("has-children");
    if (otherTabs) {
      for (var i = 0; i < otherTabs.length; i++) {
        if (otherTabs[i].id !== id) {
          otherTabs[i].className = otherTabs[i].className.replace(" show", "");
          if (otherTabs[i].parentElement.children.length > 1) {
            otherTabs[i].parentElement.children[0].setAttribute("aria-expanded", "false");
          }
        }
      }
    }
    var menuTab: any = document.getElementById(id);
    if (menuTab) {
      if (menuTab.classList.contains("show")) {
        menuTab.classList.remove("show");
        if (menuTab.parentElement.children.length > 1) {
          menuTab.parentElement.children[0].setAttribute("aria-expanded", "false");
        }
      } else {
        menuTab.classList.add("show");
        if (menuTab.parentElement.children.length > 1) {
          menuTab.parentElement.children[0].setAttribute("aria-expanded", "true");
        }
      }
    }
  };

  const openChildren1 = (id: any) => {
    var otherTabs: any = document.getElementsByClassName("has-children");
    if (otherTabs) {
      for (var i = 0; i < otherTabs.length; i++) {
        otherTabs[i].className = otherTabs[i].className.replace(" show", "");
      }
    }
    var menuTab: any = document.getElementById(id);
    if (menuTab) {
      menuTab.classList.add("show");
      if (menuTab.parentElement.children.length > 1) {
        menuTab.parentElement.children[0].setAttribute("aria-expanded", "true");
      }
    }
  };

  return (
    <div
      id="mainSideMenu"
      className={`sidebar px-4 py-4 py-md-5 me-0 
      ${isSidebarMini ? "sidebar-mini" : ""}
      ${isOpenSidebar ? "open" : ""}
      `}
      style={{ backgroundColor: "#2B2730" }}>
      <div className="d-flex flex-column h-100">
        <span
          onClick={() => {
            push("/");
          }}
          className="mb-0 brand-icon pointer">
          <span className="logo-icon">
            <img src={logoImage} alt="logo" className="logo" />
          </span>
          <span className="logo-text">777<br /> Guards</span>
        </span>
        <ul className="menu-list flex-grow-1 mt-3">
          {sidebarMenu.map((data: any, index: any) => {
            if (data.isToggled) {
              return (
                <li key={"nav" + index}>
                  <span
                    className={`m-link pointer`}
                    // to="#!"
                    onClick={(e) => {
                      e.preventDefault();
                    }}>
                    <i className={data.iconClass} />
                    <span>{data.name}</span>
                  </span>
                </li>
              );
            }
            if (data.children.length === 0) {
              return (
                <li key={"usbNav" + index} className=" collapsed">
                  <span
                    onClick={() => {
                      push(data.routerLink[0]);
                    }}
                    className={`m-link pointer ${data.routerLink[0] === activeKey ? "active" : ""}`}>
                    <i className={data.iconClass} />
                    <span>{data.name}</span>
                  </span>
                </li>
              );
            }
            return (
              <li key={"subNav" + index} className=" collapsed">
                <div
                  className={`m-link pointer ${data.children.filter((d: any) => "/" + data.routerLink[0] === activeKey).length > 0 ? "active" : ""
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    openChildren("menu-Pages" + index);
                  }}>
                  <i className={data.iconClass} />
                  <span>{data.name}</span>
                  <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                </div>
                {/* ----------------------- */}
                {data.children.length > 0 ? (
                  <ul className="sub-menu collapse has-children" id={"menu-Pages" + index}>
                    {data.children.map((data: any, i: number) => {
                      if (data.children.length > 0) {
                        if (activeKey === "/" + data.routerLink[0]) {
                          setTimeout(() => {
                            openChildren1("menu-Pages" + i);
                          }, 500);
                        }
                      }
                      return (
                        <li key={"subNav" + i}>
                          <span
                            className={
                              activeKey === "/" + data.routerLink[0] ? "ms-link active pointer" : "ms-link pointer"
                            }
                            onClick={() => {
                              push(data.routerLink[0]);
                            }}>
                            {" "}
                            <span>{data.name}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
                {/* ----------------------- */}
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="btn btn-link sidebar-mini-btn text-light"
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              isSidebarMini: !isSidebarMini,
            }));
          }}>
          <span className="ms-2">
            <i className="icofont-bubble-right" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
