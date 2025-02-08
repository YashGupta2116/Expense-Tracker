import Income from "../models/income.model.js";


export const getHomePage = async (req , res) => {
    try {
        const user = req.user ;
    
        const userInfo = await Income.findOne({userId: user._id});
    
        if(!userInfo) return res.status(400).json({ error: "User income info not found" });
    
        return res.status(200).json(userInfo);
    } catch (error) {
        console.error("Error in getHomePage:", error);
        return res.status(500).json({ message: error.message });
    }
};


