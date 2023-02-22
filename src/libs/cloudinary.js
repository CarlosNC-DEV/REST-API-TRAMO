import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: "dvcwdjwr6",
    api_key: "843711656981742",
    api_secret: "Vsly369g-Rcuzjsx5i1TVg1uBIk"
})

export const uploadImagesConductores = async filePath =>{
    try {
        return await cloudinary.uploader.upload(filePath, {
            folder: 'conductores'
        })
    } catch (error) {
        console.log(error)
    }

}

export const uploadImagesVehiculos = async filePath =>{
    try {
        return await cloudinary.uploader.upload(filePath, {
            folder: 'vehiculos'
        })
    } catch (error) {
        console.log(error)
    }
}

export const uploadImagesClienteNatural = async filePath =>{
    try {
        return await cloudinary.uploader.upload(filePath, {
            folder: 'cliente-natural'
        })
    } catch (error) {
        console.log(error)
    }
}

export const uploadImagesClienteEmpresa = async filePath =>{
    try {
        return await cloudinary.uploader.upload(filePath, {
            folder: 'cliente-empresa'
        })
    } catch (error) {
        console.log(error)
    }
}