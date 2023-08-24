document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('plus')){
        e.target.parentElement.parentElement.querySelector('.qty').value = Number(e.target.parentElement.parentElement.querySelector('.qty').value) + 1
    }
    else if(e.target.classList.contains('minus')){
        e.target.parentElement.parentElement.querySelector('.qty').value = Number(e.target.parentElement.parentElement.querySelector('.qty').value) - 1
    }
    else if(e.target.classList.contains('product-remove')){
        let confirmation = confirm('Do you really want to delete this item?')
        if(confirmation){
            let itemID =  e.target.parentElement.parentElement.querySelector('.product-details').getAttribute('id')

            axios.post('/delete-item/:id',{itemID:itemID}).then((response)=>{
                if(response.data=='Found'){
                    e.target.parentElement.parentElement.remove()
                    Array.from(document.querySelector('.products-wrapper').querySelectorAll('.product-details')).forEach((elem)=>{
                        if(elem.getAttribute('id')==itemID){
                            elem.parentElement.remove()
                        }
                    })
                    alert('Item deleted successfully!')
                }
                else if(response.data=='Not Found'){
                    alert('The Item you are trying to delete does not exist!')
                }
                else{
                    alert('Delete Operation Failed!')
                }
            }).catch(()=>{
                alert('Delete Operation Failed!')
            })
        }
    }
    else if(e.target.classList.contains('submit')){
        let price = e.target.parentElement.parentElement.querySelector("input[name='price']").value
        let qty = e.target.parentElement.parentElement.querySelector("input[name='qty']").value
        let itemID =  e.target.parentElement.parentElement.getAttribute('id')
   
        axios.post(`/update-item/${itemID}`,{price, qty}).then((response)=>{
            let alert_type = response.data=='Item updated!' ? 'success' : 'warning'

            e.target.parentElement.parentElement.parentElement.querySelector('.product-thumb').insertAdjacentHTML('beforeend', `
                <div class="alert alert-${alert_type} notification" role="alert">
                    <span>${response.data}</span>
                </div>
            `)

            setTimeout(()=>{
                e.target.parentElement.parentElement.parentElement.querySelector('.notification').remove()
            },1500)
        }).catch(()=>{
            e.target.parentElement.parentElement.parentElement.querySelector('.product-thumb').insertAdjacentHTML('beforeend', `
                <div class="alert alert-warning notification" role="alert">
                    <span>Failed to Update!</span>
                </div>
            `)

            setTimeout(()=>{
                e.target.parentElement.parentElement.parentElement.querySelector('.notification').remove()
            },1500)
        })
    }
})

let typingWaitTimer
let preValue = ''

document.querySelector('.searchField').addEventListener('keyup', ()=>{
    let value = document.querySelector('.searchField').value

    if(value==''){
        clearTimeout(typingWaitTimer)
        hideSearchResults()
        hideLoaderIcon()
        showItems()
    }

    if(value!='' && value!=preValue){
        clearTimeout(typingWaitTimer)
        hideItems()
        hideSearchResults()
        showLoaderIcon()
        typingWaitTimer = setTimeout(()=> sendRequest(value),750)
    }    

    preValue = value
})

function sendRequest(searchTerm){
    axios.post('/search-inventory',{searchTerm:searchTerm}).then((response)=>{
        renderSearchResults(response.data)
    }).catch(()=>{
        alert('Search Operation Failed!')
    })
}

function hideSearchResults(){
    document.querySelector('.search-results-wrapper').classList.add('hidden')
}

function showSearchResults(){
    document.querySelector('.search-results-wrapper').classList.remove('hidden')
}

function hideItems(){
    document.querySelector('.products-wrapper').classList.add('hidden')
}

function showItems(){
    document.querySelector('.products-wrapper').classList.remove('hidden')
}

function hideLoaderIcon(){
    document.querySelector('#loader').classList.add('hidden')
}

function showLoaderIcon(){
    document.querySelector('#loader').classList.remove('hidden')
}

function renderSearchResults(results){
    let html = ''
    if(document.querySelector('.search-results-wrapper').lastChild){
        document.querySelector('.search-results-wrapper').lastChild.remove()
    } 

    if(results.length){
        html += `
        <div class="d-flex justify-content-around flex-wrap mt-4">`

        results.forEach((result)=>{
            html += `
            <div class="product-card">
                <div class="product-thumb">
                    <img class='product-image' src="${result.src}">
                    <img class="product-remove" src="/images/removeItem.png">
                </div>
                <div class="product-details" id="${result._id}">
                    <h5>${result.title}</h5>
                    <p>${result.desc}</p>

                    <div class="product-bottom-details">
                        <div class="product-price">
                            <span>PKR&nbsp;&nbsp;</span>
                            <input class='price' type='number' name='price' value='${result.price}'>
                        </div> 
                        
                        <div class="input-group mb-3 d-flex justify-content-center qty-ctrl">
                            <div class="input-group-prepend">
                                <button class="input-group-text minus" type="button">-</button>
                            </div>
                            <input type="number" class="form-control qty" name='qty' value='${result.qty}'>
                            <div class="input-group-append">
                                <button class="input-group-text plus" type="button">+</button>
                            </div>
                        </div>
                    
                        <button type="submit" class="btn btn-md ms-2 submit">Update item</button>                               
                    </div>

                </div>
            </div>`
        })
                     
        html += `</div>`
    }
    else{
        html += `
        <div class="reqInfo mt-4">
            <p>No search results found!</p>
        </div>`
    }
    
    document.querySelector('.search-results-wrapper').insertAdjacentHTML('beforeend', DOMPurify.sanitize(html))
    // DOMPurify removes onerror attr
    document.querySelector('.search-results-wrapper').querySelectorAll(".product-image").forEach((elem)=>{
        elem.addEventListener('error', ()=>{ elem.src = '/images/not found.png' })
    })

    hideLoaderIcon()
    showSearchResults()
}