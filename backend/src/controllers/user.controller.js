import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers (req,res) {

    try {
        const currentUserId = req.user._id;
        const currentUser =  req.user
        
        const recommendedUsers = await User.find({
         $and:[
            {_id: {$ne: currentUserId}}, //exclude current user from friends recommendation
            {_id: {$nin: currentUser.friends}},
            {isOnboarded:true}
         ]
        })

        // res.status(200).json({recommendedUsers})
        res.status(200).json({ users: recommendedUsers });
    } catch (error) {
        // console.error("Error in getRecommendedUsers Controller",error.message);
        // return [];
        // res.status(500).json({message:"Internal server error"});
        return res.status(500).json([]);

    }



}
export async function getMyFriends (req,res) {
    try {
        const user = await User.findById(req.user._id)
        .select("friends")
        .populate("friends","fullName profilePic nativeLanguage learningLanguage");   
        
        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function sendFriendRequest (req,res){
    try {
        const myId = req.user._id;
        const {id:recipientId} = req.params;

        //prevent sending req to yourself
        if (myId == recipientId){
            return res.status(400).json({message:"You can't send a friend request to yourself"});
        }

        const recipient = await User.findById(recipientId)
        if(!recipient){
           return res.status(400).json({message:"User not found"}); 
        }
        //check if user is already friend
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are already friends with this user"});
        }
        //check if req already exists
        const existingRequest = await FriendRequest.findOne({
            $or:[
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });

        if(existingRequest){
            return res
            .status(400)
            .json({message:"A friend request has been already sent to this user"});
        }

        const friendRequest = await FriendRequest.create({
        sender: myId,
        recipient: recipientId,
        });

        res.status(201).json(friendRequest);


    } catch (error) {
        console.error("Error in sendFriendRequest controller",error.message);
        res.status(500).json({message:"Internal server error"}); 
    }
}
// export async function acceptFriendRequest(req,res) {
//     try {
//         const {id:requestId} = req.params
//         const friendRequest = await FriendRequest.findById(requestId);

//         if(!friendRequest){
//             return res.status(400).json({message:"Friend request not found"});
//         }

//         //verify if the current user is the recipient
//         if(friendRequest.recipient.toString() !== req.user._id){
//             return res.status(403).json({message:"You are not authorised to accept this request"});
//         }

//         friendRequest.status = "accepted";
//         await friendRequest.save();

//         //add each user to the other's friend array 
//         // $addToSet: adds element to array only if it does not already exist.
//         await User.findByIdAndUpdate(friendRequest.sender,{
//             $addToSet: {friends: friendRequest.recipient},
//         });

//         await User.findByIdAndUpdate(friendRequest.recipient,{
//             $addToSet: {friends:friendRequest.sender},
//         });
//     } catch (error) {
        
//     }
// }

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    return res.status(200).json({
      message: "Friend request accepted",
      friendRequest,
    });

  } catch (error) {
    console.error("acceptFriendRequest error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getFriendRequests(req,res){
    try {
        const incomingRequests = await FriendRequest.find({
            recipient: req.user._id,
            status: "pending",
        }).populate("sender","fullName profilePic learningLanguage nativeLanguage");

        const acceptedRequests = await FriendRequest.find({
            sender: req.user._id,
            status: "accepted",
        }).populate("recipient","fullName profilePic");

        res.status(200).json({ incomingRequests, acceptedRequests})
    } catch (error) {
        console.log("Error in getPendingFriendRequests controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}
// export async function getOutgoingFriendReqs(req,res){
//     try {
//         const outgoingRequests = FriendRequest.find({
//             sender:req.user._id,
//             status: "pending",
//         }).populate("recipient","fullName profilePic nativeLanguage learningLanguage");

//         res.status(200).json(outgoingRequests); 
//     } catch (error) {
//         // console.log("Error in getOutgoingFriendReqs controller",error.message);
//         //  return [];
//         return res.status(500).json([]);

//         // res.status(500).json({message:"Internal server error"});
//     }
// }

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.error("getOutgoingFriendReqs error:", error.message);
    res.status(500).json([]);
  }
}

