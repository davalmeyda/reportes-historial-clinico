import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {useSelector} from "react-redux";

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
  const {navStyle, themeType} = useSelector(({settings}) => settings);
  const pathname = useSelector(({common}) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          {/* <UserProfile/> */}
          {/* <AppsNavigation/> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <Menu.Item key="reporte1">
              <Link to="/reporte1"><i className="icon icon-widgets"/>
                <span>Analisis de Ordenes y Pacientes vs Concluidos</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="reporte2">
              <Link to="/reporte2"><i className="icon icon-widgets"/>
                <span>Analisis de Venta por Mes</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="reporte3">
              <Link to="/reporte3"><i className="icon icon-widgets"/>
                <span>Examenes mas Rotados</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="reporte4">
              <Link to="/reporte4"><i className="icon icon-widgets"/>
                <span>Atencion de espcialidades por mes</span>
              </Link>
            </Menu.Item>

          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

