/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
    if(!config.seedDB) {
        return Promise.resolve();
    }


    let promises = [];

    let thingPromise = Thing.find({}).remove()
        .then(() => Thing.create({
            name: 'USDT',
            info: ' '
                
        }, {
            name: 'Wave',
            info: ''
        }, {
            name: 'ETH',
            info: ' '
                  
        }, {
            name: 'Orange Money',
            info: ''
        }, {
            name: 'SOL',
            info: ' '
        }, {
            name: 'BNB',
            info: ''
        }))
        .then(() => console.log('finished populating things'))
        .catch(err => console.log('error populating things', err));
    promises.push(thingPromise);

    let userPromise = User.find({}).remove()
        .then(() => User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin'
        })
            .then(() => console.log('finished populating users'))
            .catch(err => console.log('error populating users', err)));
    promises.push(userPromise);

    return Promise.all(promises);
}
