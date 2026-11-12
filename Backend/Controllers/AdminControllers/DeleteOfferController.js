import Offer from "../../models/offer.js";

// Delete an offer
export function deleteOffer(req, res) {

    const { id } = req.params;

    Offer.findByIdAndDelete(id)
        .then((offer) => {

            if (!offer) {
                return res.status(404).json({
                    message: "Offer not found"
                });
            }

            res.status(200).json({
                message: "Offer deleted successfully",
                offer: offer
            });

        })
        .catch((error) => {

            res.status(500).json({
                message: "Error deleting offer",
                error: error.message
            });

        });

}