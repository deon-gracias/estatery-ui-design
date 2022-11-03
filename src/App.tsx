import React, { useState } from "react";
import { MdBed } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { TbBath } from "react-icons/tb";
import { BsXDiamond } from "react-icons/bs";
import { FaChevronCircleDown } from "react-icons/fa";
import Header from "./components/Header";
import data from "./data/real-estate.json";

function getUnique(data: any[], attr: string) {
  return data.map((e) => e[attr]).filter((v, i, a) => a.indexOf(v) === i);
}

function App() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [when, setWhen] = useState("All");
  const [price, setPrice] = useState<string | number[]>("All");
  const [type, setType] = useState("All");

  const locations = ["All", ...getUnique(data, "location")];
  const whens = ["All", ...getUnique(data, "when")];
  const prices = ["All", [500, 2499], [2500, 3499], [3500, 4999]];
  const types = getUnique(data, "type");

  return (
    <>
      <Header />
      <main>
        <div className="mt-20 mx-auto p-8 max-w-7xl w-full grid space-y-11">
          <div className="flex items-center justify-between">
            <h1 className="w-full text-5xl font-semibold">
              Search properties to rent
            </h1>

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered input-lg w-full max-w-xs rounded-lg bg-white font-semibold"
            />
          </div>

          <div className="bg-white grid grid-cols-5 justify-between py-7 rounded-lg divide-x divide-slate-200">
            <Filter
              subtitle="Location"
              title={location}
              choices={locations.map((e) => ({
                name: e,
                callback: () => setLocation(e),
              }))}
            />
            <Filter
              subtitle="When"
              title={when}
              choices={whens.map((e) => ({
                name: e,
                callback: () => setWhen(e),
              }))}
            />
            <Filter
              subtitle="Price"
              title={
                typeof price === "string"
                  ? price
                  : `$${price[0]} - $${price[1]}`
              }
              choices={prices.map((e) => ({
                name: typeof e === "string" ? e : `$${e[0]} - $${e[1]}`,
                callback: () => setPrice(e),
              }))}
            />
            <Filter
              subtitle="Property Type"
              title={type}
              choices={types.map((e) => ({
                name: e,
                callback: () => setType(e),
              }))}
            />
            <div className="grid items-center px-6">
              <button className="btn btn-primary btn-lg">Search</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-9">
            {data
              .sort((a, b) => {
                if (!a.popular && !b.popular) return 0;
                return a.popular ? 0 : 1;
              })
              .filter((estate) => {
                return (
                  (estate.name.includes(search) ||
                    estate.address.includes(search)) &&
                  (estate.location === location || location === "All") &&
                  (estate.when === when || when === "All") &&
                  ((estate.rent >= price[0] && estate.rent <= price[1]) ||
                    price === "All") &&
                  (estate.type === type || type === "All") &&
                  1
                );
              })
              .map((estate, index) => (
                <div
                  key={`estate-${estate.name}-${index}`}
                  className="card w-full shadow-sm bg-white"
                >
                  <figure>
                    <img src={estate.image} alt={estate.name} />
                  </figure>

                  <div className="card-body relative px-6 divide-y divide-slate-200">
                    <div>
                      {estate.popular && (
                        <span className="bg-primary text-white max-w-fit py-2 px-4 text-sm uppercase font-semibold absolute left-0 top-[-1rem] rounded-r-lg">
                          * Popular
                        </span>
                      )}
                      <div className="flex justify-between">
                        <div className="space-y-4">
                          <div>
                            <span className="text-primary text-3xl font-bold">
                              ${estate.rent.toLocaleString()}
                            </span>
                            <span className="text-slate-400 font-semibold">
                              /month
                            </span>
                          </div>
                          <h2 className="card-title text-3xl font-bold">
                            {estate.name}
                          </h2>
                        </div>
                        <button className="btn btn-circle btn-ghost btn-outline border-gray-300 text-primary">
                          <FiHeart size={23} />
                        </button>
                      </div>
                      <p className="text-lg text-slate-400 font-semibold mt-4">
                        {estate.address}
                      </p>
                    </div>

                    <div className="flex-end">
                      <div className="flex justify-between text-gray-500 pt-4">
                        <span className="flex items-center gap-1">
                          <MdBed />
                          <span>{estate.beds} beds</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <TbBath />
                          <span>{estate.bathrooms} Bathrooms</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <BsXDiamond />
                          <span>
                            {estate.area[0]}x{estate.area[1]} m<sup>2</sup>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}

function Filter({
  subtitle,
  title,
  choices,
}: {
  subtitle: string;
  title: string;
  choices: { name: string; callback: () => void }[];
}) {
  return (
    <div className="flex flex-col space-y-1 px-6">
      <h5 className="w-full text-gray-400 text-lg font-semibold px-2">
        {subtitle}
      </h5>

      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn btn-ghost h-fit font-semibold text-xl text-left px-2 w-full flex justify-between"
        >
          <span>{title}</span>
          <FaChevronCircleDown className="text-primary" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {choices.map(
            (choice, index) =>
              choice.name !== title && (
                <li>
                  <button onClick={() => choice.callback()}>
                    {choice.name}
                  </button>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
