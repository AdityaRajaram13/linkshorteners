import { db } from '../../../firebase';
import { getDoc, doc } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    // Check if shortId is present in req.query
    const { shortId } = req.query;
    if (!shortId) {
      return res.status(400).json({ error: 'Missing shortId parameter' });
    }

    console.log('Short ID:', shortId);

    // Construct the document reference
    const docRef = doc(db, 'links', shortId);
    console.log('Document ID:', docRef.id);

    // Fetch the document snapshot
    const docSnapshot = await getDoc(docRef);

    // Check if the document exists
    if (docSnapshot.exists()) {
      const linkData = docSnapshot.data();
      console.log('Redirecting to:', linkData.longUrl);
      res.redirect(301, linkData.longUrl);
    } else {
      console.log('Link not found for shortId:', shortId);
      res.status(404).json({ error: 'Link not found' });
    }
  } catch (error) {
    console.error('Error retrieving link:', error);
    res.status(500).json({ error: 'Failed to retrieve link' });
  }
}
