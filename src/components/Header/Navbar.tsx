import React from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";

interface NavLinkProps {
  name: string;
  href: string;
  sublinks?: { name: string; href: string }[];
}

function NavLink({ name, href, sublinks }: NavLinkProps) {
  return (
    <>
      <a
        className="font-semibold text-lg py-2 hover:bg-secondary hover:text-primary transition duration-300 p-3 rounded-md"
        href={href}
      >
        {name}
        {sublinks && (
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          </svg>
        )}
      </a>
      {sublinks && (
        <ul className="p-2 bg-base-100 drop-shadow-md">
          {sublinks.map((sublink, index) => (
            <li>
              <a href={sublink.href}>{sublink.name}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function Navbar() {
  const navLinks = [
    { name: "Rent", href: "#" },
    { name: "Buy", href: "#" },
    {
      name: "Sell",
      href: "#",
    },
    {
      name: "Manage Property",
      href: "#",
      sublinks: [
        { name: "Sublink 1", href: "#" },
        { name: "Sublink 2", href: "#" },
        { name: "Sublink 3", href: "#" },
      ],
    },
    {
      name: "Resources",
      href: "#",
      sublinks: [
        { name: "Sublink 1", href: "#" },
        { name: "Sublink 2", href: "#" },
        { name: "Sublink 3", href: "#" },
      ],
    },
  ];

  return (
    <nav className="navbar bg-base-100">
      {/* Header */}
      <div className="flex-none mr-8">
        <span className="btn btn-ghost normal-case text-2xl font-bold flex items-center gap-2">
          <BsFillHouseDoorFill className="text-primary" size={32} />
          <span>Estatery</span>
        </span>
      </div>

      {/* Menu */}
      <div className="flex-auto">
        <ul className="menu menu-horizontal space-x-4">
          {navLinks.map((link, index) => (
            <li key={`nav-link-${link.name}`}>
              <NavLink {...link} />
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-none space-x-4">
        <button className="btn btn-primary btn-lg btn-outline">Login</button>
        <button className="btn btn-primary btn-lg">Sign Up</button>
      </div>
    </nav>
  );
}
