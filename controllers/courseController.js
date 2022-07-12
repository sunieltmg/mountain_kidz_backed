import express from 'express';

// controller to get all course
export const getAllCourses = async (req, res) => {
  res.json('get all course');
};

// controller to create new course
export const createNewCourse = async (req, res) => {
  res.json('create new course');
};

// controller to update course
export const updateCourse = async (req, res) => {
  res.json('Update course');
};

// controller to delete course
export const deleteCourse = async (req, res) => {
  res.json('delete course');
};

// controller to get single course
export const getSingleCourse = (req, res) => {
  res.json('get single course');
};

