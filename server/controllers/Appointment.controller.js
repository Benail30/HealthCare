
const  prisma = require('../models/prisma');

const createAppointment = async (req, res) => {

    try {
        const { appointmentTime, doctorId, userId, appointmentDepartment ,hourId} = req.body;
        const newAppointment = await prisma.appointment.create({
          data: {
            appointmentTime,
            doctorId,
            userId,
            appointmentDepartment,
            status: 'pending', 
            paymentStatus: 'unpaid' 
          }
        });
        const changeHourAvailibility= await prisma.hours.update({
            where:{
               id: hourId
            },
            data: {
                availability: false,
              },
        })
        res.status(201).json(newAppointment);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}
const getAllAppointment = async (req, res) => {
    try {
        const appointments = await prisma.appointment.findMany({
          include: {
            user: true, 
            doctor: true 
          }
        });
        res.json(appointments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const getAppointmentByUserId = async (req, res) => {
    const { userId } = req.params;
    console.log("Parsed userID:", parseInt(userId));
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          userId: parseInt(userId)
        },
        include: {
          user: true, 
          doctor:{
            select:{
                id:true,
                user:{
                    select:{
                        id :true ,        
                        firstName :true,  
                        lastName  :true , 
                        imageUrl  :true   
                    }
                }
            }
          }
        }
      });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
const getAppointmentByDoctorId = async (req, res) => {
    const { doctorId } = req.params;
    try {
      const appointments = await prisma.appointment.findMany({
        where: {
          doctorId: parseInt(doctorId)
        },
        include: {
          user: true,
          doctor:{
            select:{
                id:true,
                user:{
                    select:{
                        id :true ,        
                        firstName :true,  
                        lastName  :true , 
                        imageUrl  :true   
                    }
                }
            }
          }
        }
      });
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const getdayAvailability = async (req, res) => {
  const { doctorId } = req.params;
  console.log(doctorId,'#');
  try {
    
    const availability = await prisma.dayAvailability.findMany({
      where: {
        doctorId: Number(doctorId),
      },
      include: {
        hours: true 
      }
     
    });

    // if (availability.length === 0) {
    //   return res.status(404).json({ message: 'No availability found for this day.' });
    // }

    res.send(availability);
  } catch (error) {
    console.log(error,'errr');
    res.status(500).json({ error: error.message });
  }
}
const getAlldayAvailability = async (req, res) => {
    
    try {
     
      const availability = await prisma.dayAvailability.findMany({ 
        include: {
          hours: true 
        }
      });
      res.json(availability);
    } catch (error) {
      res.status(500).json({ message: 'No availability found for this day.' });
    }
  }

  const CreateHours= (dayId)=>{
    const arr=['H0800', 'H0900', 'H1000', 'H1100', 'H1200', 'H1300', 'H1400', 'H1500', 'H1600']

   return  arr.map((e)=>{
        return {
            "dayId": dayId,
            "hour": e,
        }
    })
}

const createdayAvailability = async (req, res) => {
    const { doctorId, day} = req.body;
    
    try {
        const newDayAvailability = await prisma.dayAvailability.create({
            data: {
                doctorId,
                day: day,
                // availability: hours.some(hour => hour.availability),




                // hours: {
                //     create: hours.map(hour => ({
                //         hour: hour.hour,
                //         availability: hour.availability
                //     }))
                // }
            },
            // include: {
            //     hours: true 
            // }
        });
        const generateHours=CreateHours(newDayAvailability.id)
        const hours=await prisma.hours.createMany({
            data:generateHours
        })
        res.status(201).json(newDayAvailability);
    } catch (error) {
        console.error("Error creating DayAvailability:", error);
        res.status(500).json({ message: "Failed to create day availability", error: error.message });
    }
};




module.exports = {
    createAppointment,   
    getAllAppointment,
    getAppointmentByUserId,
    getAppointmentByDoctorId,  
    getdayAvailability,
    createdayAvailability,
    getAlldayAvailability
};



