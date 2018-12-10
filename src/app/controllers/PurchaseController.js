const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const Mail = require('../services/Mail')

class PurchaseController {
  async index (req, res) {
    const filters = {}

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }
    const purchases = await Purchase.paginate(filters, {
      page: req.query.page || 1,
      limit: 10,
      populate: ['author'],
      sort: '-createdAt'
    })
    return res.json(purchases)
  }
  async show (req, res) {
    const purchase = await Purchase.findById(req.params.id)

    return res.json(purchase)
  }
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    await Mail.sendMail({
      from: '"João Medeiros" <jaum97@yahoo.com.br>',
      to: purchaseAd.author.email,
      subject: `Solicitação de compra ${purchaseAd.title}`,
      template: 'purchase',
      context: { user, content, ad: purchaseAd }
    })

    await Purchase.create({
      ...req.body,
      price: ad.price,
      title: ad.title,
      author: req.userId
    })

    return res.send()
  }

  /* async accept() {
    const { purchase, ad } = req.body
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
  } */
}

module.exports = new PurchaseController()
