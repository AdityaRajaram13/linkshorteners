import Cors from 'cors';
import { runMiddleware } from '../../utils/middleware';
import { db } from '../../../firebase';
import { collection, addDoc,setDoc,doc } from 'firebase/firestore';
import { nanoid } from 'nanoid';

const cors = Cors({
  methods: ['POST'],
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method === 'POST') {
    try {
      const shortId = nanoid(8);
      const longUrl = req.body.longUrl; // Assuming you are sending longUrl in the request body
      const shortUrl = `http://localhost:3000/api/${shortId}`;

      const linksCollection = collection(db, 'links');
      await addDoc(linksCollection, { shortId, longUrl });
      const docRef = doc(linksCollection, shortId);
      await setDoc(docRef, { shortId, longUrl });


     await res.status(201).json({ shortUrl });
    } catch (error) {
      console.error('Error creating short link:', error);
      res.status(500).json({ error: 'Failed to create short link', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
