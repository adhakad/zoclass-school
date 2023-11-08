const tokenService = require('../../services/student-token');
const StudentUserModel = require('../../models/users/student-user');
const StudentModel = require('../../models/student');

let SignupStudent = async (req, res, next) => {
    const { email, password, rollNumber, otp } = req.body;
    try {
        const checkUser = await StudentUserModel.findOne({ email: email });
        if (checkUser) {
            return res.status(400).json("Student email already register !");
        }
        const student = await StudentModel.findOne({ rollNumber: rollNumber, class: req.body.class });
        if (!student) {
            return res.status(404).json("Student not exist in this institute")
        }
        const studentId = student._id;
        const checkStudentId = await StudentUserModel.findOne({ studentId: studentId });
        if (checkStudentId) {
            return res.status(400).json("Roll number and class is invalid")
        }
        const checkOtp = await student.otp;
        if (otp !== checkOtp) {
            return res.status(400).json("Your otp is invalid");
        }
        let studentData = {
            studentId: studentId,
            email: email,
            password: password
        }
        const createSignupStudent = await StudentUserModel.create(studentData);
        return res.status(200).json('Sign up student succesfully');
    } catch (error) {
        console.log(error);
    }
}

let LoginStudent = async (req, res, next) => {

    try {
        let student = await StudentUserModel.findOne({ email: req.body.email, password: req.body.password })
        if (!student) {
            return res.status(404).json({ errorMsg: 'Student email or password invalid' });
        }
        let studentId = await student.studentId;
        let studentInfo = await StudentModel.findOne({ _id: studentId });
        if (studentInfo.status == "Inactive") {
            return res.status(400).json({ errorMsg: 'Login permission blocked, please contact institute administration' })
        }
        if (studentInfo.status == "Active") {
            const payload = { id: studentInfo._id, name: studentInfo.name, email: student.email, class: studentInfo.class,rollNumber:studentInfo.rollNumber };
            const accessToken = await tokenService.getAccessToken(payload);
            const refreshToken = await tokenService.getRefreshToken(payload);
            return res.status(200).json({ studentInfo: studentInfo, accessToken, refreshToken });
        }
        return res.status(400).json({ errorMsg: 'Login error' })
    } catch (error) {
        console.log(error)
    }
}

let RefreshToken = async (req, res, next) => {
    try {
        const { token } = req.body
        if (token) {
            const payload = await tokenService.verifyRefreshToken(token)
            const accessToken = await tokenService.getAccessToken(payload)
            res.send({ accessToken })
        }
        else {
            res.status(403).send('token Unavailable!!')
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    SignupStudent,
    LoginStudent,
    RefreshToken
}