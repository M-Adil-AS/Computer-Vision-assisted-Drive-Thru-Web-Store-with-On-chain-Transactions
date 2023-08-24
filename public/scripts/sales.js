customers = JSON.parse(env)=='production' ? JSON.parse(customers) : 
[{"_id":0,"username":"Server","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":6550,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/1/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":1,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"pet-food","desc":"52pcs Pack","price":8728,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/2/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":2,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":12026,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/3/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":3,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":14395,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/4/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":4,"username":"Muhammad","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":14587,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/5/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":5,"username":"harry","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":13791,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/6/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":6,"username":"Shadab","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"laundry-household","desc":"52pcs Pack","price":9498,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/7/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":7,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baking-cooking","desc":"52pcs Pack","price":8251,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/8/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":8,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"noodles-sauces","desc":"52pcs Pack","price":7049,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/9/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":9,"username":"Iftikhar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":9545,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/10/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":10,"username":"Asif","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"pet-food","desc":"52pcs Pack","price":9364,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/11/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":11,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"beverages","desc":"52pcs Pack","price":8456,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/12/2013 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":12,"username":"Muhammad","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":7237,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/1/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":13,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":9374,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/2/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":14,"username":"Server","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"pet-food","desc":"52pcs Pack","price":11837,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/3/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":15,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"frozen","desc":"52pcs Pack","price":13784,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/4/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":16,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":15926,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/5/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":17,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":13821,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/6/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":18,"username":"Muhammad","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":11143,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/7/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":19,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":7975,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/8/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":20,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baking-cooking","desc":"52pcs Pack","price":7610,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/9/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":21,"username":"Shadab","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":10015,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/10/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":22,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":12759,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/11/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":23,"username":"Shahbaz","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":8816,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/12/2014 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":24,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":10677,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/1/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":25,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"laundry-household","desc":"52pcs Pack","price":10947,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/2/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":26,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":15200,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/3/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":27,"username":"Shaheen","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":17010,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/4/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":28,"username":"Server","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":20900,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/5/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":29,"username":"Muhammad","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":16205,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/6/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":30,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"laundry-household","desc":"52pcs Pack","price":12143,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/7/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":31,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":8997,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/8/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":32,"username":"Asif","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"frozen","desc":"52pcs Pack","price":5568,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/9/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":33,"username":"Iftikhar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"noodles-sauces","desc":"52pcs Pack","price":11474,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/10/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":34,"username":"Iftikhar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"beverages","desc":"52pcs Pack","price":12256,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/11/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":35,"username":"Muhammad","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":10583,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/12/2015 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":36,"username":"Babar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"noodles-sauces","desc":"52pcs Pack","price":10862,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/1/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":37,"username":"Server","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"pet-food","desc":"52pcs Pack","price":10965,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/2/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":38,"username":"Babar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":14405,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/3/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":39,"username":"Server","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":20379,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/4/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":40,"username":"Shaheen","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"breakfast-dairy","desc":"52pcs Pack","price":20128,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/5/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":41,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":17816,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/6/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":42,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"pet-food","desc":"52pcs Pack","price":12268,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/7/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":43,"username":"Shadab","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":8642,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/8/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":44,"username":"Muhammad","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":7962,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/9/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":45,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baking-cooking","desc":"52pcs Pack","price":13932,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/10/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":46,"username":"Iftikhar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":15936,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/11/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":47,"username":"Muhammad","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baking-cooking","desc":"52pcs Pack","price":12628,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/12/2016 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":48,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":12267,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/1/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":49,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"beverages","desc":"52pcs Pack","price":12470,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/2/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":50,"username":"Iftikhar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":18944,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/3/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":51,"username":"Muhammad","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":21259,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/4/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":52,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":22015,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/5/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":53,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"pet-food","desc":"52pcs Pack","price":18581,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/6/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":54,"username":"harry","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":15175,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/7/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":55,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":10306,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/8/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":56,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":10792,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/9/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":57,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":14752,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/10/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":58,"username":"harry","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"frozen","desc":"52pcs Pack","price":13754,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/11/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":59,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":11738,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/12/2017 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":60,"username":"Muhammad","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"frozen","desc":"52pcs Pack","price":12181,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/1/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":61,"username":"Asif","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"frozen","desc":"52pcs Pack","price":12965,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/2/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":62,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":19990,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/3/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":63,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":23125,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/4/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":64,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"beverages","desc":"52pcs Pack","price":23541,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/5/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":65,"username":"Shahbaz","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"noodles-sauces","desc":"52pcs Pack","price":21247,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/6/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":66,"username":"Iftikhar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"frozen","desc":"52pcs Pack","price":15189,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/7/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":67,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"noodles-sauces","desc":"52pcs Pack","price":14767,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/8/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":68,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":10895,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/9/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":69,"username":"Shaheen","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":17130,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/10/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":70,"username":"harry","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"laundry-household","desc":"52pcs Pack","price":17697,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/11/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":71,"username":"Shaheen","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baking-cooking","desc":"52pcs Pack","price":16611,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/12/2018 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":72,"username":"harry","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":12674,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/1/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":73,"username":"Asif","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":12760,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/2/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":74,"username":"Shadab","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":20249,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/3/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":75,"username":"Babar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":22135,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/4/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":76,"username":"Shahbaz","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"breakfast-dairy","desc":"52pcs Pack","price":20677,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/5/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":77,"username":"Shaheen","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"laundry-household","desc":"52pcs Pack","price":19933,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/6/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":78,"username":"Shaheen","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"laundry-household","desc":"52pcs Pack","price":15388,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/7/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":79,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":15113,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/8/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":80,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":13401,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/9/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":81,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":16135,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/10/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":82,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baking-cooking","desc":"52pcs Pack","price":17562,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/11/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":83,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"noodles-sauces","desc":"52pcs Pack","price":14720,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/12/2019 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":84,"username":"Server","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"noodles-sauces","desc":"52pcs Pack","price":12225,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/1/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":85,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"pet-food","desc":"52pcs Pack","price":11608,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/2/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":86,"username":"Babar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"pet-food","desc":"52pcs Pack","price":20985,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/3/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":87,"username":"Iftikhar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":19692,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/4/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":88,"username":"Server","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"pet-food","desc":"52pcs Pack","price":24081,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/5/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":89,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":22114,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/6/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":90,"username":"Shaheen","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"health-beauty","desc":"52pcs Pack","price":14220,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/7/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":91,"username":"harry","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":13434,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/8/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":92,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":13598,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/9/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":93,"username":"Hassan","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"noodles-sauces","desc":"52pcs Pack","price":17187,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/10/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":94,"username":"Asif","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":16119,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/11/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":95,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":13713,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/12/2020 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":96,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"herbal-nutrition","desc":"52pcs Pack","price":13210,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/1/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":97,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":14251,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/2/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":98,"username":"Sureh","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"laundry-household","desc":"52pcs Pack","price":20139,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/3/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":99,"username":"Shadab","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"beverages","desc":"52pcs Pack","price":21725,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/4/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":100,"username":"rauf","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baking-cooking","desc":"52pcs Pack","price":26099,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/5/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":101,"username":"Muneeb","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baby-care","desc":"52pcs Pack","price":21084,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/6/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":102,"username":"Iftikhar","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"frozen","desc":"52pcs Pack","price":18024,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/7/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":103,"username":"Shadab","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"grocery-staples","desc":"52pcs Pack","price":16722,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/8/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":104,"username":"Shadab","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"noodles-sauces","desc":"52pcs Pack","price":14385,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/9/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":105,"username":"Shahbaz","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"biscuits-snacks-chocolates","desc":"52pcs Pack","price":21342,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/10/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":106,"username":"Shadab","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"baking-cooking","desc":"52pcs Pack","price":17180,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/11/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]},{"_id":107,"username":"Shaheen","orders":[{"account":"sb-s43hex17576405@personal.example.com","assembled_at":"4/11/2022 2:18:35","assembler":"625a5d8cdb5d8c5b94e1c402","carried_at":"-","carrier":"6363a8ea30edce0e6004cda4","items":[{"category":"frozen","desc":"52pcs Pack","price":14577,"qty":1,"title":"Lemon"}],"orderNo":2,"placed_at":"15/12/2021 23:12:41","status":"detected","transactionID":"803913045R714920N","_id":"62bc9619ccc2fb3e147da2f0"}]}]

if(!customers.length){
  alert('No data to show!')
  throw new Error('No data to show!')
}

document.querySelector('#month').addEventListener('click', (e)=>{
  document.querySelector('#From').remove()
  document.querySelector('#To').remove()
  document.querySelector('.from').insertAdjacentHTML('beforeend', `
    <input type='month' class="form-control-sm" id='From' value='${fromYear}-${fromMonth}'>
  `)
  document.querySelector('.to').insertAdjacentHTML('beforeend', `
    <input type='month' class="form-control-sm" id='To' value='${toYear}-${toMonth}'>
  `)

  document.querySelector('#From').addEventListener('change', (e)=>{
    fromYear = e.target.value.split('-')[0]
    fromMonth = e.target.value.split('-')[1]
  })
  document.querySelector('#To').addEventListener('change', (e)=>{
    toYear = e.target.value.split('-')[0]
    toMonth = e.target.value.split('-')[1]
  })
})

document.querySelector('#year').addEventListener('click', (e)=>{
  document.querySelector('#From').remove()
  document.querySelector('#To').remove()
  document.querySelector('.from').insertAdjacentHTML('beforeend', `
    <input type='number' id="From" class="form-control-sm" value='${fromYear}' min='2000' max='2100'>
  `)
  document.querySelector('.to').insertAdjacentHTML('beforeend', `
    <input type='number' id="To" class="form-control-sm" value='${toYear}' min='2000' max='2100'>
  `)

  document.querySelector('#From').addEventListener('change', (e)=>{
    fromYear = e.target.value
  })
  document.querySelector('#To').addEventListener('change', (e)=>{
    toYear = e.target.value
  })
})

let forecastSales = []
let sales = []

customers.forEach((customer)=>{
  customer.orders.forEach((order)=>{
    let d = order.placed_at.split('/')
    order_date = `${d[1]}/${(d[2].split(' ')[0])[2]}${(d[2].split(' ')[0])[3]}`

    let order_total = order.items.reduce((val,item) => val + (Number(item.price)*Number(item.qty)), 0)
    
    let timespanFound = sales.find(object => object.timespan==order_date)
    if(timespanFound){
      timespanFound.purchase += order_total
    }
    else{
      sales.push({timespan: order_date, purchase: order_total})
    }
  })
})

sales.sort((a,b) => new Date(Number(`20${a.timespan.split('/')[1]}`), Number(`${a.timespan.split('/')[0] - 1}`)) - new Date(Number(`20${b.timespan.split('/')[1]}`), Number(`${b.timespan.split('/')[0] - 1}`)))
let yy = Number(sales[0].timespan.split('/')[1])
let mm = Number(sales[0].timespan.split('/')[0])

while(sales[sales.length-1].timespan!=`${mm}/${yy}`){
  if(mm==12){mm=1; yy++}
  else mm++
  if(!sales.find(object => object.timespan==`${mm}/${yy}`)) sales.unshift({timespan:`${mm}/${yy}`, purchase:0})
}
sales.sort((a,b) => new Date(Number(`20${a.timespan.split('/')[1]}`), Number(`${a.timespan.split('/')[0] - 1}`)) - new Date(Number(`20${b.timespan.split('/')[1]}`), Number(`${b.timespan.split('/')[0] - 1}`)))
let avgSales = sales.reduce((val,object)=> val+object.purchase,0) / sales.length

let customerData = []

customers.forEach((customer)=>{
  customer.orders.forEach((order)=>{
    let d = order.placed_at.split('/')
    order_date = `${d[1]}/${(d[2].split(' ')[0])[2]}${(d[2].split(' ')[0])[3]}`

    let order_total = order.items.reduce((val,item) => val + (Number(item.price)*Number(item.qty)), 0)
    
    let customerFound = customerData.find(object => object.customer._id==customer._id)
    if(customerFound){
      let timespanFound = customerFound.orders.find(object => object.timespan==order_date)
      if(timespanFound){
        timespanFound.purchase += order_total
      }
      else{
        customerFound.orders.push({timespan: order_date, purchase: order_total})
      }
    }
    else{
      customerData.push({customer: {_id:customer._id, username:customer.username}, orders: [{timespan: order_date, purchase: order_total}]})
    }
  })
})

customerData.sort((b,a)=> a.orders.reduce((val,doc)=> val+doc.purchase,0)-b.orders.reduce((val,doc)=> val+doc.purchase,0))
let topCustomers = customerData.slice(0,10)
shuffle(topCustomers)

let categoryDiv = []

customers.forEach((customer)=>{
  customer.orders.forEach((order)=>{
    let d = order.placed_at.split('/')
    order_date = `${d[1]}/${(d[2].split(' ')[0])[2]}${(d[2].split(' ')[0])[3]}`

    order.items.forEach((item)=>{
      let item_total = Number(item.price) * Number(item.qty)
      
      let categoryFound = categoryDiv.find(object => object.category==item.category)
      if(categoryFound){
        let timespanFound = categoryFound.info.find(object => object.timespan==order_date)
        if(timespanFound){
          timespanFound.purchase += item_total
        }
        else{
          categoryFound.info.push({timespan: order_date, purchase: item_total})
        }
      }
      else{
        categoryDiv.push({category: item.category, info: [{timespan: order_date, purchase: item_total}]})
      }
    })
  })
})

let config = {responsive: true}
let data
let layout
let shapes

forecastSales = JSON.parse(JSON.stringify(sales))
data = [{
  x:sales.map((object)=>object.timespan),
  y:sales.map((object)=>object.purchase),
  type:"bar",
  marker: {color:"rgba(0,0,180,0.5)"},
  text: sales.map((object) => {
    let calc = ((object.purchase-avgSales)/avgSales)*100
    return calc>=0 ? `${calc.toFixed(2)}% above Avg` : `${Math.abs(calc).toFixed(2)}% below Avg` 
  })
}]

shapes = [{type: 'line', xref: 'paper', x0: 0, y0: avgSales, x1: 1, y1: avgSales, line: {color: 'rgba(0,0,180,0.5)', width: 1}}]
layout = {title:"Sales", font:{size: 12}, hoverlabel:{font: {color: 'white'}}, shapes:shapes}
Plotly.newPlot("s-bar", data, layout, config)

data = [{
  x:topCustomers.map((object)=>object.customer.username),
  y:topCustomers.map((object)=>object.orders.reduce((val,doc)=> val+doc.purchase,0)),
  type:"bar",
  marker: {color:"rgba(255,0,0,0.6)"}
}]

layout = {title:"Top Customers", font: {size: 12}, hoverlabel:{font: {color: 'white'}}}
Plotly.newPlot("c-bar", data, layout, config)

data = [{
  labels:categoryDiv.map(object => object.category.replaceAll('-',' ')), 
  values:categoryDiv.map(object => object.info.reduce((val,doc)=> val+doc.purchase,0)), 
  type:"pie",
  insidetextorientation: "horizontal", 
  textfont:{color:'white'}
}]

layout = {title:"Product Category", font: {size: 12}, hoverlabel:{font: {color: 'white'}}}
Plotly.newPlot("pie", data, layout, config)

document.querySelector('#From').value = `20${sales[0].timespan.split('/')[1]}-${String(sales[0].timespan.split('/')[0]).length==2 ? String(sales[0].timespan.split('/')[0]) : '0' + String(sales[0].timespan.split('/')[0])}`
document.querySelector('#To').value = `20${sales[sales.length-1].timespan.split('/')[1]}-${String(sales[sales.length-1].timespan.split('/')[0]).length==2 ? String(sales[sales.length-1].timespan.split('/')[0]) : '0' + String(sales[sales.length-1].timespan.split('/')[0])}`

let fromMonth = document.querySelector('#From').value.split('-')[1]
let toMonth = document.querySelector('#To').value.split('-')[1]
let fromYear = document.querySelector('#From').value.split('-')[0]
let toYear = document.querySelector('#To').value.split('-')[0]

document.querySelector('#From').addEventListener('change', (e)=>{
  fromYear = e.target.value.split('-')[0]
  fromMonth = e.target.value.split('-')[1]
})
document.querySelector('#To').addEventListener('change', (e)=>{
  toYear = e.target.value.split('-')[0]
  toMonth = e.target.value.split('-')[1]
})

document.querySelector('#saleSubmitBtn').addEventListener('click',(e)=>{
  if(new Date(document.querySelector('#From').value)=='Invalid Date' || new Date(document.querySelector('#To').value)=='Invalid Date' || new Date(document.querySelector('#To').value) - new Date(document.querySelector('#From').value) < 0){
    alert('Invalid Values')
  }
  else{
    let compareBy = document.querySelector('#month').checked ? 'month' : 'year'

    if(compareBy=='month'){
      let newSales = sales.filter(object => {
        let objectYear = `20${object.timespan.split('/')[1]}`
        let objectMonth = object.timespan.split('/')[0].length==2 ? object.timespan.split('/')[0] : `0${object.timespan.split('/')[0]}`
        return (new Date(`${objectYear}-${objectMonth}`) - new Date(`${fromYear}-${fromMonth}`) >= 0 && new Date(`${toYear}-${toMonth}`) - new Date(`${objectYear}-${objectMonth}`) >= 0)
      })
      avgSales = newSales.reduce((val,object)=> val+object.purchase,0) / newSales.length
   
      forecastSales = JSON.parse(JSON.stringify(newSales))
      data = [{
        x:newSales.map((object)=>object.timespan),
        y:newSales.map((object)=>object.purchase),
        type:"bar",
        marker: {color:"rgba(0,0,180,0.5)"},
        text: newSales.map((object) => {
          let calc = ((object.purchase-avgSales)/avgSales)*100
          return calc>=0 ? `${calc.toFixed(2)}% above Avg` : `${Math.abs(calc).toFixed(2)}% below Avg` 
        })
      }]
      
      shapes = [{type: 'line', xref: 'paper', x0: 0, y0: avgSales, x1: 1, y1: avgSales, line: {color: 'rgba(0,0,180,0.5)', width: 1}}]
      layout = {title:"Sales", font:{size: 12}, hoverlabel:{font: {color: 'white'}}, shapes:shapes}
      Plotly.newPlot("s-bar", data, layout, config)

      let newCustomerData = JSON.parse(JSON.stringify(customerData))
      newCustomerData.forEach(doc => {
        doc.orders = doc.orders.filter(object => {
          let objectYear = `20${object.timespan.split('/')[1]}`
          let objectMonth = object.timespan.split('/')[0].length==2 ? object.timespan.split('/')[0] : `0${object.timespan.split('/')[0]}`
          return (new Date(`${objectYear}-${objectMonth}`) - new Date(`${fromYear}-${fromMonth}`) >= 0 && new Date(`${toYear}-${toMonth}`) - new Date(`${objectYear}-${objectMonth}`) >= 0)
        })
      })

      newCustomerData.sort((b,a)=> a.orders.reduce((val,doc)=> val+doc.purchase,0)-b.orders.reduce((val,doc)=> val+doc.purchase,0))
      topCustomers = newCustomerData.slice(0,10)
      shuffle(topCustomers)

      data = [{
        x:topCustomers.map((object)=>object.customer.username),
        y:topCustomers.map((object)=>object.orders.reduce((val,doc)=> val+doc.purchase,0)),
        type:"bar",
        marker: {color:"rgba(255,0,0,0.6)"}
      }]
      
      layout = {title:"Top Customers", font: {size: 12}, hoverlabel:{font: {color: 'white'}}}
      Plotly.newPlot("c-bar", data, layout, config)
    
      let newCategoryDiv = JSON.parse(JSON.stringify(categoryDiv))
      newCategoryDiv.forEach(doc => {
        doc.info = doc.info.filter(object => {
          let objectYear = `20${object.timespan.split('/')[1]}`
          let objectMonth = object.timespan.split('/')[0].length==2 ? object.timespan.split('/')[0] : `0${object.timespan.split('/')[0]}`
          return (new Date(`${objectYear}-${objectMonth}`) - new Date(`${fromYear}-${fromMonth}`) >= 0 && new Date(`${toYear}-${toMonth}`) - new Date(`${objectYear}-${objectMonth}`) >= 0)
        })
      })
      
      data = [{
        labels:newCategoryDiv.map(object => object.category.replaceAll('-',' ')), 
        values:newCategoryDiv.map(object => object.info.reduce((val,doc)=> val+doc.purchase,0)), 
        type:"pie",
        insidetextorientation: "horizontal", 
        textfont:{color:'white'}
      }]
      
      layout = {title:"Product Category", font: {size: 12}, hoverlabel:{font: {color: 'white'}}}
      Plotly.newPlot("pie", data, layout, config)
    }
    else if(compareBy=='year'){
      let newSales = sales.filter(object => {
        let objectYear = `20${object.timespan.split('/')[1]}`
        return Number(objectYear) - Number(fromYear) >= 0 &&  Number(toYear) - Number(objectYear) >= 0
      })

      let temp = []
      newSales.forEach(object => {
        let yearFound = temp.find(tempObject => tempObject.timespan==object.timespan.split('/')[1])
        if(yearFound){
          yearFound.purchase += object.purchase
        }
        else{
          temp.push({timespan:object.timespan.split('/')[1], purchase: object.purchase})
        }
      })

      temp.forEach(tempObject => tempObject.timespan = `20&#8205;${tempObject.timespan}`)
      newSales = temp
      avgSales = newSales.reduce((val,object)=> val+object.purchase,0) / newSales.length

      forecastSales = JSON.parse(JSON.stringify(newSales))
      data = [{
        x:newSales.map((object)=>object.timespan),
        y:newSales.map((object)=>object.purchase),
        type:"bar",
        marker: {color:"rgba(0,0,180,0.5)"},
        text: newSales.map((object) => {
          let calc = ((object.purchase-avgSales)/avgSales)*100
          return calc>=0 ? `${calc.toFixed(2)}% above Avg` : `${Math.abs(calc).toFixed(2)}% below Avg` 
        })
      }]
      
      shapes = [{type: 'line', xref: 'paper', x0: 0, y0: avgSales, x1: 1, y1: avgSales, line: {color: 'rgba(0,0,180,0.5)', width: 1}}]
      layout = {title:"Sales", font:{size: 12}, hoverlabel:{font: {color: 'white'}}, shapes:shapes}
      Plotly.newPlot("s-bar", data, layout, config)

      let newCustomerData = JSON.parse(JSON.stringify(customerData))
      newCustomerData.forEach(doc => {
        doc.orders = doc.orders.filter(object => {
          let objectYear = `20${object.timespan.split('/')[1]}`
          return Number(objectYear) - Number(fromYear) >= 0 &&  Number(toYear) - Number(objectYear) >= 0
        })
      })

      newCustomerData.sort((b,a)=> a.orders.reduce((val,doc)=> val+doc.purchase,0)-b.orders.reduce((val,doc)=> val+doc.purchase,0))
      topCustomers = newCustomerData.slice(0,10)
      shuffle(topCustomers)

      data = [{
        x:topCustomers.map((object)=>object.customer.username),
        y:topCustomers.map((object)=>object.orders.reduce((val,doc)=> val+doc.purchase,0)),
        type:"bar",
        marker: {color:"rgba(255,0,0,0.6)"}
      }]
      
      layout = {title:"Top Customers", font: {size: 12}, hoverlabel:{font: {color: 'white'}}}
      Plotly.newPlot("c-bar", data, layout, config)

      let newCategoryDiv = JSON.parse(JSON.stringify(categoryDiv))
      newCategoryDiv.forEach(doc => {
        doc.info = doc.info.filter(object => {
          let objectYear = `20${object.timespan.split('/')[1]}`
          return Number(objectYear) - Number(fromYear) >= 0 &&  Number(toYear) - Number(objectYear) >= 0
        })
      })
      
      data = [{
        labels:newCategoryDiv.map(object => object.category.replaceAll('-',' ')), 
        values:newCategoryDiv.map(object => object.info.reduce((val,doc)=> val+doc.purchase,0)), 
        type:"pie",
        insidetextorientation: "horizontal", 
        textfont:{color:'white'}
      }]
      
      layout = {title:"Product Category", font: {size: 12}, hoverlabel:{font: {color: 'white'}}}
      Plotly.newPlot("pie", data, layout, config)
    }
  }
})

function shuffle(array){
  for(let i=array.length-1; i>0; i--){
    let j = Math.floor(Math.random() * (i + 1))

    let temp = JSON.parse(JSON.stringify(array[i]))
    array[i] = JSON.parse(JSON.stringify(array[j]))
    array[j] = JSON.parse(JSON.stringify(temp))
  }
}

document.querySelector('#saleForecastBtn').addEventListener('click', (e)=>{
  if(new Date(document.querySelector('#From').value)=='Invalid Date' || new Date(document.querySelector('#To').value)=='Invalid Date' || new Date(document.querySelector('#To').value) - new Date(document.querySelector('#From').value) < 0){
    alert('Invalid Values')
  }
  else{
    let win = window.open("", "Title", "") 
    win.document.write(`
    <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Blackcreek</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
          <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js" integrity="sha384-GqVMZRt5Gn7tB9D9q7ONtcp4gtHIUEW/yG7h98J7IpE3kpi+srfFyyB/04OV6pG0" crossorigin="anonymous"></script>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i" rel="stylesheet">  
          <link rel="stylesheet" href="forecast.css">   
        </head>

        <body>
            <div id='forecastSales' payload='${JSON.stringify(forecastSales)}'></div>

            <div class="outer-padding py-md-5">
              <div class="container-fluid p-1 d-flex flex-column align-items-center">
                <div id='initial-chart'></div>
              </div>
            </div>            
        </body>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        <script>$('[data-toggle="tooltip"]').tooltip()</script>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        <script src='https://unpkg.com/axios/dist/axios.min.js'></script>
        <script src='/scripts/forecast.js'></script>
    </html>`)
  }
})