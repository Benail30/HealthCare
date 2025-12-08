const { room ,roomUser,user,message} = require('../models/prisma');




const createRoom = async (req, res) => {
    try {
        const rooms = await room.create({});
        const adduser1=await roomUser.create({data:{
            roomId:rooms.id,
             userId:Number(req.params.user1)
     }});
     const adduser2=await roomUser.create({data:{
        roomId:rooms.id,
         userId:Number(req.params.user2)
     }});
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching Appointment:', error);
        res.status(500).json({ error: 'Failed to fetch Appointment' });
    }
}

const getAllRoomsByUserId = async (req, res)=>{
    try {
        const rooms = await user.findUnique({
            where: { id: Number(req.params.id) },

            
            select: { rooms: {

                select:{

                
               
                user : {

                    select:{
                    id:true,
                    firstName:true, 
                    lastName:true, 
                    imageUrl:true, 
                    },
                    

                },
                
                room : {
                    select:{
                        id:true,
                        messages:{
                            select:{
                                content:true,
                                id:true,

                                user :{
                                    select:{
                                        id:true,          
                                        firstName: true,
                                        lastName: true, 
                                        imageUrl : true,
                                         
                                    }
                                }  
                            }
                        }

                        }

                    }
                }
  
             },
                        
                        }
        });
        res.status(200).json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
}

const createMessage = async (req, res) => {
    try {
        const messages = await message.create({
        data:{
             
    roomId :Number(req.body.roomId),
    userId :Number(req.body.userId),
    content :req.body.content

        }
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error Creating message:', error);
        res.status(500).json({ error: 'Failed to fetch message' });
    }
}


const getAllMessagesByRoomId= async (req, res) => {
    try {
        const messages = await message.findMany({
            where: {
                roomId: Number(req.params.id)
            },
            include: {
                user: true,
                 
            }
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
}

module.exports = {
    createRoom,
    getAllRoomsByUserId,
    createMessage,
    getAllMessagesByRoomId
};