const mongoose = require("mongoose")

const ConnectDataBase =  async () => {
    try {
    const connet = await  mongoose.connect(process.env.DATABASE_URL)
    console.log(`the connection is build with database`)
    } catch (error) {
        console.log(error)
    }
}
module.exports = ConnectDataBase