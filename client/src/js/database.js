import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });

  request.onsuccess = () => {
    console.log('Sucess');
  };

  request.onerror = (event) => {
    console.error('Error', event.target.error);
  };

  await tx.complete;
} catch (error) {
  console.error('Error putting data in the database:', error);
}
};

export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  const request = await store.get(1);

  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();
