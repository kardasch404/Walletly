const Joi = require('joi');

const UserPhotoUpdateSchema = Joi.object({
  image : Joi.string().allow(null).required(),
  userId : Joi.string().required(),
});

const validateUserPhotoUpdate = (data) => {
  const { error } = UserPhotoUpdateSchema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};


module.exports = { validateUserPhotoUpdate };