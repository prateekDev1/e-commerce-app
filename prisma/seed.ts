import "dotenv/config";
import { Product, User } from "@/app/generated/prisma/client";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";

async function main() {
    // Clear dependent rows before products; roll back all cleanup if a delete fails.
    await prisma.$transaction([
        prisma.cartItem.deleteMany(),
        prisma.orderItem.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
        prisma.user.deleteMany(),
    ]);
    const electronics = await prisma.category.create({
        data: {
            name: 'Electronics',
            slug: 'electronics',
        },
    });
    const clothing = await prisma.category.create({
        data: {
            name: 'Clothing',
            slug: 'clothing',
        },
    });
    const home = await prisma.category.create({
        data: {
            name: 'Home',
            slug: 'home',
        },
    });
    const products: Product[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      description:
        "Premium noise-cancelling wireless headphones with long battery life.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      categoryId: electronics.id,
      slug: "wireless-headphones",
      inventory: 30
    },
    {
      id: "2",
      name: "Smart Watch",
      description:
        "Fitness tracker with heart rate monitoring and sleep analysis.",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics.id,
      slug: "smart-watch",
      inventory: 20
    },
    {
      id: "3",
      name: "Running Shoes",
      description: "Lightweight running shoes with responsive cushioning.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      categoryId: clothing.id,
      slug: "running-shoes",
      inventory: 3
    },
    {
      id: "4",
      name: "Ceramic Mug",
      description: "Handcrafted ceramic mug with minimalist design.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
      categoryId: home.id,
      slug: "ceramic-mug",
      inventory: 17
    },
    {
      id: "5",
      name: "Leather Backpack",
      description: "Durable leather backpack with multiple compartments.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      categoryId: clothing.id,
      slug: "leather-backpack",
      inventory: 0
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  const users: User[] = [
    {
      id: "1",
      email: "admin@example.com",
      password: "password123",
      name: "Admin User",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "2",
      email: "user@example.com",
      password: "password123",
      name: "Regular User",
      role: "User",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  for(const user of users) {
    const hashedPassword = await hashPassword(user.password);
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword
      }
    });
  }
  
  console.log("Users created");

}

main()
    .then(async () => {
        console.log(`Success!`);
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
