const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop');
const auth = require('../middleware/auth');

// @route   GET /api/workshops
// @desc    Get all workshops
router.get('/', async (req, res, next) => {
  try {
    const workshops = await Workshop.find().populate('createdBy', 'name');
    res.json(workshops);
  } catch (err) { 
    next(err); 
  }
});

// @route   POST /api/workshops
// @desc    Create a new workshop (Admin only)
router.post('/', auth, async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    
    const newWorkshop = new Workshop({ 
      ...req.body, 
      createdBy: req.user.id 
    });
    const workshop = await newWorkshop.save();
    res.status(201).json(workshop);
  } catch (err) { 
    next(err); 
  }
});

// @route   PUT /api/workshops/:id/enroll
// @desc    Enroll in a workshop
router.put('/:id/enroll', auth, async (req, res, next) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) return res.status(404).json({ msg: 'Workshop not found' });
    
    if (workshop.attendees.length >= workshop.capacity) {
      return res.status(400).json({ msg: 'Workshop is at full capacity' });
    }

    if (workshop.attendees.includes(req.user.id)) {
      return res.status(400).json({ msg: 'You are already enrolled in this workshop' });
    }

    workshop.attendees.push(req.user.id);
    await workshop.save();
    res.json(workshop);
  } catch (err) { 
    next(err); 
  }
});

module.exports = router;