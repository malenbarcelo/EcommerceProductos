SELECT sale_id, user_id,sum(product_qty) as total_qty,sum(product_qty * product_price) as total_price
FROM sio2.cart_details
group by sale_id, user_id