const axios = require("axios");
const CryptoJS = require("crypto-js");

const accessKey = "YOUR_ACCESS_KEY";
const secretKey = "YOUR_SECRET_KEY";
const partnerTag = "YOUR_AMAZON_ASSOCIATE_TAG";
const region = "us-east-1"; // Change based on marketplace (e.g., "in" for India)

async function fetchProduct(asin) {
    const host = `webservices.amazon.${region}`;
    const path = "/paapi5/getitems";

    const payload = {
        PartnerTag: partnerTag,
        PartnerType: "Associates",
        Marketplace: "www.amazon.com",
        ItemIds: [asin],
        Resources: ["ItemInfo.Title", "Offers.Listings.Price"]
    };

    const timestamp = new Date().toISOString();
    const stringToSign = `AWS4-HMAC-SHA256\n${timestamp}\n${region}\n${JSON.stringify(payload)}`;
    const signature = CryptoJS.HmacSHA256(stringToSign, secretKey).toString(CryptoJS.enc.Hex);

    try {
        const response = await axios.post(`https://${host}${path}`, payload, {
            headers: {
                "x-amz-access-key": accessKey,
                "x-amz-date": timestamp,
                "x-amz-signature": signature,
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error.response ? error.response.data : error.message);
        return null;
    }
}

// Export function
module.exports = fetchProduct;