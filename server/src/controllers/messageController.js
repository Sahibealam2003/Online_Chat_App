const Message = require("../models/messageSchema")
const User = require("../models/userSchema")
const cloudinary = require("../utils/cloudinary");
const { getReciverSocketId, io } = require("../utils/socket");
exports.getAllUser = async(req,res)=>{
    try {
        const loggedInUser = req.user._id
        const filterUser = await User.find({_id : {$ne:loggedInUser}}).select('-password')
        if(filterUser.length == 0){
            throw new Error("No friend Yet")
        }
        res.status(200).json({users : filterUser})
    } catch (error) {
        res.status(400).json({error : error.message})
        
    }
}


exports.getAllMessage = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    const allMessage = await Message.find({
      $or: [
        { senderId, reciverId },
        { senderId: reciverId, reciverId: senderId },
      ],
    });

    res.status(200).json({ data: allMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.sendMessage= async(req,res)=>{
    try {
        const {id :reciverId}  = req.params;
        const senderId = req.user._id

        const {text,image} = req.body;

        let imageUrl ;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            reciverId,
            text,
            image: imageUrl
        });

        await newMessage.save()
        const reciverSocketId = getReciverSocketId(reciverId)
        if(reciverSocketId){
            io.to(reciverSocketId).emit("newMessage" , newMessage)
        }
        // after add real time chat using Socket.io
        res.status(201).json({data:newMessage})
    } catch (error) {
        res.status(400).json({error:error.message})
        
    } 
}