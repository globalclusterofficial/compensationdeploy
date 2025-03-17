import { BASE_URL } from "./constants";

/**
 * Converts a standard date string into a formatted date string.
 * @param {string} strDate - The standard date string to convert.
 * @returns {string} The formatted date string in the format "Month Day, Year".
 */
export const convertStandardDate = (strDate) => {
  if (!strDate) return "";
  const date = new Date(strDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
/**
 * Truncates a given description if it exceeds 50 characters, returning a shortened version.
 * If the description is already 50 characters or less, it is returned as is.
 * @param {string} description - The description to be potentially truncated.
 * @returns {string} The truncated or original description.
 */
export function DecreaseDescription(description) {
  if (!description) return "";
  return description.length > 50
    ? `${description.slice(0, 40)}...`
    : description;
}

// Derive a key from the secret string
export function deriveKey(secret) {
  const salt = crypto.randomBytes(16); // Salt should be random and unique
  const key = crypto.pbkdf2Sync(secret, salt, 100000, 32, "sha256"); // Derive a 32-byte key
  return { key, salt };
}

// Encryption function
export function encrypt(text, secret) {
  const { key, salt } = deriveKey(secret);
  const iv = crypto.randomBytes(16); // Initialization vector
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return salt.toString("hex") + ":" + iv.toString("hex") + ":" + encrypted;
}

// Decryption function
export function decrypt(text, secret) {
  const textParts = text.split(":");
  const salt = Buffer.from(textParts.shift(), "hex");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = textParts.join(":");

  const key = crypto.pbkdf2Sync(secret, salt, 100000, 32, "sha256"); // Derive the key using the same salt
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export const imageUrl = (str) => {
  // const baseUrl = BASE_URL;

  // Regular expression to match URLs with IP and port
  const ipPortRegex = /^http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+(\/.*)$/;

  let urlPath;

  if (ipPortRegex.test(str)) {
    // Extract the path part from the URL, preserving the leading slash
    urlPath = str.match(ipPortRegex)[1];
  } else {
    urlPath = str;
  }

  const url = `${urlPath}`;
  return url;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function transformProductsToChartData(productsArray) {
  // Initialize an object to hold traffic sums for each month
  const trafficByMonth = {};

  // Initialize each month's traffic to 0
  months.forEach((month, index) => {
    trafficByMonth[month] = 0;
  });

  // Sum traffic for each product by month
  productsArray.forEach((product) => {
    const monthIndex = new Date(product.date_created).getMonth();
    const monthName = months[monthIndex];
    trafficByMonth[monthName] += product.traffic;
  });

  // Convert the trafficByMonth object to an array of { month, views } objects
  const chartData = months.map((month) => ({
    month,
    views: trafficByMonth[month],
  }));

  return chartData;
}
export const getDateStr = (str) => {
  const monthIndex = new Date(str).getMonth();
  const day = new Date(str).getDate();
  const year = new Date(str).getFullYear();
  const monthName = months[monthIndex];
  return `${monthName}-${day}-${year}`;
};
