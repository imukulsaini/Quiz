import React, { useState } from "react";
import { AiOutlineSetting, AiOutlineLogout, AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GrScorecard } from "react-icons/gr";
import { ReactComponent as BrandLogo } from "../../logo.svg";
import { useAuth } from "../../context/Auth/auth";
import { logoutUser } from "../../firebase/firebase.config";
import { Link, NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const {
    state: { isUserLogin, userData },
    dispatch,
  } = useAuth();
  const [isDropDownModal, setDropDown] = useState<boolean>(false);

  const navigate = useNavigate();

  async function signoutUser() {
    const response = await logoutUser();
    if (typeof response !== "object") {
      dispatch({
        type: "LOGOUT",
      });
      navigate("/");
    }
  }
  return (
    <nav className="nav-bar bg-primary  h-20 ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between">
          <div>
            <NavLink to="/" className="flex items-center gap-1 py-2 px-2">
              <BrandLogo className="w-16 h-16" />
              <span className="text-2xl font-semibold text-headline-500">
                Anime Quiz{" "}
              </span>
            </NavLink>
          </div>

          <div className="flex items-center text-gray-700 relative">
            {!isUserLogin ? (
              <Link
                to="/login"
                className="bg-highlight w-24 h-9 pt-1 text-button-text text-center rounded-md"
              >
                Log In
              </Link>
            ) : (
              <>
                <div className="flex items-center space-x-2 text-gray-800 no-underline rounded-md focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none px-4 py-2 cursor-pointer mr-10">
                  <span className="text- tracking-wide ">
                    {userData?.displayName}{" "}
                  </span>
                  <CgProfile
                    onClick={() =>
                      setDropDown((isDropDownModa) => !isDropDownModa)
                    }
                    size={"1.2rem"}
                  />
                </div>
                {isDropDownModal && (
                  <div className="w-52 h-26 bg-white rounded-md absolute top-16 ">
                    <ul className="divide-y w-full">
                      <li className="hover:bg-highlight">
                        <Link
                          to="/settings"
                          className="flex gap-3 p-3 items-center w-full "
                        >
                          <AiOutlineSetting size={"1rem"} />
                          <span>Settings</span>
                        </Link>
                      </li>
                      <li className=" w-full hover:bg-highlight">
                        <Link
                          to="/dashboard"
                          className="flex gap-3 p-3  w-full"
                        >
                          <GrScorecard size={"1rem"} />
                          <span>Dash Board</span>
                        </Link>
                      </li>
                      <li
                        onClick={() => signoutUser()}
                        className="flex gap-3 p-3 hover:bg-highlight items-center w-full cursor-pointer"
                      >
                        <AiOutlineLogout size={"1rem"} />
                        <button>Logout</button>
                      </li>
                      <li></li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* mobile nav */}
    </nav>
  );
}
