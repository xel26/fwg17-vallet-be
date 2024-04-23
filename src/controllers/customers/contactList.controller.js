const contactListModel = require('../../models/contactList.model')


// hendle semua error yg terjadi di catch
const handleErr = require("../../helpers/utils")


// SELECT *
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

    } catch(err){
        handleErr.outError(err, res)
    }
}


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
}