import fileUploadModel from "../models/file_upload.model.js";

const handleFileUpload=async(req,res)=>{
    try{
        let files = {}
        let doc_files = JSON.parse(req.body.doc_files);
        if (req.files && req.files.length > 0) {
            files = handleFilesData(doc_files.selectedFiles,req.files)
        }
        const id = doc_files.userId;
        const userExists = await fileUploadModel.findOne({id});
        if(userExists){
         const updateUser = await fileUploadModel.updateOne({id},{files: files})
         res.status(200).send({empId:updateUser.id,"message" : "Updated the documents of the existing user"});
         return;
        }
        const newUpload = await fileUploadModel.create({id: doc_files.userId,files: files, created: true});
        res.status(201).send(newUpload);
    }catch(error){
        console.log('error here',error)
        res.status(500).json({message: error.message});
    } 
}

const retrieveFiles = async (req, res) => {
    try {
        const fileId = req.params.id;
        const fileData = await fileUploadModel.findOne({ id: fileId });
        if (!fileData) {
            return res.status(200).json({files:{Visa: [],Transcripts: [],IDs: [],Payslips: []},created: false});
        }
        res.status(200).json(fileData);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateFiles = async (req,res)=>{
    try{
        let files = {}
        let doc_files = JSON.parse(req.body.doc_files);
        if (req.files && req.files.length > 0) {
            files = handleFilesData(doc_files.selectedFiles,req.files)
        }
        const userId = doc_files.userId;

        const user = await fileUploadModel.findOne({ id: userId });

        if(user){

            Object.keys(files).forEach(key=>{
                if(files[`${key}`].length){
                    user.files[`${key}`].push(...files[`${key}`])
                }
            })


        }
        console.log('updated val : ',user)

        const updateUser = await fileUploadModel.updateOne({ id : userId }, { files: user.files });
        console.log('updateUser : ',updateUser)
        res.status(200).json({ id: user.id, message: 'file updated successfully' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

function handleFilesData(doc_files,files){
    let new_doc_files =  {
        Visa: [],
        Transcripts: [],
        IDs: [],
        Payslips: []
    }
    Object.keys(doc_files).forEach(key=>{
        if(doc_files[key].length){
            doc_files[key].forEach(file=>{
            let titlObj = files.find(val=>val.originalname==file);
                if(titlObj){
                    new_doc_files[key].push(titlObj)
                }
            })
        }
    })
    return new_doc_files;
}

export {
    handleFileUpload,
    retrieveFiles,
    updateFiles
}