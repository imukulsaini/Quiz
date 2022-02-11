import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";

export function AccountSetting() {
  return (
    <div className="account h-screen w-full bg-primary">
      <Navbar />
      <section className="grid">
        <div className="w-5/12 place-self-center  py-2 mt-10 px-6 shadow-lg rounded-lg bg-white ">
          <div className="py-5">
            <h2 className="text-4xl font-medium text-headline">
              General Settings :
            </h2>
          </div>
          <div className="tabs py-2 mb-5">
            <div className="flex  justify-center gap-6">
              <NavLink
                to="profile"
                end
                className={({ isActive }) =>
                  isActive
                    ? "border border-background-600 border-solid pl-5 pr-5 text-xl font-medium text-paragraph-text no-underline rounded-md bg-secondary"
                    : "border border-background-600 border-solid pl-5 pr-5 text-xl font-medium text-paragraph-text no-underline rounded-md"
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="password"
                end
                className={({ isActive }) =>
                  isActive
                    ? "border border-background-600 border-solid pl-5 pr-5 text-xl font-medium text-paragraph-text no-underline rounded-md bg-secondary"
                    : "border border-background-600 border-solid pl-5 pr-5 text-xl font-medium text-paragraph-text no-underline rounded-md"
                }
              >
                Password
              </NavLink>
            </div>
          </div>

          <Outlet />
        </div>
      </section>
    </div>
  );
}
