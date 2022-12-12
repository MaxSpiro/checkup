import { Menu, Transition } from "@headlessui/react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export const Navbar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <header className="bg-violet-300">
      <nav>
        <ul className="flex items-center gap-6 py-2 px-6 text-xl text-black">
          <li className="mr-auto text-4xl hover:underline">
            <Link href="/">Checkup</Link>
          </li>
          <li className="hover:underline">
            <Link href="/about">About</Link>
          </li>
          {session?.user?.image ? (
            <Menu as="li" className="relative inline-block text-left">
              <div>
                <Menu.Button className="relative h-16 w-16 overflow-hidden rounded-full">
                  {" "}
                  <Image
                    src={session.user?.image}
                    alt="user profile"
                    fill={true}
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md ring-1">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`flex w-full items-center rounded-md p-2 ${
                            active ? "bg-violet-600 text-slate-100" : ""
                          }`}
                          onClick={() => signOut()}
                        >
                          Log out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </ul>
      </nav>
    </header>
  );
};
