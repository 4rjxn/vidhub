
import { MongoClient, ServerApiVersion, } from 'mongodb';
import { loadEnvFile } from 'process';


try {
    loadEnvFile();
} catch (err) {
    console.log((".env err"));
}

const uri = process.env.MONGO_URL!;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const fetchVideoList = async (params: { page?: number, limit?: number } = {}) => {
    try {
        const skip = ((params.page || 1) - 1) * (params.limit || 10);
        await client.connect();
        const db = client.db('client');
        const videos = db.collection('videos');
        return await videos.find({}).project({ title: 1 }).sort({ _id: 1 }).skip(skip).limit(params.limit || 10).toArray();
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
};

const addVideoToCollection = async (doc: any) => {
    try {
        await client.connect()
        const db = client.db('client');
        const videos = db.collection('videos');
        await videos.insertOne(doc);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

};

export { addVideoToCollection, fetchVideoList };

