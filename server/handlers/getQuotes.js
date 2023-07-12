// require the request-promise module
const request = require("request-promise");

const getQuotes = async (req, res) => {
    try{
        const apiRequest = await request("https://zenquotes.io/api/random/")
        const parsedApi = await JSON.parse(apiRequest)

        parsedApi 
        ? res.status(200).json({status: 200, data: parsedApi })
        : res.status(404).json({status: 404, error: "No quote found" })
    } catch (error) {
        res.status(500).json({status: 500, error: error.message})
    }
};

module.exports = getQuotes;