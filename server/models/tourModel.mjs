import { pool } from "../db/postgresConnection.mjs";

const tourModel = {
    createTour: async (tourData) => {
        try {
            const { title, image, duration, price, category } = tourData;
            const result = await pool.query(
                "INSERT INTO tours (title, image, duration, price, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [title, image, duration, price, category]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateTour: async (tourId, updatedFields) => {
        try {
            // Create the query's set fields and values
            const setFields = Object.keys(updatedFields)
                .map((key, i) => `${key} = $${i + 1}`)
                .join(", ");

            const values = [...Object.values(updatedFields), tourId]; // Correct order of values

            const result = await pool.query(
                `UPDATE tours SET ${setFields} WHERE id = $${values.length} RETURNING *`,
                values
            );

            if (result.rowCount === 0) {
                // No project found with the given ID
                throw new Error("Project not found");
            }

            return result.rows[0]; // Return the updated project
        } catch (error) {
            console.error("Error in updateTour:", error.message);
            throw error;
        }
    },
    deleteTour: async (id) => {
        try {
            const query = "DELETE FROM tours WHERE id = $1";
            const result = await pool.query(query, [id]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default tourModel;