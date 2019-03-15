import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const SimpleSchema = require("simpl-schema").default

Meteor.startup(() => {
    Accounts.validateNewUser((user) => {
        const email = user.emails[0].address;

        try {
            new SimpleSchema({
                email: {
                    type: String,
                    regEx: SimpleSchema.RegEx.Email
                }
            }).validate({ email });
        } catch (err) {
            throw new Meteor.Error(400, err.message);
        }

        return true;
    });
});
