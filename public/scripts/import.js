document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('plus')){
        e.target.parentElement.parentElement.querySelector('.qty').value = Number(e.target.parentElement.parentElement.querySelector('.qty').value) + 1
    }
    else if(e.target.classList.contains('minus')){
        e.target.parentElement.parentElement.querySelector('.qty').value = Number(e.target.parentElement.parentElement.querySelector('.qty').value) - 1
    }
    else if(e.target.classList.contains('submit')){
        let payload = {
            title: e.target.parentElement.parentElement.querySelector("input[name='title']").value,
            desc: e.target.parentElement.parentElement.querySelector("input[name='desc']").value,
            src: e.target.parentElement.parentElement.querySelector("input[name='src']").value,
            category: e.target.parentElement.parentElement.querySelector("input[name='category']").value,
            sub_category: e.target.parentElement.parentElement.querySelector("input[name='sub_category']").value,
            price: e.target.parentElement.parentElement.querySelector("input[name='price']").value,
            qty: e.target.parentElement.parentElement.querySelector("input[name='qty']").value,
        }
   
        axios.post('/import-item',{payload:payload}).then((response)=>{
            let alert_type = response.data=='Item imported!' ? 'success' : response.data=='Already imported!' ? 'primary' : 'warning'

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
                    <span>Failed to Import!</span>
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
    axios.post('/search-market',{searchTerm:searchTerm}).then((response)=>{
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
                </div>
                <div class="product-details">
                    <h5>${result.title}</h5>
                    <p>${result.desc}</p>

                    <div class="product-bottom-details">
                        <div class="product-price">
                            <span>PKR&nbsp;&nbsp;</span>
                            <input class='price' type='number' name='price' value='${result.price}'>
                        </div> 
                        
                        <div class="input-group mb-3 input-group d-flex justify-content-center qty-ctrl">
                            <div class="input-group-prepend">
                                <button class="input-group-text minus" type="button">-</button>
                            </div>
                            <input type="number" class="form-control qty" name='qty' value='50'>
                            <div class="input-group-append">
                                <button class="input-group-text plus" type="button">+</button>
                            </div>
                        </div>
                    
                        <button type="submit" class="btn btn-md ms-2 submit">Import item</button>                               
                    </div>

                    <input type='hidden' name="title_bug" value='${result.title}'>
                    <input type='hidden' name='desc' value='${result.desc}'>
                    <input type='hidden' name='src' value='${result.src}'>
                    <input type='hidden' name='category' value='${result.category}'>
                    <input type='hidden' name='sub_category' value='${result.sub_category}'>
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
    // DOMPurify removes name='title' and onerror attr
    document.querySelector('.search-results-wrapper').querySelectorAll("input[name=title_bug]").forEach((elem)=>{
        elem.name = 'title'
    })
    document.querySelector('.search-results-wrapper').querySelectorAll(".product-image").forEach((elem)=>{
        elem.addEventListener('error', ()=>{ elem.src = '/images/not found.png' })
    })

    hideLoaderIcon()
    showSearchResults()
}