import { validateResult } from '../../../middlewares/validateResult'
import { body } from 'express-validator'
import regex from '../../../utils/regex'

export const validateSignIn = [
  body('email')
    .exists()
    .withMessage('El correo electrónico es requerido')
    .not()
    .isEmpty()
    .withMessage('El correo electrónico es requerido')
    .isEmail()
    .withMessage('El correo electrónico no es válido'),

  body('password')
    .exists()
    .withMessage('La contraseña requerida')
    .not()
    .isEmpty()
    .withMessage('La contraseña requerida')
    .isLength({
      min: 8
    })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(regex.password)
    .withMessage('La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un caracter especial'),

  validateResult

]
