const contactListModel = require('../../models/contactList.model')
<<<<<<< HEAD

=======
const userModel = require('../../models/users.model')
const errorHandler = require('../../helpers/utils')
>>>>>>> 7fcb0f74e4fbbd03875d39e78d700206b492edfa

// hendle semua error yg terjadi di catch
const handleErr = require("../../helpers/utils")


// SELECT *
<<<<<<< HEAD
exports.getAllData = async(req, res) => {
    try{
        const {limit="5", phoneNumber, page="1"} = req.query
        const offset = (page - 1) * limit
        let getContactList
        let count

        console.log(phoneNumber, page)

        if(phoneNumber){
            count = await contactListModel.countAllByPhoneNumber(phoneNumber)
            getContactList = await contactListModel.findByPhoneNumber(phoneNumber, limit, offset, page)
        }else{
            const {id} = req.user
            const { search='' } = req.query
            getContactList = await contactListModel.allContactListforCustomer(id, search, limit, offset, page)
        }

        if(getContactList?.length < 1){
            throw ({code: "THROW", message: "No Data!"})
=======
exports.getAllData = async (req, res) => {
    try {
        let getContactList
        if (req.query.phoneNumber) {

            const phoneNumber = req.query.phoneNumber
            getContactList = await userModel.findOneByPhoneNumber(phoneNumber)
        } else {

            const { id } = req.user
            const { search = '' } = req.query
            getContactList = await contactListModel.allContactListforCustomer(id, search)
        }
        if (getContactList.length < 1) {
            throw ({ code: "THROW", message: "No Data!" })
>>>>>>> 7fcb0f74e4fbbd03875d39e78d700206b492edfa
        }

        const totalPage = Math.ceil(count / limit)

        const pageInfo = {
            totalPage: totalPage,
            currentPage: Number(page),
            nextPage: page <= totalPage ? Number(page) + 1 : 0,
            prevPage: page >= 1 ? Number(page) - 1 : 0,
            totalData: Number(count),
            limit: Number(limit)
        }

        return res.json({
            success: true,
            pageInfo: pageInfo,
            message: 'List all Contact List!',
            results: getContactList
        })

    } catch (err) {
        handleErr.outError(err, res)
    }
}

<<<<<<< HEAD

exports.getOneData = async(req, res) => {
    const {id} = req.params

    try {
        const user = await contactListModel.findOne(id)
          return res.json({
            success: true,
            message: `Detail user`,
            results: user
          })

    } catch (error) {
        handleErr.outError(error, res)
    }
=======
exports.getDetailTransfer = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const contactList = await contactListModel.findOneTransferDetail(id)

        if (!contactList) {
            return res.status(404).json({
                success: false,
                message: `contactList not found`,
            })
        }

        return res.json({
            success: true,
            message: `Detail contactList`,
            results: contactList
        })

    } catch (err) {
        errorHandler.outError(err, res)
    }

>>>>>>> 7fcb0f74e4fbbd03875d39e78d700206b492edfa
}