const  prisma = require('../models/prisma');



const getAllSpeciality  = async (req, res) => {
  try {
      const All = await prisma.speciality.findMany();
      res.status(200).json(All);
  } catch (error) {
     
      res.status(500).json({ error: 'SERVER ERROR' });
  }
}


const getBySpeciality = async (req,res)=>{
    
    try {
      const sp =await prisma.speciality.findUnique( {where: {
        speciality: req.speciality}},)
        res.json(sp||null)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'SERVER ERROR' });
    }
  
  }

  

  const createSpeciality = async (req,res)=>{
    
    try {
      
      const sp =await prisma.speciality.create({data:req.body});
        res.json(sp||null)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'SERVER ERROR' });
    }
  
  }


  module.exports = {
    getAllSpeciality,
    getBySpeciality,
    createSpeciality
};