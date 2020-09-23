const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
  name: Joi.string().required(),
  subdomain: Joi.string().required().min(4),
  admin_email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  target_config_id: Joi.number().required(),
  admin_password: Joi.string().trim().min(5).required(),
  admin_firstname: Joi.string().required(),
  admin_lastname: Joi.string().required(),
  admin_phone: Joi.required(),
  active: Joi.boolean().required(),
});

const loginSchema = Joi.object({
  admin_email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .required(),
  admin_password: Joi.string().trim().min(5).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
