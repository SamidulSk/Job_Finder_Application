import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheck2, BsChevronExpand } from "react-icons/bs";

const options = ["Newest", "Oldest", "A-Z", "Z-A"];

const ListBox = ({ sort, setSort }) => {
  return (
    <div className="w-[9rem] md:w-[11rem] text-sm">
      <Listbox value={sort} onChange={setSort}>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full cursor-pointer rounded-xl bg-gradient-to-br from-[#1e293b] to-[#111827] 
            text-white py-2 pl-4 pr-10 text-left border border-gray-600 hover:border-blue-500 
            focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md transition-all duration-300"
          >
            <span className="block truncate font-medium">{sort}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <BsChevronExpand className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options
              className="absolute z-30 mt-2 w-full max-h-60 overflow-auto rounded-xl bg-[#1f2937] 
              text-white shadow-2xl ring-1 ring-black ring-opacity-10 focus:outline-none"
            >
              {options.map((op, index) => (
                <Listbox.Option
                  key={index}
                  value={op}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 rounded-md mx-1 my-0.5 ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-700/50"
                    } transition duration-150`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold text-blue-300" : "font-normal"
                        }`}
                      >
                        {op}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-2 flex items-center text-blue-400">
                          <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default ListBox;
