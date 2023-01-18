const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator')
const db = require('../../database/models');
const { ResultWithContext } = require('express-validator/src/chain');
const Sequelize = require('sequelize');

const salesController = {
    cartDetail: async(req,res) => {
        try{
            const cartDetail = await db.Cart_details.findAll({
                include: [
                    {association:'cart_product'},
                    {association:'cart_user'}
                ]})
            //return res.send(cartDetail[0].cart_user.user_name)
            return res.render('sales/cartDetail',{title:'Detalle compras',cartDetail:cartDetail})            
        }catch(error){
            return res.send('Ups, algo salió mal')
        }
    },
    salesDetail: async(req,res) => {
        try{
            const sales = await db.Cart_details.findAll({
                group: ['sale_id','user_id'],
                attributes: [
                  'sale_id',
                  'user_id',
                  [Sequelize.fn('sum', Sequelize.col('product_qty')), 'total_qty'],
                ]
                
              });
            return res.send(sales)
        }catch(error){
            return res.send('Ups, algo salió mal')
    }
    }
}

module.exports = salesController