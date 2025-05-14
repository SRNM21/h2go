import '../../vendor/jq.js';
import '../../vendor/bootstrap.bundle.min.js';
import '../../vendor/datatables.js'
import {initializeFormValidation} from '../util/validation.js'

if (window.jQuery) 
{
    // ! FOR DEBUGGING / CHECKING OF CENTRALIZATION OF JS MODULES
    // console.log('JQ LOADED');

    initializeFormValidation()
} 
else 
{
    console.error("jQuery is NOT loaded")
}