import mongoose from "mongoose";
const userSubmissionSchema =mongoose.Schema({
    name:
     {
       type: String,
       required: true 
     },
    socialHandle: 
    { 
      type: String, 
      required: true 
    },
    images: 
    [
     { 
    type: String
     }
    ],
    createdAt: {
         type: Date,
         default: Date.now 
        }
})

const UserSubmission=mongoose.model('UserSubmission', userSubmissionSchema);
export default UserSubmission