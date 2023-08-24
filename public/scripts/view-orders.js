if(document.querySelector('.notifyForm')){
    document.querySelector('.notifyForm').addEventListener('submit', (e)=>{
        e.preventDefault()
        let response = confirm("Notify the store staff if you have arrived at the pick-up point and your order status is not updated to 'detected'")
        
        if(response){
            document.querySelector('.notifyForm').submit()
        }
    })
}

if(document.querySelector('.deliveryForm')){
    document.querySelector('.deliveryForm').addEventListener('submit', (e)=>{
        e.preventDefault()
        axios.get('/confirm-delivery-info').then((response)=>{
            let confirmation = confirm(`Confirm Delivery of Order No: ${(response.data.map(order => order.orderNo)).join(', ')}`)
            if(confirmation){
                document.querySelector('.deliveryForm').submit()
            }
        }).catch((error)=>{
            alert(error)
        })
    })
}