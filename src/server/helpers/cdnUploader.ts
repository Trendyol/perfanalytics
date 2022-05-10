import cdn from "@trendyol-js/cdn";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import AWS from "aws-sdk";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { BlobServiceClient } from "@azure/storage-blob";

const uploadCdn = async (sourcePath: string, file: any, lhKey: string) => {
  const environment = process.env.CDN_ENV;
  const team = process.env.CDN_TEAM;
  const secret = process.env.CDN_SECRET;

  await cdn.authorize(secret);

  fs.writeFileSync(sourcePath, file);

  const options = {
    environment,
    team,
    secret,
  };
  const item = await cdn.item({ sourcePath, ...options });
  const result = await cdn.upload(item);

  fs.unlinkSync(sourcePath);
  return `https://cdn.dsmcdn.com/${team}/${environment}/${lhKey}.html`;
};

const uploadIpfs = async (sourcePath: string, file: any, lhKey: string) => {
  const pinataApiKey = process.env.PINATA_API_KEY;
  const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

  fs.writeFileSync(sourcePath, file);

  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const data = new FormData() as any;
  data.append("file", fs.createReadStream(sourcePath));

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
    wrapWithDirectory: true,
  });
  data.append("pinataOptions", pinataOptions);

  const result = await axios.post(url, data, {
    maxBodyLength: "Infinity", // this is needed to prevent axios from erroring out with large files
    headers: {
      // eslint-disable-next-line no-underscore-dangle
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  } as any);

  fs.unlinkSync(sourcePath);
  return `https://gateway.pinata.cloud/ipfs/${result.data.IpfsHash}/${lhKey}.html`;
};

const uploadAwsS3Bucket = async (sourcePath: string, file: any, lhKey: string) => {
  const bucketName = process.env.AWS_BUCKET_NAME;

  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  await fs.promises.writeFile(sourcePath, file);
  const data = await fs.promises.readFile(sourcePath);

  const params = {
    Bucket: bucketName,
    Key: `${lhKey}.html`,
    Body: data,
    ContentType: "image/jpeg",
  };
  const uploadedData = await s3.upload(params).promise();

  await fs.promises.unlink(sourcePath);
  return uploadedData.Location;
};

const uploadFirebase = async (sourcePath: string, file: any, lhKey: string) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: "1079300550797",
    appId: "1:1079300550797:web:ca548491d6d93f4d8832c4",
    measurementId: "G-T07557E7SW",
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const storageRef = ref(storage, `${lhKey}.html`);
  const snapshot = await uploadString(storageRef, file, "raw", { contentType: "text/html" });
  const downloadUrl = await getDownloadURL(snapshot.ref);

  return downloadUrl;
};

const uploadAzure = async (sourcePath: string, file: any, lhKey: string) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME);
  const blockBlobClient = containerClient.getBlockBlobClient(`${lhKey}.html`);

  await blockBlobClient.upload(file, file.length, {
    blobHTTPHeaders: { blobContentType: "text/html" },
  });

  return blockBlobClient.url;
};

const uploadConfig = process.env.UPLOAD_CONFIG;

// eslint-disable-next-line import/no-mutable-exports
let uploadFunction;

switch (uploadConfig) {
  case "ipfs":
    uploadFunction = uploadIpfs;
    break;
  case "cdn":
    uploadFunction = uploadCdn;
    break;
  case "aws":
    uploadFunction = uploadAwsS3Bucket;
    break;
  case "firebase":
    uploadFunction = uploadFirebase;
    break;
  case "azure":
    uploadFunction = uploadAzure;
    break;
  default:
    uploadFunction = uploadCdn;
}

export default uploadFunction;
