import Offer from "../../models/offer.js";

// Fetch offers or add a new offer
export function postOffer(req, res) {

    // Fetch all offers
    if (req.body.action === "get") {

        Offer.find()
            .then((offers) => {

                res.status(200).json(offers);

            })
            .catch((error) => {

                res.status(500).json({
                    message: "Error fetching offers",
                    error: error.message
                });

            });

    }

    // Add a new offer
    else {

        const { name, description, discount, status } = req.body;

        const newOffer = new Offer({
            name: name,
            description: description,
            discount: Number(discount),
            status: status
        });

        newOffer.save()
            .then((offer) => {

                res.status(201).json({
                    message: "Offer added successfully",
                    offer: offer
                });

            })
            .catch((error) => {

                res.status(500).json({
                    message: "Error adding offer",
                    error: error.message
                });

            });

    }

}