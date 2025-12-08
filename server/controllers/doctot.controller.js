const  prisma = require('../models/prisma');

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await prisma.user.findMany({
            where :{role:"doctor"},
            include:{
            doctor:true,
         speciality:true
            
    
            }
        });
        res.status(200).json(doctors);
    } catch (error) {
       console.log(error);
        res.status(500).json({ error: 'SERVER ERROR' });
    }
}

const FilterDoctor = async (req, res) => {
    try {
        const { firstName, speciality } = req.query;
        console.log("First Name:", firstName); 
        console.log("Speciality:", speciality); 

        let whereCondition = {};
        if (firstName && speciality) {
            whereCondition = {
                AND: [
                    { firstName: { contains: firstName } },
                    { 
                        speciality:{
                        speciality:speciality
                       }  
                     }
                ]
            };
        } else if (firstName) {
            whereCondition = {
                firstName: { contains: firstName }
            };
        } else if (speciality) {
            whereCondition = { 
                speciality:{
                speciality:speciality
               }  
             }
        }

        const doctors = await prisma.user.findMany({
            where: whereCondition,
            include: {
                speciality: true 
            }
        });

        console.log("Doctors:", doctors); 
        res.json(doctors);
    } catch (error) {
        console.error("Error:", error); 
        res.status(500).json({ error: 'SERVER ERROR' });
    }
}




module.exports = {
    getAllDoctors,
    FilterDoctor
};
