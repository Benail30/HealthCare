import axios from 'axios';

export const sendAppointmentEmail = (email, name, date, time,department) => async dispatch => {
  
  const greetingMessage = `Hello ${name}, Your book For the department ${department} has been confirmed, one of our doctors will be in touch with you soon, Your appointment date is : ${date} at ${time}.`;
  const emailBody = {
    to: email,
    subject: "Your appointment has been booked successfully!",
    html: greetingMessage,
  };

  try {
    const emailResponse = await axios.post("http://localhost:3000/api/sendmail", emailBody);
    dispatch({ type: 'SEND_APPOINTMENT_EMAIL_SUCCESS', payload: emailResponse.data });
  } catch (error) {
    dispatch({ type: 'SEND_APPOINTMENT_EMAIL_FAILURE', payload: error });
  }
};

export const sendSignupEmail = (email, name,UserType) => async dispatch => {
  if(UserType === "Doctor"){
    console.log(UserType, "UserType");
    console.log("Doctor");
    const greetingMessage = ` Hey Dr.${name} We are thrilled to welcome you to Healthcare! As part of our commitment to maintaining a secure and trusted environment for all users, we kindly request your assistance in completing the verification process.

    To ensure seamless access to our platform and its resources, we kindly ask you to provide the following documents for verification:
    
    Copy of Medical License: Please attach a clear copy of your current medical license issued by the appropriate regulatory authority.
    
    Proof of Identity: Please provide a government-issued identification document (e.g., passport, driver's license) to confirm your identity.
    
    Proof of Affiliation: If applicable, please submit documentation verifying your affiliation with the relevant medical institution or organization.
    
    Rest assured that all information provided will be handled with the utmost confidentiality and used solely for verification purposes in accordance with our privacy policy.
    
    Once your documents are received and verified, you will gain full access to the features and benefits of [Platform Name], empowering you to connect, collaborate, and contribute within our community of healthcare professionals.
    
    Should you have any questions or require assistance at any stage of the verification process, please do not hesitate to reach out to our support team at support@healthcare.com.
    
    Thank you for choosing Healthcare! We look forward to having you onboard and to the valuable contributions you will bring to our platform.
    
    Best regards.`;
    const emailBody = {
      to: email,
      subject: "Welcome to HealthCare! Please Complete Your Verification Process",
      html: greetingMessage,
    };
    try {
      const emailResponse = await axios.post("http://localhost:3000/api/sendmail", emailBody);
      dispatch({ type: 'SEND_SIGNUP_EMAIL_SUCCESS', payload: emailResponse.data });
    } catch (error) {
      dispatch({ type: 'SEND_SIGNUP_EMAIL_FAILURE', payload: error });
    }
  }
  else{
    const greetingMessage = `Dear ${name},

    Welcome to Healthcare Platform! We're thrilled to have you on board. Our platform is dedicated to revolutionizing healthcare, and we're excited for you to be a part of our community.
    
    To get started, please complete your registration by clicking on the following link: [Registration Link]
    
    Once registered, you'll have access to a wide range of features and resources tailored to your healthcare needs.
    
    If you have any questions or need assistance, feel free to reach out to our support team at support@healthcare.com.
    
    Thank you for joining Healthcare Platform. We look forward to seeing you online!
    
    Best regards,`;
    const emailBody = {
      to: email,
      subject: "Welcome to Healthcare Platform!",
      html: greetingMessage,
    };
  
    try {
      const emailResponse = await axios.post("http://localhost:3000/api/sendmail", emailBody);
      dispatch({ type: 'SEND_SIGNUP_EMAIL_SUCCESS', payload: emailResponse.data });
    } catch (error) {
      dispatch({ type: 'SEND_SIGNUP_EMAIL_FAILURE', payload: error });
    }
  }
 
};