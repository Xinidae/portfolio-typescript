import { ID, Query } from 'appwrite';

import { INewUser, IUpdateUser, IUpdatePost, INewPost } from "@/types";
import { account, appwriteConfig, databases, storage, avatars } from "./config";


// Sign up a new user
export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imgUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }

}

// Save user to database
export async function saveUserToDB(user: {
    accountId: string,
    name: string,
    email: string,
    username: string,
    imgUrl: URL,
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        );

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Sign in a user
export async function signInAccount(user: { email: string, password: string}) {
    try {
        const session = await account.createEmailSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Get user account
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// get user from database
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                `accountId=${currentAccount.$ID}`,
            ]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// sign out
export async function signOutAccount() {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        console.log(error);
        return error;
    }
}


// create post
export async function createPost(post: INewPost) {
    try {
        // upload file to storage
        const uploadedFile = await uploadFile(post.file[0]);

        if (!uploadedFile) throw Error;

        // get file url
        const fileUrl = getFilePreview(uploadedFile.$ID);
        if (!fileUrl) {
            await deleteFile(uploadedFile.$ID);
            throw Error;
        }

        // converting tags into array
        const tags = post.tags?.replace(/ /g, '').split(',') || [];

        // create post
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$ID,
                location: post.location,
                tags: tags,
            }
        );

        if (!newPost) {
            await deleteFile(uploadedFile.$ID);
            throw Error;
        }

        return newPost;
    } catch (error) {
        console.log(error);
        return error;
    }
    
}

// uploading file
export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        );
        
        return uploadedFile;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// get file url
export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "top",
            100
        );

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// deleting the file
export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);
        return { status: "ok"};
    } catch (error) {
        console.log(error);
        return error;
    }
}

// get posts
export async function searchPosts(searchTerm: string) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId, 
            appwriteConfig.postCollectionId,
            [Query.search("caption", searchTerm)]
        );

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// inifinte scroll
export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
    const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(10)];

    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()));
    }

    try{
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries
            );
            
        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// get post by id
export async function getPostById(postId?: string) {
    if (!postId) throw Error;

    try{
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        );

        if (!post) throw Error;

        return post;
        } catch (error) {
            console.log(error);
            return error;
        }
}

// update post
export async function updatePost(post: IUpdatePost) {
    const hasToUpdateFile = post.file.length > 0;

    try {
        let image = {
            imageUrl: post.imageUrl,
            imageId: post.imageId,
        };

        if (hasToUpdateFile) {
            // upload new file to appwrite
            const uploadedFile = await uploadFile(post.file[0]);
            if (!uploadedFile) throw Error;

            // get file url
            const fileUrl = getFilePreview(uploadedFile.$id);
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = {
                ...image,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id
            };

        }

        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        // update post 
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
                location: post.location,
                tags: tags,
            }
        );

        // failed to update 
        if (!updatedPost) {
            // delete new file that has been recently uploaded
            if (hasToUpdateFile) {
                await deleteFile(image.imageId);
            }

            // if no new file uploaded, just throw error
            throw Error;
        }

        // safely deletes old file after updating post
        if (hasToUpdateFile) {
            await deleteFile(post.imageId);
        }

        return updatedPost;
    } catch (error) {
        console.log(error);
        return error;
    }
} 

// delete post
export async function deletePost(postId?: string, imageId?: string) {
    if (!postId || !imageId) return;

    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        );

        if (!statusCode) throw Error;

        await deleteFile(imageId);

        return { status: "ok" };
    } catch (error) {
        console.log(error);
        return error;
    }
}

// like and unlike post
export async function likePost(postId: string, likesArray: string[]) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray,
            }
        );

        if (!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// save post
export async function savePost(userId: string, postId: string) {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savedPostCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId,
            }
        );
        if (!updatedPost) throw Error;

        return updatedPost;
    } catch (error) {
        console.log(error);
        return error;
    }
}


// get saved posts
export async function deleteSavedPost(savedRecordId: string) {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savedPostCollectionId,
            savedRecordId
        );

        if (!statusCode) throw Error;

        return { status: "ok" };
    } catch (error) {
        console.log(error);
        return error;
    }
}

// get user post
export async function getUserPosts(userId?: string) {
    if (!userId) return;

    try {
        const post = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.equal("creator", userId), Query.orderDesc("$updatedAt")]
        );

        if (!post) throw Error;

        return post;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// get popular posts
export async function getRecentPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc("$updatedAt"), Query.limit(10)]
        );

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// get users 
export async function getUser(limit?: number) {
    const queries: any[] = [Query.orderDesc("$createdAt")];

    if (limit) {
        queries.push(Query.limit(limit));
    }

    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            queries
        );

        if (!users) throw Error;

        return users;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// update user
export async function updateUser(user: IUpdateUser) {
    const hasToUpdateFile = user.file.length > 0;
    try {
        let image = {
            imageUrl: user.imageUrl,
            imageId: user.imageId,
        };

        if (hasToUpdateFile) {
            // upload new file to appwrite
            const uploadedFile = await uploadFile(user.file[0]);
            if (!uploadedFile) throw Error;

            // get file url
            const fileUrl = getFilePreview(uploadedFile.$id);
            if (!fileUrl) {
                await deleteFile(uploadedFile.$id);
                throw Error;
            }

            image = {
                ...image,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id
            };
        }

        // update user
        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user.userId,
            {
                name: user.name,
                bio: user.bio,
                imageUrl: image.imageUrl,
                imageId: image.imageId,
            }
        );

        // failed to update
        if (!updatedUser) {
            // delete new file that has been recently uploaded
            if (hasToUpdateFile) {
                await deleteFile(image.imageId);
            }
            // if no new file uploaded, just throw error
            throw Error;
        }

        // safely deletes old file after updating post
        if (user.imageId && hasToUpdateFile) {
            await deleteFile(user.imageId);
        }

        return updatedUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}
