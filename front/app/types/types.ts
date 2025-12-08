export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    imageUrl: string;
    doctorId?:number
    doctor?: Doctor;
    appointments?: Appointment[];
    ratingsComments?: RatingsComment[];
    speciality:Specialty
    // blogs?: Blog[];
}

 export interface SignUpState {
  loading: boolean;
  error: string | null;
  success: boolean;
}
 export interface SignInState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface CurrentUserState {
  loading: boolean;
  error: string | null;
  user: User | null;
}




export enum UserType {
  Patient = 'Patient',
  Doctor = 'Doctor',
}
  
  export interface Appointment {
    id: number;
    appointmentTime: Date;
    status: AppointmentStatus;
    paymentStatus: PaymentStatus;
    appointmentDepartment: string;
    doctorId: number;
    doctor?: Doctor;
    userId: number;
    user?: User;
  }
  export enum PaymentStatus {
    Paid = 'Paid',
    Unpaid = 'Unpaid',
  }
  export enum AppointmentStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
  }
  
  
  
export interface Message {
  id?: number;
  content: string;
  user?: User; 
  roomId: number; 

  timestamp?: string; 
}

  
  export interface RatingsComment {
    id: number;
    rating: number;
    review: string;
    imageSrc: string;
    name: string;
    userId: number;
    user: User;
  }
  
  export interface Admin {
    id: number;
    username: string;
    email: string;
    password: string;
  }
  
  export interface Payment {
    id: number;
    amount: number;
    paymentDate: Date;
}
  
  
  
  export interface Comment {
    id: number;
    author: string;
    comment: string;
    timestamp: Date;
    blogId: number;
    // blog: Blog;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  }
  
  
  export interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    
    paginate: (pageNumber: number) => void;
  }

  export interface CurentSpeciality {
    specialty: []
    status: string;
    error: string | null;  
  }

  export interface Specialty {
    id: number;  
    speciality: string;  
  }

  export interface Doctor {
    id: number;
    specialityId: number;
  }
  
  export interface DoctorState {
    entities:[];
    loading: boolean;
    error: string | null;
  }
