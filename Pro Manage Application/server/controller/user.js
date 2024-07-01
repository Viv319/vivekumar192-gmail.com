const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res, next)=>{
    try {
        const {name, email, password, } =req.body;
        const formattedEmail = email.toLowerCase();
        
        if(!name || !email || !password ){
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        
        const isExistUser = await User.findOne({email:formattedEmail})

        if(isExistUser){
            return res
            .status(409)
            .json({errorMessage:"User already Exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const userData = new User({
            name, email:formattedEmail, password: hashedPassword,
        });

        await userData.save();
        res.json({ message: "user registered successfully"})

    } catch (error){
        next(error);
    }
}

const loginUser = async(req, res, next)=>{
    try {
        const { password, email} =req.body;
        const formattedEmail = email.toLowerCase();

        if( !formattedEmail || !password ){
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        const userDetails = await User.findOne({ email: formattedEmail });
        if(!userDetails){
            return res
            .status(409)
            .json({errorMessage:"User doesn't Exists"})
        }

        // compare the password details (bcryptjs)
        const ispasswordMatched = await bcrypt.compare(password, userDetails.password);
        if(!ispasswordMatched){
            return res
           .status(401)
           .json({errorMessage: 'Invalid password'});
        }

        // JWT (jsonwebtoken)
        const token = jwt.sign(
            { userId: userDetails._id }, 
            process.env.SECRET_KEY, 
            {expiresIn: "1h"}
        );

        res.json({
            message: "User logged in",
            token: token,
            name: userDetails.name,
        })
    } catch (error){
        next(error);
    }
}

const updateUser = async(req, res, next)=>{
    try {
        const {id} = req.params
        // .id;
        const {name, email, password } =req.body;
        // const formattedEmail = email.toLowerCase();
        
        if(!name || !email || !password ){
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }
        
        // const isExistUser = await User.findOne(id)



            const hashedPassword = await bcrypt.hash(password,10);
            const isExistUser = await User.findByIdAndUpdate(id, {name, email, password:hashedPassword})

            if(!isExistUser){
                return res.status(409).json({
                    errorMessage: "User does not Exist",
                });
            }

            // isExistUser.name = name;
            // isExistUser.email = formattedEmail;
            // isExistUser.password =  hashedPassword;
            // const userData = new User({
            //     name:name, email:formattedEmail, password: hashedPassword,
            // });

            // const {id} = req.params;
            // const { name, formattedEmail, checklist, dueDate, } =req.body;
            
            

            // await isExistUser.updateOne({name:name},{ email }, { $set: { password: hashedPassword }});
            res.status(200).json({ message: "user details updated successfully"})

    } catch (error){
        next(error);
    }
}

const deleteUser =async(req, res, next) => {
    try{
        const {id} = req.params;
        const isExistUser = await User.findByIdAndDelete(id);
        
        if (!isExistUser) {
            return res.status(404).json({ message: 'User not found' });
          }

        res.status(200).json({ message: "user deleted successfully"})
    }catch (error){
        next(error);
    }

}

const logoutUser = async (req, res, next) => {
    const { id } = req.params;

  try {
    // Find user by ID and clear the token (or end the session)
    const user = await User.findByIdAndUpdate(id, { token: null }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// const getUserName = async (req, res, next) => {

//     const { id } = req.params;

//   try {
//     // Find user by ID and clear the token (or end the session)
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ name: user.name });
// } catch (error){
//     next(error);
// }
// }

const getUserById= async (req, res, next) => {

    const { id } = req.params;
    try{
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error){
        next(error);
    }
}


module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    logoutUser,
    // getUserName,
    getUserById,
}