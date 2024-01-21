import fileUploadModel from "../models/file_upload.model.js";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
        const updateUser = await fileUploadModel.updateOne({ id : userId }, { files: user.files });
        res.status(200).json({ id: user.id, message: 'file updated successfully' });
    } catch (error) {
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

const removeFile = async (req, res) => {
    try {
      const fileObj = req.body
      const user = await fileUploadModel.findOne({ id: fileObj.id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const fileToRemoveIdx = user.files[fileObj.fileType].findIndex(file => file.originalname === fileObj.filename);
      if (fileToRemoveIdx == -1) {
        return res.status(404).json({ message: 'File not found' });
      }
      const filePath = path.join(__dirname, '../files', user.files[fileObj.fileType][fileToRemoveIdx].filename)
      fs.unlinkSync(filePath);
      user.files[fileObj.fileType].splice(fileToRemoveIdx,1);
      await fileUploadModel.updateOne({ id : fileObj.id }, { files: user.files });
      res.status(200).json({ message: 'Files removed successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


export {
    handleFileUpload,
    retrieveFiles,
    updateFiles,
    removeFile
}