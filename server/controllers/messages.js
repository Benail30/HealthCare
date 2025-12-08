


const addMessage = async (req, res) => {
    try {
      const { userId,roomId , content } = req.body;
      const messages = await message.create({ data: { userId, roomId, content } });
      res.status(200).send(messages);
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Failed to create message' });
    }
  };
  
  const getAllMessages = async (req, res) => {
    try {
      const messages = await message.findMany({});
      res.status(200).send(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };


  module.exports={
    addMessage,
    getAllMessages
}