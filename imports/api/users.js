import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const SimpleSchema = require("simpl-schema").default;

Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    new SimpleSchema({
        email: {
            type: String,
            regEx: SimpleSchema.RegEx.Email
        }
    }).validate({ email });

    return true;
});