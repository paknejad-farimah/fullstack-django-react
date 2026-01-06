import dayjs from "dayjs"
export const calculatePrices = ({cartItems}) =>{
    const itemPrice=cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)
    const shippingPrice=(itemPrice > 100 ? 0 : 10).toFixed(2)
    const taxPrice=(Number((0.082)*itemPrice)).toFixed(2)
    const totalPrice=(Number(itemPrice)+Number(shippingPrice)+Number(taxPrice))
    return{
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }
}

export const beautifulDate = (date)=>{
    const dateFormatted = dayjs(date).format('MMMM D, YYYY, h:mm A')
    return dateFormatted
}