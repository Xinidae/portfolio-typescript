import{ Client, Account, Databases, Storage, Avatars } from 'appwrite';


export const appwriteConfig = {
    projectId: '65414020ac9d80a82b97',
    databaseId: '65489cef1c9eb1aea45d',
    storageId: '65489cda46d5606b5990',
    userCollectionId:'654b3d5e46979f919776',
    postCollectionId:'654acef4dbfd787e8c68',
    savesCollectionId:'654acef8a78872f27c02',
    url: 'https://cloud.appwrite.io/v1',

}

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
