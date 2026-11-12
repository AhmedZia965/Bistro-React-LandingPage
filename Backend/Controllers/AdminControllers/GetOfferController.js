import Offer from "../../models/offer.js";

// Get all offers
export function getOffers(req, res) {

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