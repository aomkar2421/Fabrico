import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "../constants/index";

// import logoLight from "../assets/logo-light.svg";
// import logoDark from "../assets/logo-dark.svg";
import fabricoLight from "../assets/fabricoLight.png";
import fabricoDark from "../assets/fabricoDark.png";
import logo from "../assets/logo.jpg";

import { cn } from "../utils/cn";

import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      <div className="flex gap-x-3 p-3">
        {!collapsed ? (
          <div className="flex">
            <img
              src={fabricoLight}
              alt="Logoipsum"
              className="dark:hidden h-7 m-auto mt-2"
            />
            <img
              src={fabricoDark}
              alt="Logoipsum"
              className="h-7 m-auto mt-2 hidden dark:block"
            />
          </div>
        ) : (
          <img src={logo} alt="Logoipsum" className="h-7 m-auto mt-2" />
        )}
      </div>
      <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
        {navbarLinks.map((navbarLink) => (
          <nav
            key={navbarLink.title}
            className={cn("sidebar-group", collapsed && "md:items-center")}
          >
            <p
              className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}
            >
              {navbarLink.title}
            </p>
            {navbarLink.links.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={cn("sidebar-item", collapsed && "md:w-[45px]")}
              >
                <link.icon size={22} className="flex-shrink-0" />
                {!collapsed && (
                  <p className="whitespace-nowrap">{link.label}</p>
                )}
              </NavLink>
            ))}
          </nav>
        ))}
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
