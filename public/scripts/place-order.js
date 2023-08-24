document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('plus')){
        e.target.parentElement.parentElement.querySelector('.qty').value = Number(e.target.parentElement.parentElement.querySelector('.qty').value) + 1
    }
    else if(e.target.classList.contains('minus')){
        e.target.parentElement.parentElement.querySelector('.qty').value = Number(e.target.parentElement.parentElement.querySelector('.qty').value) - 1
    }
    else if(e.target.classList.contains('submit')){
        let itemID =  e.target.parentElement.parentElement.getAttribute('id')
        let qty = e.target.parentElement.querySelector('input').value

        axios.post('/add-item-cart',{itemID:itemID, qty:qty}).then((response)=>{
            let alert_type = response.data.msg=='Item added to cart!' ? 'success' : 'warning'

            e.target.parentElement.parentElement.parentElement.querySelector('.product-thumb').insertAdjacentHTML('beforeend', `
                <div class="alert alert-${alert_type} notification" role="alert">
                    <span>${response.data.msg}</span>
                </div>
            `)

            if(alert_type=='success'){
                cart = response.data.cart
                refresh_cart_UI(cart)
            }

            setTimeout(()=>{
                e.target.parentElement.parentElement.parentElement.querySelector('.notification').remove()
            },1500)
        }).catch(()=>{
            e.target.parentElement.parentElement.parentElement.querySelector('.product-thumb').insertAdjacentHTML('beforeend', `
                <div class="alert alert-warning notification" role="alert">
                    <span>Item not added!</span>
                </div>
            `)

            setTimeout(()=>{
                e.target.parentElement.parentElement.parentElement.querySelector('.notification').remove()
            },1500)
        })
    } 
    else if(e.target.classList.contains('emptyCart') || (e.target.nodeName=='svg' && e.target.parentElement.classList.contains('emptyCart')) || (e.target.nodeName=='path' && e.target.parentElement.parentElement.classList.contains('emptyCart'))){
        axios.post('/clear-cart').then((response)=>{
            if(response.data=='Cart is now empty!'){
                cart = []
                refresh_cart_UI(cart)
            }
            else{
                alert('Please try again later!')
            }
        }).catch(()=>{
            alert('Please try again later!')
        })
    }
    else if(e.target.classList.contains('cartQtyChange')){
        const operation = e.target.parentElement.classList.contains('cartQtyChangePlus') ? 'increment' : 'decrement'
        let itemID =  e.target.getAttribute('id')
        let qty = e.target.parentElement.parentElement.querySelector('.cartQty').innerHTML
        qty = operation=='increment' ? Number(qty)+1 : Number(qty)-1
        qty = String(qty)

        axios.post('/add-item-cart',{itemID:itemID, qty:qty}).then((response)=>{
            let alert_type = response.data.msg=='Item added to cart!' ? 'success' : 'warning'

            if(alert_type=='success'){
                cart = response.data.cart
                refresh_cart_UI(cart)
            }
            else{
                response.data.msg=='Item not added!' ? alert('Item not updated!') : alert(response.data.msg)
            }
        }).catch(()=>{
            alert('Item not updated!')
        })
    }
    else if((e.target.nodeName=='svg' && e.target.parentElement.classList.contains('cartItemTrash')) || (e.target.nodeName=='path' && e.target.parentElement.parentElement.classList.contains('cartItemTrash'))){
        let elem = e.target
        while(!elem.classList.contains('cartItemTrash')){
            elem = elem.parentElement
        }
        
        let itemID = elem.getAttribute('id')
        
        axios.post(`/delete-item-cart/${itemID}`).then((response)=>{
            if(response.data.msg=='Item Removed!'){
                cart = response.data.cart
                refresh_cart_UI(cart)
            }
            else{
                alert('Please try again later!')
            }
        }).catch(()=>{
            alert('Please try again later!')
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

window.addEventListener('load', ()=>{
    axios.get('/recommend-items').then((response)=>{
        let items = response.data

        if(items.length){
            let html = `
                <br><hr> 
                <h3 class="mb-4 text-uppercase top-rec text-center"><b>Top Picks For You!</b></h3>
                <div class="d-flex justify-content-around flex-wrap mt-4">       
            `

            items.forEach(item => {
                html += `
                <div class="product-card">
                    <div class="product-thumb">
                        <img class='product-image' src="${item.src}">
                    </div>
                    <div class="product-details" id="${item._id}">
                        <h5>${item.title}</h5>
                        <p>${item.desc}</p>
    
                        <div class="product-bottom-details">
                            <div class="product-price">
                                <span>PKR</span>
                                <span class='price'>${item.price}</span>
                            </div> 
                            
                            <div class="input-group mb-3 d-flex justify-content-center qty-ctrl">
                                <div class="input-group-prepend">
                                    <button class="input-group-text minus ${Number(item.qty)>0 ? '' : 'half-opacity'}" type="button" ${Number(item.qty)>0 ? '' : 'disabled'}>-</button>
                                </div>
                                <input type="number" class="form-control qty" name='qty' value='1' ${Number(item.qty)>0 ? '' : 'disabled'}>
                                <div class="input-group-append">
                                    <button class="input-group-text plus ${Number(item.qty)>0 ? '' : 'half-opacity'}" type="button" ${Number(item.qty)>0 ? '' : 'disabled'}>+</button>
                                </div>
                            </div>
                        
                            <button type="submit" class="btn btn-md ms-2 submit" ${Number(item.qty)>0 ? '' : 'disabled'}>${Number(item.qty)>0 ? 'Add to Cart' : 'Out of Stock'}</button>                               
                        </div>
    
                    </div>
                </div>`
            })

            html += '</div>'

            document.querySelector('.products-wrapper').insertAdjacentHTML('beforeend', DOMPurify.sanitize(html))
            // DOMPurify removes onerror attr
            document.querySelector('.products-wrapper').querySelectorAll(".product-image").forEach((elem)=>{
                elem.addEventListener('error', ()=>{ elem.src = '/images/not found.png' })
            })
        }   
        else{
            console.log('Failed to recommend items!')
        }
    }).catch(()=>{
        console.log('Failed to recommend items!')
    })
})

function sendRequest(searchTerm){
    axios.post('/search-product',{searchTerm:searchTerm}).then((response)=>{
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
                <div class="product-details" id="${result._id}">
                    <h5>${result.title}</h5>
                    <p>${result.desc}</p>

                    <div class="product-bottom-details">
                        <div class="product-price">
                            <span>PKR</span>
                            <span class='price'>${result.price}</span>
                        </div> 
                        
                        <div class="input-group mb-3 d-flex justify-content-center qty-ctrl">
                            <div class="input-group-prepend">
                                <button class="input-group-text minus ${Number(result.qty)>0 ? '' : 'half-opacity'}" type="button" ${Number(result.qty)>0 ? '' : 'disabled'}>-</button>
                            </div>
                            <input type="number" class="form-control qty" name='qty' value='1' ${Number(result.qty)>0 ? '' : 'disabled'}>
                            <div class="input-group-append">
                                <button class="input-group-text plus ${Number(result.qty)>0 ? '' : 'half-opacity'}" type="button" ${Number(result.qty)>0 ? '' : 'disabled'}>+</button>
                            </div>
                        </div>
                    
                        <button type="submit" class="btn btn-md ms-2 submit" ${Number(result.qty)>0 ? '' : 'disabled'}>${Number(result.qty)>0 ? 'Add to Cart' : 'Out of Stock'}</button>                               
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

function refresh_cart_UI(cart){
    let html = ''

    while(document.querySelector('tbody').lastChild){
        document.querySelector('tbody').lastChild.remove()
    } 

    cart.forEach((item, index)=>{
        html += `
            <tr>
                <th scope="row">${index+1}</th>
                <td class="cart-title">${item.title}</td>
                <td>${item.desc}</td>
                <td class="cartQtyChangeMinus"><span class="cartQtyChange" id='${item._id}'>-</span></td>
                <td class="text-center cartQty">${item.qty}</td>
                <td class="cartQtyChangePlus"><span class="cartQtyChange" id='${item._id}'>+</span></td>
                <td>${item.price}</td>
                <td>${Number(item.price) * Number(item.qty)}</td>
                <td class="cartItemTrash" id='${item._id}'><i class="fa fa-trash" aria-hidden="true" style="color: rgb(206, 32, 32);"></i></td>
            </tr>
        `
    })

    html += `
        <tr>
            <th scope="row"></th>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${cart.reduce((value,item)=> value + Number(item.qty)*Number(item.price),0)}</td>
            <td></td>
        </tr>
    `

    document.querySelector('tbody').insertAdjacentHTML('beforeend', html)
}

function decimalToWei(value) {
    const weiValue = Math.floor(parseFloat(value) * 1e18); // Convert decimal value to Wei
    const hexValue = weiValue.toString(16); // Convert Wei to hexadecimal string
    const paddedHexValue = hexValue.padStart(64, '0'); // Pad the string with zeros to 64 characters
    return `0x${paddedHexValue}`; // Add the 0x prefix and return the result
}

const FypAbi = {
    "_format": "hh-sol-artifact-1",
    "contractName": "Fyp",
    "sourceName": "contracts/fyp.sol",
    "abi": [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "usdtAddress",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "insufficientBalance",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "dbId",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "TransactionEvent",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "addTransaction",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "customerOrders",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ownerAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "tokenBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalOrders",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ],
    "bytecode": "0x60a060405234801561001057600080fd5b50604051610e23380380610e238339818101604052810190610032919061010f565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250505061013c565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006100dc826100b1565b9050919050565b6100ec816100d1565b81146100f757600080fd5b50565b600081519050610109816100e3565b92915050565b600060208284031215610125576101246100ac565b5b6000610133848285016100fa565b91505092915050565b608051610cbe61016560003960008181610348015281816104ac015261053b0152610cbe6000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80631d8344091461005c5780632063513c1461007a57806324aceeb4146100ab5780638f84aa09146100c75780639e1a4d19146100e5575b600080fd5b610064610103565b6040516100719190610618565b60405180910390f35b610094600480360381019061008f91906107eb565b610109565b6040516100a2929190610847565b60405180910390f35b6100c560048036038101906100c0919061089c565b610150565b005b6100cf610539565b6040516100dc9190610907565b60405180910390f35b6100ed61055d565b6040516100fa9190610618565b60405180910390f35b60015481565b600260205281600052604060002081805160208101820180518482526020830160208501208183528095505050505050600091509150508060000154908060010154905082565b8060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016101aa9190610907565b602060405180830381865afa1580156101c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101eb9190610937565b1015610223576040517f47108e3e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b333846040518363ffffffff1660e01b8152600401610281929190610964565b6020604051808303816000875af11580156102a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102c491906109c5565b905080610306576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102fd90610a4f565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd337f0000000000000000000000000000000000000000000000000000000000000000866040518463ffffffff1660e01b815260040161038693929190610a6f565b6020604051808303816000875af11580156103a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c991906109c5565b90508061040b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040290610af2565b60405180910390fd5b604051806040016040528042815260200184815250600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208560405161046d9190610b83565b90815260200160405180910390206000820151816000015560208201518160010155905050600160008154809291906104a590610bc9565b91905055507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f949e9389ce68f61eecaacdd991ece6c45bdd1cc1329d5c02a6e6408863c934f486428760405161052b93929190610c4a565b60405180910390a350505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016105b99190610907565b602060405180830381865afa1580156105d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105fa9190610937565b905090565b6000819050919050565b610612816105ff565b82525050565b600060208201905061062d6000830184610609565b92915050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061067282610647565b9050919050565b61068281610667565b811461068d57600080fd5b50565b60008135905061069f81610679565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6106f8826106af565b810181811067ffffffffffffffff82111715610717576107166106c0565b5b80604052505050565b600061072a610633565b905061073682826106ef565b919050565b600067ffffffffffffffff821115610756576107556106c0565b5b61075f826106af565b9050602081019050919050565b82818337600083830152505050565b600061078e6107898461073b565b610720565b9050828152602081018484840111156107aa576107a96106aa565b5b6107b584828561076c565b509392505050565b600082601f8301126107d2576107d16106a5565b5b81356107e284826020860161077b565b91505092915050565b600080604083850312156108025761080161063d565b5b600061081085828601610690565b925050602083013567ffffffffffffffff81111561083157610830610642565b5b61083d858286016107bd565b9150509250929050565b600060408201905061085c6000830185610609565b6108696020830184610609565b9392505050565b610879816105ff565b811461088457600080fd5b50565b60008135905061089681610870565b92915050565b600080604083850312156108b3576108b261063d565b5b600083013567ffffffffffffffff8111156108d1576108d0610642565b5b6108dd858286016107bd565b92505060206108ee85828601610887565b9150509250929050565b61090181610667565b82525050565b600060208201905061091c60008301846108f8565b92915050565b60008151905061093181610870565b92915050565b60006020828403121561094d5761094c61063d565b5b600061095b84828501610922565b91505092915050565b600060408201905061097960008301856108f8565b6109866020830184610609565b9392505050565b60008115159050919050565b6109a28161098d565b81146109ad57600080fd5b50565b6000815190506109bf81610999565b92915050565b6000602082840312156109db576109da61063d565b5b60006109e9848285016109b0565b91505092915050565b600082825260208201905092915050565b7f617070726f76616c206661696c65640000000000000000000000000000000000600082015250565b6000610a39600f836109f2565b9150610a4482610a03565b602082019050919050565b60006020820190508181036000830152610a6881610a2c565b9050919050565b6000606082019050610a8460008301866108f8565b610a9160208301856108f8565b610a9e6040830184610609565b949350505050565b7f5472616e73666572206661696c65642000000000000000000000000000000000600082015250565b6000610adc6010836109f2565b9150610ae782610aa6565b602082019050919050565b60006020820190508181036000830152610b0b81610acf565b9050919050565b600081519050919050565b600081905092915050565b60005b83811015610b46578082015181840152602081019050610b2b565b60008484015250505050565b6000610b5d82610b12565b610b678185610b1d565b9350610b77818560208601610b28565b80840191505092915050565b6000610b8f8284610b52565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610bd4826105ff565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610c0657610c05610b9a565b5b600182019050919050565b6000610c1c82610b12565b610c2681856109f2565b9350610c36818560208601610b28565b610c3f816106af565b840191505092915050565b60006060820190508181036000830152610c648186610c11565b9050610c736020830185610609565b610c806040830184610609565b94935050505056fea2646970667358221220074770578c183a2f75a8db739d30aec88018be9f478079619569754e6aa8ffd364736f6c63430008120033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100575760003560e01c80631d8344091461005c5780632063513c1461007a57806324aceeb4146100ab5780638f84aa09146100c75780639e1a4d19146100e5575b600080fd5b610064610103565b6040516100719190610618565b60405180910390f35b610094600480360381019061008f91906107eb565b610109565b6040516100a2929190610847565b60405180910390f35b6100c560048036038101906100c0919061089c565b610150565b005b6100cf610539565b6040516100dc9190610907565b60405180910390f35b6100ed61055d565b6040516100fa9190610618565b60405180910390f35b60015481565b600260205281600052604060002081805160208101820180518482526020830160208501208183528095505050505050600091509150508060000154908060010154905082565b8060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016101aa9190610907565b602060405180830381865afa1580156101c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101eb9190610937565b1015610223576040517f47108e3e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b333846040518363ffffffff1660e01b8152600401610281929190610964565b6020604051808303816000875af11580156102a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102c491906109c5565b905080610306576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102fd90610a4f565b60405180910390fd5b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd337f0000000000000000000000000000000000000000000000000000000000000000866040518463ffffffff1660e01b815260040161038693929190610a6f565b6020604051808303816000875af11580156103a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c991906109c5565b90508061040b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040290610af2565b60405180910390fd5b604051806040016040528042815260200184815250600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208560405161046d9190610b83565b90815260200160405180910390206000820151816000015560208201518160010155905050600160008154809291906104a590610bc9565b91905055507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f949e9389ce68f61eecaacdd991ece6c45bdd1cc1329d5c02a6e6408863c934f486428760405161052b93929190610c4a565b60405180910390a350505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016105b99190610907565b602060405180830381865afa1580156105d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105fa9190610937565b905090565b6000819050919050565b610612816105ff565b82525050565b600060208201905061062d6000830184610609565b92915050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061067282610647565b9050919050565b61068281610667565b811461068d57600080fd5b50565b60008135905061069f81610679565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6106f8826106af565b810181811067ffffffffffffffff82111715610717576107166106c0565b5b80604052505050565b600061072a610633565b905061073682826106ef565b919050565b600067ffffffffffffffff821115610756576107556106c0565b5b61075f826106af565b9050602081019050919050565b82818337600083830152505050565b600061078e6107898461073b565b610720565b9050828152602081018484840111156107aa576107a96106aa565b5b6107b584828561076c565b509392505050565b600082601f8301126107d2576107d16106a5565b5b81356107e284826020860161077b565b91505092915050565b600080604083850312156108025761080161063d565b5b600061081085828601610690565b925050602083013567ffffffffffffffff81111561083157610830610642565b5b61083d858286016107bd565b9150509250929050565b600060408201905061085c6000830185610609565b6108696020830184610609565b9392505050565b610879816105ff565b811461088457600080fd5b50565b60008135905061089681610870565b92915050565b600080604083850312156108b3576108b261063d565b5b600083013567ffffffffffffffff8111156108d1576108d0610642565b5b6108dd858286016107bd565b92505060206108ee85828601610887565b9150509250929050565b61090181610667565b82525050565b600060208201905061091c60008301846108f8565b92915050565b60008151905061093181610870565b92915050565b60006020828403121561094d5761094c61063d565b5b600061095b84828501610922565b91505092915050565b600060408201905061097960008301856108f8565b6109866020830184610609565b9392505050565b60008115159050919050565b6109a28161098d565b81146109ad57600080fd5b50565b6000815190506109bf81610999565b92915050565b6000602082840312156109db576109da61063d565b5b60006109e9848285016109b0565b91505092915050565b600082825260208201905092915050565b7f617070726f76616c206661696c65640000000000000000000000000000000000600082015250565b6000610a39600f836109f2565b9150610a4482610a03565b602082019050919050565b60006020820190508181036000830152610a6881610a2c565b9050919050565b6000606082019050610a8460008301866108f8565b610a9160208301856108f8565b610a9e6040830184610609565b949350505050565b7f5472616e73666572206661696c65642000000000000000000000000000000000600082015250565b6000610adc6010836109f2565b9150610ae782610aa6565b602082019050919050565b60006020820190508181036000830152610b0b81610acf565b9050919050565b600081519050919050565b600081905092915050565b60005b83811015610b46578082015181840152602081019050610b2b565b60008484015250505050565b6000610b5d82610b12565b610b678185610b1d565b9350610b77818560208601610b28565b80840191505092915050565b6000610b8f8284610b52565b915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610bd4826105ff565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610c0657610c05610b9a565b5b600182019050919050565b6000610c1c82610b12565b610c2681856109f2565b9350610c36818560208601610b28565b610c3f816106af565b840191505092915050565b60006060820190508181036000830152610c648186610c11565b9050610c736020830185610609565b610c806040830184610609565b94935050505056fea2646970667358221220074770578c183a2f75a8db739d30aec88018be9f478079619569754e6aa8ffd364736f6c63430008120033",
    "linkReferences": {},
    "deployedLinkReferences": {}
}

const usdtAbi = {
    "_format": "hh-sol-artifact-1",
    "contractName": "USDT",
    "sourceName": "contracts/usdt.sol",
    "abi": [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "bytecode": "0x60806040523480156200001157600080fd5b506040518060400160405280600a81526020017f54657468657220555344000000000000000000000000000000000000000000008152506040518060400160405280600481526020017f55534454000000000000000000000000000000000000000000000000000000008152506200009e62000092620000ca60201b60201c565b620000d260201b60201c565b8160049081620000af919062000410565b508060059081620000c1919062000410565b505050620004f7565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200021857607f821691505b6020821081036200022e576200022d620001d0565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620002987fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000259565b620002a4868362000259565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620002f1620002eb620002e584620002bc565b620002c6565b620002bc565b9050919050565b6000819050919050565b6200030d83620002d0565b620003256200031c82620002f8565b84845462000266565b825550505050565b600090565b6200033c6200032d565b6200034981848462000302565b505050565b5b8181101562000371576200036560008262000332565b6001810190506200034f565b5050565b601f821115620003c0576200038a8162000234565b620003958462000249565b81016020851015620003a5578190505b620003bd620003b48562000249565b8301826200034e565b50505b505050565b600082821c905092915050565b6000620003e560001984600802620003c5565b1980831691505092915050565b6000620004008383620003d2565b9150826002028217905092915050565b6200041b8262000196565b67ffffffffffffffff811115620004375762000436620001a1565b5b620004438254620001ff565b6200045082828562000375565b600060209050601f83116001811462000488576000841562000473578287015190505b6200047f8582620003f2565b865550620004ef565b601f198416620004988662000234565b60005b82811015620004c2578489015182556001820191506020850194506020810190506200049b565b86831015620004e25784890151620004de601f891682620003d2565b8355505b6001600288020188555050505b505050505050565b6119fb80620005076000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063715018a611610097578063a457c2d711610066578063a457c2d714610276578063a9059cbb146102a6578063dd62ed3e146102d6578063f2fde38b14610306576100f5565b8063715018a6146102145780638da5cb5b1461021e57806394bf804d1461023c57806395d89b4114610258576100f5565b806323b872dd116100d357806323b872dd14610166578063313ce5671461019657806339509351146101b457806370a08231146101e4576100f5565b806306fdde03146100fa578063095ea7b31461011857806318160ddd14610148575b600080fd5b610102610322565b60405161010f9190610f44565b60405180910390f35b610132600480360381019061012d9190610fff565b6103b4565b60405161013f919061105a565b60405180910390f35b6101506103d7565b60405161015d9190611084565b60405180910390f35b610180600480360381019061017b919061109f565b6103e1565b60405161018d919061105a565b60405180910390f35b61019e610410565b6040516101ab919061110e565b60405180910390f35b6101ce60048036038101906101c99190610fff565b610419565b6040516101db919061105a565b60405180910390f35b6101fe60048036038101906101f99190611129565b610450565b60405161020b9190611084565b60405180910390f35b61021c610499565b005b6102266104ad565b6040516102339190611165565b60405180910390f35b61025660048036038101906102519190611180565b6104d6565b005b610260610505565b60405161026d9190610f44565b60405180910390f35b610290600480360381019061028b9190610fff565b610597565b60405161029d919061105a565b60405180910390f35b6102c060048036038101906102bb9190610fff565b61060e565b6040516102cd919061105a565b60405180910390f35b6102f060048036038101906102eb91906111c0565b610631565b6040516102fd9190611084565b60405180910390f35b610320600480360381019061031b9190611129565b6106b8565b005b6060600480546103319061122f565b80601f016020809104026020016040519081016040528092919081815260200182805461035d9061122f565b80156103aa5780601f1061037f576101008083540402835291602001916103aa565b820191906000526020600020905b81548152906001019060200180831161038d57829003601f168201915b5050505050905090565b6000806103bf61073b565b90506103cc818585610743565b600191505092915050565b6000600354905090565b6000806103ec61073b565b90506103f985828561090c565b610404858585610998565b60019150509392505050565b60006006905090565b60008061042461073b565b90506104458185856104368589610631565b610440919061128f565b610743565b600191505092915050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6104a1610c11565b6104ab6000610c8f565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610501816104e2610410565b60ff16600a6104f191906113f6565b846104fc9190611441565b610d53565b5050565b6060600580546105149061122f565b80601f01602080910402602001604051908101604052809291908181526020018280546105409061122f565b801561058d5780601f106105625761010080835404028352916020019161058d565b820191906000526020600020905b81548152906001019060200180831161057057829003601f168201915b5050505050905090565b6000806105a261073b565b905060006105b08286610631565b9050838110156105f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ec906114f5565b60405180910390fd5b6106028286868403610743565b60019250505092915050565b60008061061961073b565b9050610626818585610998565b600191505092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6106c0610c11565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361072f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161072690611587565b60405180910390fd5b61073881610c8f565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a990611619565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610821576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610818906116ab565b60405180910390fd5b80600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516108ff9190611084565b60405180910390a3505050565b60006109188484610631565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146109925781811015610984576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097b90611717565b60405180910390fd5b6109918484848403610743565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a07576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fe906117a9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a76576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6d9061183b565b60405180910390fd5b610a81838383610eaa565b6000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610b08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aff906118cd565b60405180910390fd5b818103600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bf89190611084565b60405180910390a3610c0b848484610eaf565b50505050565b610c1961073b565b73ffffffffffffffffffffffffffffffffffffffff16610c376104ad565b73ffffffffffffffffffffffffffffffffffffffff1614610c8d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8490611939565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610dc2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db9906119a5565b60405180910390fd5b610dce60008383610eaa565b8060036000828254610de0919061128f565b9250508190555080600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610e929190611084565b60405180910390a3610ea660008383610eaf565b5050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610eee578082015181840152602081019050610ed3565b60008484015250505050565b6000601f19601f8301169050919050565b6000610f1682610eb4565b610f208185610ebf565b9350610f30818560208601610ed0565b610f3981610efa565b840191505092915050565b60006020820190508181036000830152610f5e8184610f0b565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f9682610f6b565b9050919050565b610fa681610f8b565b8114610fb157600080fd5b50565b600081359050610fc381610f9d565b92915050565b6000819050919050565b610fdc81610fc9565b8114610fe757600080fd5b50565b600081359050610ff981610fd3565b92915050565b6000806040838503121561101657611015610f66565b5b600061102485828601610fb4565b925050602061103585828601610fea565b9150509250929050565b60008115159050919050565b6110548161103f565b82525050565b600060208201905061106f600083018461104b565b92915050565b61107e81610fc9565b82525050565b60006020820190506110996000830184611075565b92915050565b6000806000606084860312156110b8576110b7610f66565b5b60006110c686828701610fb4565b93505060206110d786828701610fb4565b92505060406110e886828701610fea565b9150509250925092565b600060ff82169050919050565b611108816110f2565b82525050565b600060208201905061112360008301846110ff565b92915050565b60006020828403121561113f5761113e610f66565b5b600061114d84828501610fb4565b91505092915050565b61115f81610f8b565b82525050565b600060208201905061117a6000830184611156565b92915050565b6000806040838503121561119757611196610f66565b5b60006111a585828601610fea565b92505060206111b685828601610fb4565b9150509250929050565b600080604083850312156111d7576111d6610f66565b5b60006111e585828601610fb4565b92505060206111f685828601610fb4565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061124757607f821691505b60208210810361125a57611259611200565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061129a82610fc9565b91506112a583610fc9565b92508282019050808211156112bd576112bc611260565b5b92915050565b60008160011c9050919050565b6000808291508390505b600185111561131a578086048111156112f6576112f5611260565b5b60018516156113055780820291505b8081029050611313856112c3565b94506112da565b94509492505050565b60008261133357600190506113ef565b8161134157600090506113ef565b8160018114611357576002811461136157611390565b60019150506113ef565b60ff84111561137357611372611260565b5b8360020a91508482111561138a57611389611260565b5b506113ef565b5060208310610133831016604e8410600b84101617156113c55782820a9050838111156113c0576113bf611260565b5b6113ef565b6113d284848460016112d0565b925090508184048111156113e9576113e8611260565b5b81810290505b9392505050565b600061140182610fc9565b915061140c83610fc9565b92506114397fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611323565b905092915050565b600061144c82610fc9565b915061145783610fc9565b925082820261146581610fc9565b9150828204841483151761147c5761147b611260565b5b5092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006114df602583610ebf565b91506114ea82611483565b604082019050919050565b6000602082019050818103600083015261150e816114d2565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611571602683610ebf565b915061157c82611515565b604082019050919050565b600060208201905081810360008301526115a081611564565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611603602483610ebf565b915061160e826115a7565b604082019050919050565b60006020820190508181036000830152611632816115f6565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611695602283610ebf565b91506116a082611639565b604082019050919050565b600060208201905081810360008301526116c481611688565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611701601d83610ebf565b915061170c826116cb565b602082019050919050565b60006020820190508181036000830152611730816116f4565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611793602583610ebf565b915061179e82611737565b604082019050919050565b600060208201905081810360008301526117c281611786565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611825602383610ebf565b9150611830826117c9565b604082019050919050565b6000602082019050818103600083015261185481611818565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006118b7602683610ebf565b91506118c28261185b565b604082019050919050565b600060208201905081810360008301526118e6816118aa565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611923602083610ebf565b915061192e826118ed565b602082019050919050565b6000602082019050818103600083015261195281611916565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600061198f601f83610ebf565b915061199a82611959565b602082019050919050565b600060208201905081810360008301526119be81611982565b905091905056fea2646970667358221220b27621f5196e76e9a350b1242d2a06b643b0a4aed6a3244a9d446db8bea5afa864736f6c63430008120033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100f55760003560e01c8063715018a611610097578063a457c2d711610066578063a457c2d714610276578063a9059cbb146102a6578063dd62ed3e146102d6578063f2fde38b14610306576100f5565b8063715018a6146102145780638da5cb5b1461021e57806394bf804d1461023c57806395d89b4114610258576100f5565b806323b872dd116100d357806323b872dd14610166578063313ce5671461019657806339509351146101b457806370a08231146101e4576100f5565b806306fdde03146100fa578063095ea7b31461011857806318160ddd14610148575b600080fd5b610102610322565b60405161010f9190610f44565b60405180910390f35b610132600480360381019061012d9190610fff565b6103b4565b60405161013f919061105a565b60405180910390f35b6101506103d7565b60405161015d9190611084565b60405180910390f35b610180600480360381019061017b919061109f565b6103e1565b60405161018d919061105a565b60405180910390f35b61019e610410565b6040516101ab919061110e565b60405180910390f35b6101ce60048036038101906101c99190610fff565b610419565b6040516101db919061105a565b60405180910390f35b6101fe60048036038101906101f99190611129565b610450565b60405161020b9190611084565b60405180910390f35b61021c610499565b005b6102266104ad565b6040516102339190611165565b60405180910390f35b61025660048036038101906102519190611180565b6104d6565b005b610260610505565b60405161026d9190610f44565b60405180910390f35b610290600480360381019061028b9190610fff565b610597565b60405161029d919061105a565b60405180910390f35b6102c060048036038101906102bb9190610fff565b61060e565b6040516102cd919061105a565b60405180910390f35b6102f060048036038101906102eb91906111c0565b610631565b6040516102fd9190611084565b60405180910390f35b610320600480360381019061031b9190611129565b6106b8565b005b6060600480546103319061122f565b80601f016020809104026020016040519081016040528092919081815260200182805461035d9061122f565b80156103aa5780601f1061037f576101008083540402835291602001916103aa565b820191906000526020600020905b81548152906001019060200180831161038d57829003601f168201915b5050505050905090565b6000806103bf61073b565b90506103cc818585610743565b600191505092915050565b6000600354905090565b6000806103ec61073b565b90506103f985828561090c565b610404858585610998565b60019150509392505050565b60006006905090565b60008061042461073b565b90506104458185856104368589610631565b610440919061128f565b610743565b600191505092915050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6104a1610c11565b6104ab6000610c8f565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610501816104e2610410565b60ff16600a6104f191906113f6565b846104fc9190611441565b610d53565b5050565b6060600580546105149061122f565b80601f01602080910402602001604051908101604052809291908181526020018280546105409061122f565b801561058d5780601f106105625761010080835404028352916020019161058d565b820191906000526020600020905b81548152906001019060200180831161057057829003601f168201915b5050505050905090565b6000806105a261073b565b905060006105b08286610631565b9050838110156105f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ec906114f5565b60405180910390fd5b6106028286868403610743565b60019250505092915050565b60008061061961073b565b9050610626818585610998565b600191505092915050565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6106c0610c11565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361072f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161072690611587565b60405180910390fd5b61073881610c8f565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107a990611619565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610821576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610818906116ab565b60405180910390fd5b80600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516108ff9190611084565b60405180910390a3505050565b60006109188484610631565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146109925781811015610984576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161097b90611717565b60405180910390fd5b6109918484848403610743565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a07576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fe906117a9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a76576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6d9061183b565b60405180910390fd5b610a81838383610eaa565b6000600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610b08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aff906118cd565b60405180910390fd5b818103600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bf89190611084565b60405180910390a3610c0b848484610eaf565b50505050565b610c1961073b565b73ffffffffffffffffffffffffffffffffffffffff16610c376104ad565b73ffffffffffffffffffffffffffffffffffffffff1614610c8d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8490611939565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610dc2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db9906119a5565b60405180910390fd5b610dce60008383610eaa565b8060036000828254610de0919061128f565b9250508190555080600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610e929190611084565b60405180910390a3610ea660008383610eaf565b5050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610eee578082015181840152602081019050610ed3565b60008484015250505050565b6000601f19601f8301169050919050565b6000610f1682610eb4565b610f208185610ebf565b9350610f30818560208601610ed0565b610f3981610efa565b840191505092915050565b60006020820190508181036000830152610f5e8184610f0b565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f9682610f6b565b9050919050565b610fa681610f8b565b8114610fb157600080fd5b50565b600081359050610fc381610f9d565b92915050565b6000819050919050565b610fdc81610fc9565b8114610fe757600080fd5b50565b600081359050610ff981610fd3565b92915050565b6000806040838503121561101657611015610f66565b5b600061102485828601610fb4565b925050602061103585828601610fea565b9150509250929050565b60008115159050919050565b6110548161103f565b82525050565b600060208201905061106f600083018461104b565b92915050565b61107e81610fc9565b82525050565b60006020820190506110996000830184611075565b92915050565b6000806000606084860312156110b8576110b7610f66565b5b60006110c686828701610fb4565b93505060206110d786828701610fb4565b92505060406110e886828701610fea565b9150509250925092565b600060ff82169050919050565b611108816110f2565b82525050565b600060208201905061112360008301846110ff565b92915050565b60006020828403121561113f5761113e610f66565b5b600061114d84828501610fb4565b91505092915050565b61115f81610f8b565b82525050565b600060208201905061117a6000830184611156565b92915050565b6000806040838503121561119757611196610f66565b5b60006111a585828601610fea565b92505060206111b685828601610fb4565b9150509250929050565b600080604083850312156111d7576111d6610f66565b5b60006111e585828601610fb4565b92505060206111f685828601610fb4565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061124757607f821691505b60208210810361125a57611259611200565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061129a82610fc9565b91506112a583610fc9565b92508282019050808211156112bd576112bc611260565b5b92915050565b60008160011c9050919050565b6000808291508390505b600185111561131a578086048111156112f6576112f5611260565b5b60018516156113055780820291505b8081029050611313856112c3565b94506112da565b94509492505050565b60008261133357600190506113ef565b8161134157600090506113ef565b8160018114611357576002811461136157611390565b60019150506113ef565b60ff84111561137357611372611260565b5b8360020a91508482111561138a57611389611260565b5b506113ef565b5060208310610133831016604e8410600b84101617156113c55782820a9050838111156113c0576113bf611260565b5b6113ef565b6113d284848460016112d0565b925090508184048111156113e9576113e8611260565b5b81810290505b9392505050565b600061140182610fc9565b915061140c83610fc9565b92506114397fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611323565b905092915050565b600061144c82610fc9565b915061145783610fc9565b925082820261146581610fc9565b9150828204841483151761147c5761147b611260565b5b5092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006114df602583610ebf565b91506114ea82611483565b604082019050919050565b6000602082019050818103600083015261150e816114d2565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611571602683610ebf565b915061157c82611515565b604082019050919050565b600060208201905081810360008301526115a081611564565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611603602483610ebf565b915061160e826115a7565b604082019050919050565b60006020820190508181036000830152611632816115f6565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611695602283610ebf565b91506116a082611639565b604082019050919050565b600060208201905081810360008301526116c481611688565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611701601d83610ebf565b915061170c826116cb565b602082019050919050565b60006020820190508181036000830152611730816116f4565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611793602583610ebf565b915061179e82611737565b604082019050919050565b600060208201905081810360008301526117c281611786565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611825602383610ebf565b9150611830826117c9565b604082019050919050565b6000602082019050818103600083015261185481611818565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b60006118b7602683610ebf565b91506118c28261185b565b604082019050919050565b600060208201905081810360008301526118e6816118aa565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611923602083610ebf565b915061192e826118ed565b602082019050919050565b6000602082019050818103600083015261195281611916565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600061198f601f83610ebf565b915061199a82611959565b602082019050919050565b600060208201905081810360008301526119be81611982565b905091905056fea2646970667358221220b27621f5196e76e9a350b1242d2a06b643b0a4aed6a3244a9d446db8bea5afa864736f6c63430008120033",
    "linkReferences": {},
    "deployedLinkReferences": {}
}

const fypAddress = '0xf5558fB11e820a2A41e6a2133aaC104aA2f4BD98';
const usdtAddress = '0xc827c4C0e0A0c2418Ac7311A345289879d9A09Cc';
const decimals = 6;

const getEventHistory = async () => {
    if (!window.ethereum) {
        alert('Please install MetaMask first.')
        return
    }
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const fypContract = new ethers.Contract(fypAddress, FypAbi.abi, provider);
        const logsHistory = await fypContract.queryFilter("TransactionEvent");
        console.log('Event history: ', logsHistory);
    } catch (error) {
        console.error(error);
    }
};

const approveUserAndAddTx = (cartTotal, orderID) => {
    return new Promise(async(resolve,reject)=>{
        if (!window.ethereum) {
            alert('Please install MetaMask first.')
            return
        }
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const usdtContract = new ethers.Contract(usdtAddress, usdtAbi.abi, signer)
            const approved = await usdtContract.approve(fypAddress, cartTotal.toFixed(6) * 10 ** decimals);
            const firstTxReceipt = await approved.wait(1);
            if (firstTxReceipt) {
                const fypContract = new ethers.Contract(fypAddress, FypAbi.abi, signer);
                const secondTx = await fypContract.addTransaction(orderID, cartTotal.toFixed(6) * 10 ** decimals);
                console.log(secondTx)
                const secondTxReceipt = await secondTx.wait();
    
                console.log(secondTxReceipt)
                resolve(secondTx.hash)
            }
    
        } catch (error) {
            console.error(error.message);
            reject(error)
        }
    })
}

const payWithCrypto = async () => {
    try {
        let verificationMsg = await axios.get('/verifyCart')
        if(typeof(verificationMsg.data)=='string'){
            throw new Error(verificationMsg.data)
        }
        let orderID = verificationMsg.data[1]

        const { ethereum } = window;

        if (!ethereum) {
            console.log("please install MetaMask");
            alert("please install MetaMask")
            return
        }

        const accounts = await ethereum.request({
            method: 'eth_requestAccounts'

        });
        console.log(accounts)

        if (typeof cart === 'object') {
            cart = JSON.stringify(cart)
        }

        const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=usdt')
        const body = await response.json()
        const rate = Number(body.data.rates.PKR)
        console.log({ rate })

        const total = JSON.parse(cart).reduce((value, item) => value + Number(item.qty) * Number(item.price), 0);
        
        const transactionID = await approveUserAndAddTx(total / rate, orderID)
        console.log('TransactionID:',transactionID)

        let result = await axios.post('/payWithCrypto', {payload:[orderID,cart,transactionID]})
        if(result.data=="Transaction successful! Some other unexpected error.") throw new Error(result.data)
        else window.open(`http://localhost:3000/order-details/${result.data}`, '_self')
    } catch (error) {
        alert(error.message ? error.message : error)
        console.log(error.message ? error.message : error)
    }
}