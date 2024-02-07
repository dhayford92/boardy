import { mutation } from "./_generated/server"
import { v } from "convex/values"


const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
];


export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized")
        }

        const randomimage = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomimage
        });

        return board;
    }
});



export const remove = mutation({
    args: {
        id: v.id("boards"),
    },
    
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized")
        }
        
        const userId = identity.subject;

        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_board", (q)=> q.eq("userId", userId)
            .eq("boardId", args.id)
        ).unique();

        if(existingFavorite){
            await ctx.db.delete(existingFavorite._id);
        }

        await ctx.db.delete(args.id);

        return true;
    }
});


export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string(),
    },
    
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const title = args.title.trim();

        if(!identity){
            throw new Error("Unauthorized")
        }

        if(!title) throw new Error("Title is required")

        if(title.length > 60){
            throw new Error("Title must be more than 60 characters long")
        }

        await ctx.db.patch(args.id, {
            title: title
        });

        return true;
    }
}); 


export const favorite = mutation({
    args: {id: v.id('boards'), orgId: v.string()},

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) throw new Error("Unauthorized");

        const board = await ctx.db.get(args.id);
        if(!board){
            throw new Error("Board not found")
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_board", (q) => q.eq("userId", userId)
            .eq("boardId", board._id)
        ).unique();

        if(existingFavorite){
            throw new Error("Board already favorited")
        }

        await ctx.db.insert("userFavorites", {
            userId,
            boardId: board._id,
            orgId: args.orgId
        });

        return board;
    }
})


export const unfavorite = mutation({
    args: {id: v.id('boards')},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) throw new Error("Unauthorized");

        const board = await ctx.db.get(args.id);
        if(!board){
            throw new Error("Board not found")
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_board", (q) => q.eq("userId", userId)
            .eq("boardId", board._id)
        ).unique();

        if(!existingFavorite){
            throw new Error("Fovirated board not found")
        }

        await ctx.db.delete(existingFavorite._id);

        return board;
    }
})