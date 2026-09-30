"use server";

import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

export interface GetProductsParams {
    query?: string;
    slug?: string;
    sort?: string;
    page?: number;
    pageSize?: number
}
export async function getProducts({query,slug,sort,page=1,pageSize=3}: GetProductsParams) {

    const where: Prisma.ProductWhereInput = {};

    if(query) {
        where.OR = [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
        ];
    }

    if(slug) {
        where.category = {
            slug,
        };
    }

    let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;
    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };

    const skip = pageSize ? (page-1)*pageSize : undefined;
    const take = pageSize;

    return await prisma.product.findMany({
        where,
        orderBy,
        skip,
        take,
    });

}

export async function getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({
        where: {
            slug,
        },
        include: {
            category: true,
        }
    });
    if(!product) {
        return null;
    }

    return product;
}

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export type CartWithProducts = Prisma.CartGetPayload<{
    include: {items : {include: {product: true}}};
}>;

export type ShoppingCart = CartWithProducts & {
    size: number;
    subtotal: number;
}

export async function getCart() : Promise<ShoppingCart | null> {
    const cartId = (await cookies()).get("cartId")?.value;
    const cart = cartId ? await prisma.cart.findUnique({
        where: {id: cartId},
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    })
    : null;
    if(!cart) {
        return null;
    }
    return {
        ...cart,
        size: cart.items.length,
        subtotal: cart.items.reduce(
            (total,item) => total + item.product.price * item.quantity,
            0
        ),
    };
}