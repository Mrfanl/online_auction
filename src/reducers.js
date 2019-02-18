import {combineReducers} from 'redux';

import { user } from './redux/user.redux';
import { actionlist } from './redux/actionlist.redux';
import { auction } from './redux/auction.redux';
import { auctionhistory } from './redux/auctionhistory.redux';

export default combineReducers({user,actionlist,auction,auctionhistory,})
