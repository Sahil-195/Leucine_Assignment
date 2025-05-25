import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Request as RequestEntity } from "../entities/Request.entity";
import { Software } from "../entities/Software.entity";
import { User } from "../entities/User.entity";
import { stat } from "fs";

const requestRepository = AppDataSource.getRepository(RequestEntity);
const softwareRepository = AppDataSource.getRepository(Software);
const userRepository = AppDataSource.getRepository(User);


export const softwareAccessRequest = async (req: Request, res: Response) => {
  try {

    if (req.user?.role !== "Employee") {
      res.status(401).json({
        message: "Unauthorized",
      })
      return ;
    }

    const { softwareId, accessType, reason } = req.body;
    const userId = req.user?.id;
    // Validate required fields
    if (!softwareId || !accessType || !reason) {
      res.status(400).json({ message: "All fields are required" });
      return ;
    }

    // Validate access type
    if (!['Read', 'Write', 'Admin'].includes(accessType)) {
      res.status(400).json({ message: "Invalid access type" });
      return ;
    }

    // Check if user exists
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return ;
    }

    // Check if software exists
    const software = await softwareRepository.findOne({ where: { id: softwareId } });
    if (!software) {
      res.status(404).json({ message: "Software not found" });
      return ;
    }

    // Create new request
    const newRequest = requestRepository.create({
      user,
      software,
      accessType,
      reason,
      status: 'Pending'
    });

    await requestRepository.save(newRequest);

    res.status(201).json({
      message: "Software access request created successfully",
    });
  } catch (error) {
    console.error("Error creating software request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStatusWiseRequests = async (req: Request, res: Response) => {
  try {
    const requests = await requestRepository.find({
      relations: ['user', 'software']
    });

    const pendingRequests = requests
      .filter(request => request.status === 'Pending')
      .map(request => ({
        id: request.id,
        username: request.user.username,
        softwareName: request.software.name,
        accessType: request.accessType,
        reason: request.reason,
        status: request.status
      }));

    const notPendingRequests = requests
      .filter(request => request.status !== 'Pending')
      .map(request => ({
        id: request.id,
        username: request.user.username,
        softwareName: request.software.name,
        accessType: request.accessType,
        reason: request.reason,
        status: request.status
      }));

    res.status(200).json({
      pending: pendingRequests,
      notPending: notPendingRequests
    });
    return ;
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptOrRejectHandler = async (req: Request, res: Response) => {
  try {

    if (req.user?.role !== "Manager") {
      res.status(401).json({
        message: "Unauthorized",
      })
      return ;
    }

    const { id: requestId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['Approved', 'Rejected'].includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return ;
    }



    // Find the request
    const request = await requestRepository.findOne({
      where: { id: parseInt(requestId) },
    });

    if (!request) {
      res.status(404).json({ message: "Request not found" });
      return ;
    }

    // Update request status
    request.status = status;
    await requestRepository.save(request);

    res.status(200).json({
      message: `Request ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userSoftwareRequestsStatus = async (req: Request, res: Response) => {

  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return ;
    }

    const userId = req.user?.id;

    const requests = await requestRepository.find({
      where: {
        user: { id: userId }
      }
    });

    const status = {
      pending: 0,
      approved: 0,
      rejected: 0
    };

    requests.forEach((SoftwareRequest: RequestEntity) => {
      if (SoftwareRequest.status === 'Pending') {
        status.pending++;
      } else if (SoftwareRequest.status === 'Approved') {
        status.approved++;
      } else if (SoftwareRequest.status === 'Rejected') {
        status.rejected++;
      }
    });

    res.status(200).json(status);

  } catch (error) {
    console.error('Error in userSoftwareRequests:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

