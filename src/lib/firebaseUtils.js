const admin = require("firebase-admin");

let accountData = {
  type: "service_account",
  project_id: "geologist-8e6f9",
  private_key_id: "3b4f4e832e7b5f0ca7ae97cbe5151fd0c13d3725",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnx7qe99H4gKLn\n8vIAFzijW/S46GdKxfuN0+X9ZvYnf6V8KpRIeXIKDAE3yhPs0QNZmc92fUyGmg51\nx51cLI1HDAmTCPhqrV2zI0gEOUGsZH/MzabSTj661tsn/Jmww7IXWNh0nWDWVkSH\nSoDl8nq6nbwW5ZDejIn63637yKkZ9IAIHjV1/gfmhrCxgIgfF2gh5didscwE2EUJ\nr5Ot0VVBKt/TfI5vRTY7sRB8/Ar1u/MJVbvUCUdxgb/1z+aCCQMe4d2p66wM+fP4\nHnu4riAym6PGXt8HnagjkzpUNxWa2cN866/HZeam+sr2pts7oxGPMc+1UmlyaQa2\nEG8nOqp9AgMBAAECggEABAEWMQWSCXxedKrrSQKgS5mCjbp7EOX2YKjEiCw9JqQ/\nt0tzSL471cXDgK13TDNaHKbLfbl9nJoQJsj1WvF81LBb5JEjtFl/887K7q1x3MU9\n+Sk5wbKq3PTB/Abu6oMvbvNtMslLMOXK0rA0sPqGMvehQmEQSuEmbXNS1CTpUIx6\nEIIYlS1Tmbqv9uy/IlY4a4npaJul5dSs+sDZ5D9KNO7M47AWwY/X+QD8UyrsO1ps\nCa+6by97SvwE5CHjqNTPlrwn21zD+09O/NeexoIDyJOCS9u/ls4fgZWq03vVgiKE\n7iRZaoiIMFDduW2N64sLyZRYeqrGZUwancCSACvMiQKBgQDcK9qUCD+uijYHlr5p\nVuYqzPB1rrLqCG/SbfrlYCRL/V0lPQkfVnMCvxoOQ92CvJ1aIsGCq4zz6ZcIIWuX\n4ZMAWNf/qx1U+9dcD+z2C22kidgp/K3BPtFNl2sjyVg5wvUPm+dfaT7y0b6ZTBDt\n35ZAWuQzBbK+lu+rOnTAjagaSQKBgQDDFU6EdHyJb5TK0HCvF3fi2uMTVtMHjVVD\nzcyrjToQe4nbi8xblunth8LuEQCntUe7VHndM1M7D80LMhDDcMjmdOwvyAysAwqF\nIVaOl+vVq2qR/fdIGK6bp6GBkJohMU5iCkZaDikIPCb5cxoj6poX9Eep3AlXnlNA\n6OSJ8FhulQKBgQCpytQVJ0tdIk9KiPEtMYvtZADo8KIfpAQAhzpfHEbBp5HmvuxD\nE5s8ef3xFFtGkIjU00rip8Pa8sC7z3I3Pgns0Zc6H09Ok61g3RNEKEoVAw0GTEv/\nZJ9rNCO3BHaajQQKVpQXW4XlIuXXOPcxSyWHWdD0nCddne8U4M7bFCOYqQKBgFTF\n6oPWltOmYFMt9vmvShKTqb+aqEOM4DOBt+IIkeXduU9lVZ2rW+Yza7rGOrGmLhCy\nqe48wntU53ZpAC3d0f+LaaNt3EvXWnf1v8ZhMEN+pOXiJdX3m9DaLG3AJ6oq4fPq\noR27L4t7kDgwE3juFp44MfgXPRwNGgKH8eAbSGJtAoGAK+NCW/lW4AE9CpmA0fMT\n4h4BlE0IoANdhYUz1iU1iUfuKmY/ILeD3MNJCY6wFTJ/Ssr4XChV9QWvl1kvpbbc\niOTbA1SdPpFMAde4Gsq1PP+fINOh6dWTWTO4BcXiY2x5WQz2y6d4NNg0tQ0//hfA\nU118e6bcrw2Rj1FH263HGYo=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-6z21r@geologist-8e6f9.iam.gserviceaccount.com",
  client_id: "114756450718320881611",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6z21r%40geologist-8e6f9.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

try {
  // Initialize Firebase SDK with your project credentials
  const serviceAccount = accountData;
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://duckitgames.firebaseio.com/",
  });
} catch (e) {}

const db = admin.firestore();

async function documentExists(path) {
  const documentRef = db.doc(path);
  const documentSnapshot = await documentRef.get();
  return documentSnapshot.exists;
}

// Function to write data to Firebase
async function writeField(value, path, fieldName) {
  const documentRef = db.doc(path);

  // Create an object with the specified field name and value
  const updateObject = { [fieldName]: value };

  documentRef
    .update(updateObject)
    .then(() => {
      // Success
    })
    .catch((err) => {
      console.error("Error writing to Firebase:", err);
    });
}

// Function to retrieve data from Firebase field
async function readField(path, fieldName, callback) {
  const documentRef = db.doc(path);

  try {
    const documentSnapshot = await documentRef.get();

    if (documentSnapshot.exists) {
      const fieldValue = documentSnapshot.get(fieldName);

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback(null, fieldValue);
      } else {
        return fieldValue;
      }
    } else {
      console.error("Document does not exist in Firebase");

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback("Document not found", null);
      } else {
        throw new Error("Document not found");
      }
    }
  } catch (err) {
    console.error("Error reading from Firebase:", err);

    // Check if a callback function is provided
    if (callback && typeof callback === "function") {
      callback(err, null);
    } else {
      throw err;
    }
  }
}

// Function to delete a specific field from a document in Firebase
async function deleteField(path, fieldName) {
  const documentRef = db.doc(path);

  try {
    // Update the document, removing the specified field
    await documentRef.update({
      [fieldName]: admin.firestore.FieldValue.delete(),
    });
  } catch (err) {
    console.error("Error deleting field from Firebase:", err);
    throw err; // Propagate the error for further handling
  }
}

// Function to create a document in Firebase
async function createDocument(data, path) {
  const documentRef = db.doc(path);
  const plainObject = Object.fromEntries(data);
  documentRef
    .set(plainObject)
    .then(() => {})
    .catch((err) => {
      console.error("Error creating document in Firebase:", err);
    });
}

// Function to create a collection in Firebase
async function createCollection(path) {
  db.collection(path);
}

async function readAllDocuments(path, callback) {
  const collectionRef = db.collection(path);
  collectionRef
    .get()
    .then((snapshot) => {
      const documents = [];
      snapshot.forEach((doc) => {
        const documentData = doc.data();
        documents.push(documentData);
      });
      callback(null, documents);
    })
    .catch((err) => {
      console.error("Error reading documents from Firebase:", err);
      callback(err, null);
    });
}

async function readAllDocumentsAsMap(path, callback) {
  const collectionRef = db.collection(path);
  try {
    const snapshot = await collectionRef.get();
    const documentsMap = new Map();

    snapshot.forEach((doc) => {
      const documentData = doc.data();
      documentsMap.set(doc.id, documentData);
    });

    // Check if a callback function is provided
    if (callback && typeof callback === "function") {
      callback(null, documentsMap);
    } else {
      return documentsMap;
    }
  } catch (err) {
    console.error("Error reading documents from Firebase:", err);

    // Check if a callback function is provided
    if (callback && typeof callback === "function") {
      callback(err, null);
    } else {
      throw err;
    }
  }
}

// Function to delete a document from Firebase
async function deleteDocument(path) {
  const documentRef = db.doc(path);
  try {
    await documentRef.delete();
  } catch (err) {
    console.error("Error deleting document from Firebase:", err);
    throw err;
  }
}

async function readAllFields(path, callback) {
  const documentRef = db.doc(path);

  try {
    const documentSnapshot = await documentRef.get();

    if (documentSnapshot.exists) {
      const documentData = documentSnapshot.data();
      const entries = Object.entries(documentData);

      // Convert the array of key-value pairs back to a Map
      const documentMap = new Map(entries);

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback(null, documentMap);
      } else {
        return documentMap;
      }
    } else {
      console.error("Document does not exist in Firebase");

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback("Document not found", null);
      } else {
        throw new Error("Document not found");
      }
    }
  } catch (err) {
    console.error("Error reading fields from Firebase:", err);

    // Check if a callback function is provided
    if (callback && typeof callback === "function") {
      callback(err, null);
    } else {
      throw err;
    }
  }
}

async function readDocumentAsMap(path, callback) {
  const documentRef = db.doc(path);

  try {
    const documentSnapshot = await documentRef.get();

    if (documentSnapshot.exists) {
      const documentData = documentSnapshot.data();
      const documentMap = new Map(Object.entries(documentData));

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback(null, documentMap);
      } else {
        return documentMap;
      }
    } else {
      console.error("Document does not exist in Firebase");

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback("Document not found", null);
      } else {
        throw new Error("Document not found");
      }
    }
  } catch (err) {
    console.error("Error reading document from Firebase:", err);

    // Check if a callback function is provided
    if (callback && typeof callback === "function") {
      callback(err, null);
    } else {
      throw err;
    }
  }
}

module.exports = {
  writeField,
  readField,
  deleteField,
  createDocument,
  createCollection,
  readAllDocuments,
  documentExists,
  readAllDocumentsAsMap,
  deleteDocument,
  readAllFields,
  readDocumentAsMap,
};

async function exportFirestoreDataToJson(filePath) {
  try {
    // Get all collections
    const collections = await db.listCollections();

    // Prepare data object to store all Firestore data
    const allData = {};

    // Loop through each collection
    for (const collection of collections) {
      const collectionName = collection.id;
      allData[collectionName] = {};

      // Get all documents in the collection
      const documents = await collection.listDocuments();

      // Loop through each document
      for (const document of documents) {
        const documentId = document.id;
        const documentData = await document.get();

        // Add document data to collection
        allData[collectionName][documentId] = documentData.data();
      }
    }

    // Write all data to JSON file
    const fs = require("fs");
    fs.writeFileSync(filePath, JSON.stringify(allData, null, 2));

    console.log("Firestore data exported to JSON successfully!");

    // Terminate Firebase app
    await admin.app().delete();
  } catch (error) {
    console.error("Error exporting Firestore data:", error);
  }
}

// exportFirestoreDataToJson("data.json");
