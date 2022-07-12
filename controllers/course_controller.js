import express from 'express';
import { Course } from '../models/course_model.js';

// controller to get all course
export const getAllCourses = (req, res) => {
  try {
    Course.find();
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

// controller to add new course
export const postCourse = async (req, res, next) => {


  try {
    const course = new Course(req.body);
    await course.save();
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};


