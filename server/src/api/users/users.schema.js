const Joi = require('@hapi/joi');

const schemaEdit = Joi.object({
  name: Joi.string(),
  subdomain: Joi.string().min(4),
  admin_password: Joi.string().trim().min(5),
  target_config_id: Joi.number(),
  admin_email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: false },
  }),
  admin_firstname: Joi.string(),
  admin_lastname: Joi.string(),
  admin_phone: Joi.number(),
  active: Joi.boolean(),
});

const schemaNew = Joi.object({
  name: Joi.string().required(),
  subdomain: Joi.string().min(4).required(),
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
  admin_phone: Joi.number().required(),
  active: Joi.boolean().required(),
});

module.exports = {
  schemaEdit,
  schemaNew,
};
