const Joi = require('joi');

const createJobSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).required(),
  skills: Joi.string().optional(),
  salary_min: Joi.number().min(0).optional(),
  salary_max: Joi.alternatives().try(
    Joi.number().min(Joi.ref('salary_min')),
    Joi.number().min(0)
  ).optional().messages({ 'number.min': 'salary_max must be greater than or equal to salary_min' }),
  salary_range: Joi.alternatives().try(
    Joi.string().pattern(/^\s*\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?\s*$/).messages({ 'string.pattern.base': 'salary_range must be in the format "min-max"' }),
    Joi.object({ min: Joi.number().min(0).required(), max: Joi.number().min(Joi.ref('min')).required() })
  ).optional(),
  location: Joi.string().max(200).optional(),
  job_type: Joi.string().valid('Full-time', 'Part-time', 'Contract', 'Internship').required(),
  department: Joi.string().max(100).optional(),
  experience: Joi.string().max(50).optional(),
  experience_required: Joi.string().max(100).optional(),
  requirements: Joi.string().optional(),
  expiry_date: Joi.date().optional(),
  status: Joi.string().valid('Active', 'Closed', 'Draft').optional(),
});

const updateJobSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  description: Joi.string().min(10).optional(),
  skills: Joi.string().optional(),
  salary_min: Joi.number().min(0).optional(),
  salary_max: Joi.alternatives().try(
    Joi.number().min(Joi.ref('salary_min')),
    Joi.number().min(0)
  ).optional().messages({ 'number.min': 'salary_max must be greater than or equal to salary_min' }),
  salary_range: Joi.alternatives().try(
    Joi.string().pattern(/^\s*\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?\s*$/).messages({ 'string.pattern.base': 'salary_range must be in the format "min-max"' }),
    Joi.object({ min: Joi.number().min(0).required(), max: Joi.number().min(Joi.ref('min')).required() })
  ).optional(),
  location: Joi.string().max(200).optional(),
  job_type: Joi.string().valid('Full-time', 'Part-time', 'Contract', 'Internship').optional(),
  department: Joi.string().max(100).optional(),
  experience: Joi.string().max(50).optional(),
  experience_required: Joi.string().max(100).optional(),
  requirements: Joi.string().optional(),
  expiry_date: Joi.date().optional(),
  status: Joi.string().valid('Active', 'Closed', 'Draft').optional(),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, convert: true });
    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }
    next();
  };
};

module.exports = {
  validateCreateJob: validate(createJobSchema),
  validateUpdateJob: validate(updateJobSchema),
};

