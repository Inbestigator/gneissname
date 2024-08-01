const admin = require("firebase-admin")

let accountData = {
  type: "service_account",
  project_id: "geologist-8e6f9",
  private_key_id: "3b4f4e832e7b5f0ca7ae97cbe5151fd0c13d3725",
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email:
    "firebase-adminsdk-6z21r@geologist-8e6f9.iam.gserviceaccount.com",
  client_id: "114756450718320881611",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6z21r%40geologist-8e6f9.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
}

try {
  // Initialize Firebase SDK with your project credentials
  const serviceAccount = accountData
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://geologist-8e6f9.firebaseio.com/",
  })
} catch (e) {}

const db = admin.firestore()

async function documentExists(path) {
  const documentRef = db.doc(path)
  const documentSnapshot = await documentRef.get()
  return documentSnapshot.exists
}

// Function to write data to Firebase
async function writeField(value, path, fieldName) {
  const documentRef = db.doc(path)

  // Create an object with the specified field name and value
  const updateObject = { [fieldName]: value }

  documentRef
    .update(updateObject)
    .then(() => {
      // Success
    })
    .catch((err) => {
      console.error("Error writing to Firebase:", err)
    })
}

// Function to retrieve data from Firebase field
async function readField(path, fieldName, callback) {
  const documentRef = db.doc(path)

  try {
    const documentSnapshot = await documentRef.get()

    if (documentSnapshot.exists) {
      const fieldValue = documentSnapshot.get(fieldName)

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback(null, fieldValue)
      } else {
        return fieldValue
      }
    } else {
      console.error("Document does not exist in Firebase")

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback("Document not found", null)
      } else {
        throw new Error("Document not found")
      }
    }
  } catch (err) {
    console.error("Error reading from Firebase:", err)

    // Check if a callback function is provided
    if (callback && typeof callback === "function") {
      callback(err, null)
    } else {
      throw err
    }
  }
}

// Function to delete a specific field from a document in Firebase
async function deleteField(path, fieldName) {
  const documentRef = db.doc(path)

  try {
    // Update the document, removing the specified field
    await documentRef.update({
      [fieldName]: admin.firestore.FieldValue.delete(),
    })
  } catch (err) {
    console.error("Error deleting field from Firebase:", err)
    throw err // Propagate the error for further handling
  }
}

// Function to create a document in Firebase
async function createDocument(data, path) {
  const documentRef = db.doc(path)
  const plainObject = Object.fromEntries(data)
  documentRef
    .set(plainObject)
    .then(() => {})
    .catch((err) => {
      console.error("Error creating document in Firebase:", err)
    })
}

// Function to create a collection in Firebase
async function createCollection(path) {
  db.collection(path)
}

async function readAllDocuments(path, callback) {
  const collectionRef = db.collection(path)
  collectionRef
    .get()
    .then((snapshot) => {
      const documents = []
      snapshot.forEach((doc) => {
        const documentData = doc.data()
        documents.push(documentData)
      })
      callback(null, documents)
    })
    .catch((err) => {
      console.error("Error reading documents from Firebase:", err)
      callback(err, null)
    })
}

async function readAllDocumentsAsMap(path, callback) {
  const collectionRef = db.collection(path)
  try {
    const snapshot = await collectionRef.get()
    const documentsMap = new Map()

    snapshot.forEach((doc) => {
      const documentData = doc.data()
      documentsMap.set(doc.id, documentData)
    })

    // Check if a callback function is provided
    if (callback && typeof callback === "function") {
      callback(null, documentsMap)
    } else {
      return documentsMap
    }
  } catch (err) {
    console.error("Error reading documents from Firebase:", err)

    // Check if a callback function is provided
    if (callback && typeof callback === "function") {
      callback(err, null)
    } else {
      throw err
    }
  }
}

// Function to delete a document from Firebase
async function deleteDocument(path) {
  const documentRef = db.doc(path)
  try {
    await documentRef.delete()
  } catch (err) {
    console.error("Error deleting document from Firebase:", err)
    throw err
  }
}

async function readAllFields(path, callback) {
  const documentRef = db.doc(path)

  try {
    const documentSnapshot = await documentRef.get()

    if (documentSnapshot.exists) {
      const documentData = documentSnapshot.data()
      const entries = Object.entries(documentData)

      // Convert the array of key-value pairs back to a Map
      const documentMap = new Map(entries)

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback(null, documentMap)
      } else {
        return documentMap
      }
    } else {
      console.error("Document does not exist in Firebase")

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback("Document not found", null)
      } else {
        throw new Error("Document not found")
      }
    }
  } catch (err) {
    console.error("Error reading fields from Firebase:", err)

    // Check if a callback function is provided
    if (callback && typeof callback === "function") {
      callback(err, null)
    } else {
      throw err
    }
  }
}

async function readDocumentAsMap(path, callback) {
  const documentRef = db.doc(path)

  try {
    const documentSnapshot = await documentRef.get()

    if (documentSnapshot.exists) {
      const documentData = documentSnapshot.data()
      const documentMap = new Map(Object.entries(documentData))

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback(null, documentMap)
      } else {
        return documentMap
      }
    } else {
      console.error("Document does not exist in Firebase")

      // Check if a callback function is provided
      if (callback && typeof callback === "function") {
        callback("Document not found", null)
      } else {
        throw new Error("Document not found")
      }
    }
  } catch (err) {
    console.error("Error reading document from Firebase:", err)

    if (callback && typeof callback === "function") {
      callback(err, null)
    } else {
      throw err
    }
  }
}

async function getCredit(userId) {
  try {
    if (!(await documentExists(`users/${userId}`))) {
      await createDocument(new Map([["credit", 0]]), `users/${userId}`)
    }
    return await readField(`users/${userId}`, "credit")
  } catch (e) {}
}

const userCaps = new Map()
let cap = 256

setTimeout(() => {
  userCaps.clear()
  cap = Math.floor(Math.random() * (300 - 200 + 1)) + 200
}, 53 * 60 * 1000)

async function modCredit(userId, modifier) {
  try {
    if (!userCaps.has(userId)) userCaps.set(userId, 0)
    if (userCaps.get(userId) > cap) modifier /= 10
    userCaps.set(userId, userCaps.get(userId) + modifier)
    let credit = await getCredit(userId)
    credit += modifier
    credit = Math.round(credit)
    if (typeof credit !== "number" || isNaN(credit)) {
      credit = await getCredit(userId)
      if (typeof credit !== "number" || isNaN(credit)) {
        credit = 0
      }
    }
    await writeField(credit, `users/${userId}`, "credit")
    return credit
  } catch (e) {}
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
  getCredit,
  modCredit,
}

async function exportFirestoreDataToJson(filePath) {
  try {
    // Get all collections
    const collections = await db.listCollections()

    // Prepare data object to store all Firestore data
    const allData = {}

    // Loop through each collection
    for (const collection of collections) {
      const collectionName = collection.id
      allData[collectionName] = {}

      // Get all documents in the collection
      const documents = await collection.listDocuments()

      // Loop through each document
      for (const document of documents) {
        const documentId = document.id
        const documentData = await document.get()

        // Add document data to collection
        allData[collectionName][documentId] = documentData.data()
      }
    }

    // Write all data to JSON file
    const fs = require("fs")
    fs.writeFileSync(filePath, JSON.stringify(allData, null, 2))

    console.log("Firestore data exported to JSON successfully!")

    // Terminate Firebase app
    await admin.app().delete()
  } catch (error) {
    console.error("Error exporting Firestore data:", error)
  }
}

// exportFirestoreDataToJson("data.json");
