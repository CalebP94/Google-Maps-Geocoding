const service = require("./student.service");

async function list(req, res){
    const data = await service.list()
    res.json({data})
}

async function create(req, res, next){
    const{
        data: {
            studentID,
            studentName,
            parentName,
            address,
            city,
            state,
            zipcode,
            lat,
            long
        }={},
    } = req.body;
    const studentOBJ = {
        studentID,
        studentName,
        parentName,
        address,
        city,
        state,
        zipcode,
        lat,
        long
    };
    const resp = await service.create(studentOBJ);
    res.status(201).json({data:resp})
}

module.exports = {
    list,
    create
}