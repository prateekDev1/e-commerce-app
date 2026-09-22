"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Category = {
  name: string;
  slug: string;
};
type Props = {
  categories: Category[];
};

export function CategorySidebar({ categories }: Props) {
  const params = useParams();
  const activeCategory = params.slug as string;

  return (
    <div className="w-31.25 flex-none">
      <h3 className="text-xs text-muted-foreground mb-2">Collections</h3>

      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/search/${category.slug}`}
              className={`text-sm hover:text-primary ${
                activeCategory === category.slug ? "underline" : ""
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export async function CategorySidebar({
//   activeCategory,
// }: {
//   activeCategory?: string;
// }) {
//   const categories = await prisma.category.findMany({
//     select: {
//       name: true,
//       slug: true,
//     },
//     orderBy: {
//       name: "asc",
//     },
//   });

//   await sleep(2000);

//   return (
//     <div className="w-31.25 flex-none">
//       <h3 className="text-xs text-muted-foreground mb-2">Collections</h3>

//       <ul>
//         {categories.map((category) => (
//           <li key={category.slug}>
//             <Link
//               href={`/search/${category.slug}`}
//               className={`text-sm hover:text-primary ${
//                 activeCategory === category.slug ? "underline" : ""
//               }`}
//             >
//               {category.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
