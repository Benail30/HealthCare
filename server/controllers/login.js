const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  prisma = require('../models/prisma');


const register = async (req, res) => {
  try {
    const {email, password, phoneNumber, firstName, lastName, specialityId, imageUrl,role } = req.body;
    if (role==='doctor'){

      if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const doctor = await prisma.doctor.create({ });
      const user = await prisma.user.create({
        data: {doctorId:doctor.id,email, password: hashedPassword, phoneNumber, firstName, specialityId,lastName, imageUrl,role:"doctor" },
      });

    return  res.status(201).json(user );
    }else{
      if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, phoneNumber, firstName, lastName, imageUrl },
      });

    return  res.status(201).json( user );
      }
    }
    
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!password || !user.password) {
      console.log('password', password);
      return res.status(400).json({ error: 'Password is required' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '8h' });
    res.status(200).json({... user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'SERVER ERROR' });
  }
};



  const getUser = async (req,res)=>{
  
    try {
      const currentUser = req.user;
      const user =await prisma.user.findUnique( {where: {
        id: currentUser.userId},
        include: {
          doctor: true, 
        },
      },)
        res.json(user||null)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'SERVER ERROR' });
    }

  }







module.exports = {
  register,
  login,
  getUser
};