"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import LogoIcon from "@/components/icons/LogoIcon";
import CreateBoard from "@/components/CreateBoard";
import BoardIcon from "@/components/icons/BoardIcon";
import { useKanbanStore } from "@/store/useKanbanStore";

export default function Sidebar({ className }) {
  const pathname = usePathname();
  const boards = useKanbanStore((state) => state.boards);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <aside
        className={`sticky top-0 hidden w-72 grid-rows-[auto_1fr] border-r border-[#444] bg-[#2b2c37] md:grid ${className}`}
      >
        <header className="space-y-2 px-4 py-2">
          <Link className="flex h-16 flex-row items-center" href="/boards">
            <LogoIcon />
          </Link>
          <CreateBoard />
        </header>

        {boards.length > 0 ? (
          <nav className="overflow-y-auto">
            {boards.map((board) => (
              <Link
                className={clsx(
                  "flex flex-row items-center justify-start space-x-4 rounded-r-full p-4 text-[#828fa3] hover:bg-white hover:text-[#635fc7]",
                  {
                    "bg-[#635fc7] text-white":
                      pathname === `/boards/${board.id}`,
                  },
                )}
                key={board.id}
                href={`/boards/${board.id}`}
              >
                <BoardIcon />
                <span className="text-md grow font-medium">{board.name}</span>
              </Link>
            ))}
          </nav>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p>🗂 No Boards Yet</p>
            <p>You haven’t created any boards.</p>
          </div>
        )}
      </aside>

      {isMobileMenuOpen ? (
        <div
          className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div
            className="flex h-screen w-[80%] flex-col border-r border-[#444] bg-[#2b2c37]"
            onClick={(event) => event.stopPropagation()}
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <header className="space-y-2 px-4 py-2">
              <Link className="flex h-16 flex-row items-center" href="/boards">
                <LogoIcon />
              </Link>
              <CreateBoard />
            </header>

            {boards.length > 0 ? (
              <nav className="overflow-y-auto">
                {boards.map((board) => (
                  <Link
                    className={clsx(
                      "flex flex-row items-center justify-start space-x-4 rounded-r-full p-4 text-[#828fa3] hover:bg-white hover:text-[#635fc7]",
                      {
                        "bg-[#635fc7] text-white":
                          pathname === `/boards/${board.id}`,
                      },
                    )}
                    key={board.id}
                    href={`/boards/${board.id}`}
                  >
                    <BoardIcon />
                    <span className="text-md grow font-medium">
                      {board.name}
                    </span>
                  </Link>
                ))}
              </nav>
            ) : (
              <div className="flex grow flex-col items-center justify-center">
                <p>🗂 No Boards Yet</p>
                <p>You haven’t created any boards.</p>
              </div>
            )}
          </motion.div>
        </div>
      ) : (
        <button
          className="fixed bottom-8 left-0 flex cursor-pointer flex-row items-center rounded-r-full bg-[#635fc7] px-4 py-2 md:hidden"
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <ChevronDoubleRightIcon className="size-6" />
        </button>
      )}
    </>
  );
}
