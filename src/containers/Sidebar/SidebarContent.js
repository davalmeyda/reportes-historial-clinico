import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        {/* <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}> */}
        {/* <UserProfile/> */}
        {/* <AppsNavigation/> */}
        {/* </div> */}
        <CustomScrollbars
          className="gx-layout-sider-scrollbar"
          style={{ marginTop: "20px" }}
        >
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
          >
            <Menu.Item key="reporte1">
              <Link to="/reporte1">
                <i className="icon icon-auth-screen" />
                <span>Analisis de Ordenes y Pacientes vs Concluidos</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="reporte2">
              <Link to="/reporte2">
                <i className="icon icon-shopping-cart" />
                <span>Analisis de Venta por Mes</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="reporte3">
              <Link to="/reporte3">
                <i className="icon icon-editor" />
                <span>Examenes mas Rotados</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="reporte4">
              <Link to="/reporte4">
                <i className="icon icon-hotel-booking" />
                <span>Atencion de espcialidades por mes</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="powerBi"
              popupClassName={getNavStyleSubMenuClass(navStyle)}
              title={
                <span>
                  <i className="icon icon-data-display" />
                  <span>Power BI</span>
                </span>
              }
            >
              <Menu.Item key="especialidadDetallado">
                <Link to="/powerBi/especialidadDetallado">
                  <i className="icon icon-tree" />
                  <span>Tablero Especialidad - Detallado</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="especialidadAcumulado">
                <Link to="/powerBi/especialidadAcumulado">
                  <i className="icon icon-stats" />
                  <span>Tablero Especialidad - Acumulado</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="generalVenta">
                <Link to="/powerBi/generalVenta">
                  <i className="icon icon-timeline" />
                  <span>Tablero General - Venta</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
