import { Menu } from "lucide-react";

import { Button } from "./ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import Link from "next/link";
import { categories } from "./navbar";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" />}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-4 p-4">
          <SheetClose
            nativeButton={false}
            render={<Link href="/" />}
          >
            Home
          </SheetClose>

          <SheetClose
            nativeButton={false}
            render={<Link href="/products" />}
          >
            Products
          </SheetClose>

          <div>
            <h3 className="mb-2 text-xs font-medium text-muted-foreground">
              Categories
            </h3>

            {categories.map((category) => (
              <SheetClose
                key={category.id}
                nativeButton={false}
                render={
                  <Link
                    href={category.href}
                    className="block py-2 text-sm font-medium"
                  />
                }
              >
                {category.name}
              </SheetClose>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}