import tourModel from "../models/tourModel.mjs";

const toursController = {
    createTour: async (req, res) => {
        try {
            const tour = await tourModel.createTour(req.body);
            res.status(201).json(tour);
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occured while creating the tour" });
        }
    },

    updateTour: async (req, res) => {
        try {
            const tourId = req.params.id;
            const tour = await tourModel.updateTour(tourId, req.body);
            res.status(200).json(tour);
        } catch (error) {
            if (error.message === "Tour not found") {
                res.status(404).json({ message: "Tour not found" });
            } else {
                res
                    .status(500)
                    .json({ message: "An error occurred while updating the tour" });
            }
        }
    },
    deleteTour: async (req, res) => {
        try {
            const tourId = req.params.id;
            const deletedTour = await tourModel.deleteTour(tourId);
            if (!deletedTour) {
                return res.status(404).json({ message: "Tour not found" });
            }
            res
                .status(200)
                .json({ message: "Tour deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};

export default toursController;