import express from 'express';
import courseModel from '../models/Course.js';

// controller to get all course
export const getAllCourses = async (req, res) => {
  try {
    const allCourse = await courseModel.find().limit(10);
    return res.status(200).json(allCourse);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// controller to get single course
export const getSingleCourse = async (req, res) => {
  try {
    const singleCourse = await courseModel.findOne({ _id: req.params.id });
    return res.status(200).json(singleCourse);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// controller to create new course
export const createNewCourse = async (req, res) => {
  // check all fields are filled or not
  if (!req.body.title || !req.body.description || !req.body.image) {
    return res.status(400).json('all fields are required');
  }
  try {
    // check course exists or not
    const matchCourse = await courseModel.findOne({ title: req.body.title });
    if (matchCourse) {
      return res.status(400).json({ message: 'course already exists' });
    } else {
      const newCourse = await courseModel.create(req.body);
      return res
        .status(201)
        .json({ success: 'new course created successfully.' });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// controller to update course
export const updateCourse = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.image) {
    return res.status(400).json('all fields are required');
  }
  try {
    await courseModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          image: req.body.image,
        },
      }
    );
    return res.status(200).json({ success: 'course updated successfully' });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

// controller to delete all of the course
export const deleteCourse = async (req, res) => {
  try {
    await courseModel.remove();
    return res.status(200).json({
      success: 'all course deleted successfully',
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
};

// controller to delete single course
export const deleteSingleCourse = async (req, res) => {
  try {
    await courseModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({ success: 'course deleted successfully' });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
