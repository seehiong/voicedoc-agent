import { Firestore } from '@google-cloud/firestore';

// Lazy initialization to avoid errors during Next.js build
let firestore: Firestore | null = null;

function getFirestore(): Firestore {
    if (!firestore) {
        const projectId = process.env.VERTEX_PROJECT_ID;
        firestore = new Firestore({
            projectId: projectId,
            databaseId: 'voicedoc-fs',
        });
    }
    return firestore;
}

// Collection name for storing document chunks
export const CHUNKS_COLLECTION = 'document_chunks';
// Collection name for storing document metadata (deduplication)
export const DOCUMENTS_COLLECTION = 'documents';

export interface DocumentMetadata {
    hash: string;
    filename: string;
    persona: string;
    summary?: string;
    created_at?: Date;
}

export interface Chunk {
    id?: string;
    text: string;
    embedding: number[]; // Vector
    metadata: {
        filename: string;
        persona: string;
        pageNumber?: number;
    };
}

export async function saveChunks(chunks: Chunk[]) {
    const batch = getFirestore().batch();

    chunks.forEach(chunk => {
        const docRef = getFirestore().collection(CHUNKS_COLLECTION).doc();
        batch.set(docRef, {
            text: chunk.text,
            embedding: chunk.embedding, // Firestore supports vector types natively in some SDK versions, or arrays
            metadata: chunk.metadata,
            created_at: new Date()
        });
    });

    await batch.commit();
}

export async function getDocumentByHash(hash: string): Promise<DocumentMetadata | null> {
    const snapshot = await getFirestore().collection(DOCUMENTS_COLLECTION).where('hash', '==', hash).limit(1).get();
    if (snapshot.empty) return null;
    return snapshot.docs[0].data() as DocumentMetadata;
}

export async function saveDocumentMetadata(metadata: DocumentMetadata) {
    await getFirestore().collection(DOCUMENTS_COLLECTION).add({
        ...metadata,
        created_at: new Date()
    });
}

// Basic Cosine Similarity function
function cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function searchSimilarChunks(queryEmbedding: number[], limit: number = 3, filename?: string): Promise<Chunk[]> {
    try {
        console.log("Attempting vector search...");

        // 1. Vector Search intentionally removed to enforce filename filtering via the fallback logic below.
        // Firestore's findNearest doesn't easily support pre-filtering without composite indexes, which complicates setup.
        // For this use case (Chat with specfic doc), fetching filtered chunks and scoring in-memory is safer and accurate.


        // 2. Fallback: Client-Side Cosine Similarity (Fetch ALL chunks or Filtered chunks)
        // WARNING: expensive for large datasets, fine for hackathon (<100 documents)
        console.log("Falling back to client-side vector search...");

        let queryRef = getFirestore().collection(CHUNKS_COLLECTION);
        // Apply filename filter if provided - critical for preventing cross-contamination
        if (filename) {
            console.log(`[Firestore] 🔍 FILTERING chunks by filename: '${filename}'`);
            // @ts-ignore
            queryRef = queryRef.where('metadata.filename', '==', filename);
        } else {
            console.warn(`[Firestore] ⚠️ NO FILENAME provided. Searching GLOBAL chunks!`);
        }

        const snapshot = await queryRef.get();
        const allChunks: Chunk[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chunk));

        console.log(`[Firestore] 📊 Chunks retrieved from DB: ${allChunks.length}`);

        // Use a loop to inspect metadata of first few chunks to verify they match
        if (allChunks.length > 0) {
            console.log(`[Firestore] 🧐 First chunk metadata:`, allChunks[0].metadata);
        }

        console.log(`Scoring ${allChunks.length} chunks...`);

        const scoredChunks = allChunks.map(chunk => ({
            chunk,
            score: cosineSimilarity(queryEmbedding, chunk.embedding)
        }));

        scoredChunks.sort((a, b) => b.score - a.score);

        return scoredChunks.slice(0, limit).map(item => item.chunk);

    } catch (error) {
        console.error("Vector search failed completely:", error);
        return [];
    }
}
