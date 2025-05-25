import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Software } from "../entities/Software.entity";

const softwareRepository = AppDataSource.getRepository(Software);

type SoftwareInfo = {
    name: string;
    description: string;
    accessLevels: string[];
}

export const addSoftware = async (req: Request<{}, {}, SoftwareInfo>, res: Response) => {
    if(req.user?.role !== "Admin") {
        res.status(401).json({
            message: "Unauthorized",
        });
        return;
    }

    const { name, description, accessLevels } = req.body;

    try {
        if (!name || !description || !accessLevels) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }

        const newSoftware = softwareRepository.create({
            name,
            description,
            accessLevels
        });

        await softwareRepository.save(newSoftware);

        res.status(201).json({
            id: newSoftware.id,
            name,
            description,
            accessLevels
        });
    } catch (error) {
        console.error("Error in signup controller:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllSoftwares = async (_req: Request, res: Response) => {
    try {
        const allSoftwares = await softwareRepository.find({ });

        res.status(200).json({
            message: "Software list retrieved successfully",
            softwares: allSoftwares
        });
    } catch (error) {
        console.error("Error in getAllSoftwares controller:", error instanceof Error ? error.message : "Unknown error");
        res.status(500).json({ message: "Internal Server Error" });
    }
};