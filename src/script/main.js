import '../../vendor/jq.js';
import '../../vendor/bootstrap.bundle.min.js';
import '../../vendor/datatables.js'
import {initializeFormValidation} from '../util/util.js'

if (window.jQuery) {

    console.log('JQ LOADED');
    initializeFormValidation()
    
} else {

    console.log("jQuery is NOT loaded");
}