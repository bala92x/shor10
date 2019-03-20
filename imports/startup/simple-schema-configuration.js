import { Meteor } from 'meteor/meteor';

const SimpleSchema = require("simpl-schema").default;

SimpleSchema.defineValidationErrorTransform((error) => {
    return new Meteor.Error(400, error.message);
});