const Store = require('../models/Store');

class storeController {

    async addNewStore(req, res) {
        const { name, height, length, width, products = [] } = req.body;

        if(!name) return res.json({ failed: true, message: "Name is required!" });
        if(!height) return res.json({ failed: true, message: "Height is required!" })
        if(!length) return res.json({ failed: true, message: "Length is required!" })
        if(!width) return res.json({ failed: true, message: "Width is required!" })
        const quantity = products.length;

        const store = new Store({
            name,
            height,
            length,
            width,
            quantity,
            products
        })

        try{
            await store.save();
            return res.status(200).json({
                failed: false,
                message: "Store has been added successfuly"
            })
        } catch (e) {
            // error handler
        }
    }

    async addNewProduct(req, res) {
        const { storeId, manufacturer, name, number, purchase, shipment } = req.body;

        if(!storeId) return res.json({ failed: true, message: "ID of store is required!" });
        if (!storeId.match(/^[0-9a-fA-F]{24}$/)) return res.json({ failed: true, message: "Wrong ID" });
        if(!manufacturer) return res.json({ failed: true, message: "Manufacturer is required!" });
        if(!name) return res.json({ failed: true, message: "Name is required!" });
        if(!number) return res.json({ failed: true, message: "Number is required!" });
        if(!purchase) return res.json({ failed: true, message: "Purchase is required!" });
        if(!shipment) return res.json({ failed: true, message: "Shipment is required!" });

        const product = {
            manufacturer,
            name,
            number,
            shipment,
            purchase,
        }

        const oldProduct = await Store.findOne({ _id: storeId });
        if (oldProduct) {
            const listOfProducts = [...oldProduct.products];
            listOfProducts.push(product);

            let newProduct = await Store.updateOne(
                { _id: storeId, },
                { products: listOfProducts, quantity: listOfProducts.length}
            )

            newProduct = await Store.findOne({ _id: storeId });

            return res.json(newProduct)
        } else return res.json({
            failed: true,
            message: "Store hasn't been found"
        })

    }

    async getAllStores(req, res) {
        const allStores = await Store.find();
        if (allStores) return res.json(allStores);
        else return res.json({failed: true, message: "Couldn't get data"})
    }

    async getAllProducts(req, res) {
        const { storeId } = req.query;

        if(!storeId) return res.json({ failed: true, message: "ID of store is required!" });
        if (!storeId.match(/^[0-9a-fA-F]{24}$/)) return res.json({ failed: true, message: "Wrong ID" });

        const store = await Store.findOne({ _id: storeId });
        if (store) {
            return res.json(store.products)
        } else return res.json({
            failed: true,
            message: "Couldn't find the store with such ID"
        })
    }

}

module.exports = new storeController()