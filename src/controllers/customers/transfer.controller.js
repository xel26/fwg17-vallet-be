const transferModel = require('../../models/transfer.model')
const walletModel = require('../../models/wallet.model')
const handleErr = require('../../helpers/utils')
const db = require("../../lib/db.lib")

exports.createTransfer = async (req, res) => {
  try{
    await db.query('BEGIN')
    //insert table transfer
    const transfer = await transferModel.insert(req.body)
    console.log(transfer)


    // take out balance from sender
    const findWalletSender = await walletModel.findOneByUserId(transfer.senderId)

    if(transfer.amount > findWalletSender.balance){
      // await db.query('ROLLBACK')
      throw ({code: 'THROW', message: 'balance is not sufficient'})
    }
    
    const totalSender = findWalletSender.balance - transfer.amount

    await walletModel.updateByUserId(transfer.senderId, totalSender)

    //add balance to recipient
    const findWalletRecipient = await walletModel.findOneByUserId(transfer.senderId)

    const totalRecipient = transfer.amount + findWalletRecipient.balance

    await walletModel.updateByUserId(transfer.recipientId, totalRecipient)

    
    //add data to contactList
    const isExist = transferModel.findContactList(transfer.senderId, transfer.recipientId)
    if(!isExist.length){
      await transferModel.insertContactList(transfer.senderId, transfer.recipientId)
    }
    
    
    if(!req.body.amount){
      throw ({code: 'THROW', message: 'Amount must not be empty'})
    }
    
    if(!req.body.recipientId){
      throw ({code: 'THROW', message: 'Recipient Id must not be empty'})
    }
    
    await db.query('COMMIT')

    return res.json({
      succes: true,
      message: 'Create Transfer Successfully',
      results: transfer
    })
  }catch(err){
    await db.query('ROLLBACK')
    handleErr.outError(err, res)
  }
}