const collegeapi = require('../services/college_api')
const express = require('express');
const router = express.Router();


/**
 * Post controller for getting a list of colleges that match a specific set of filters
 * 
 * @param req   - an object containing the filters and sorting for the college search
 *                All individual filter and sorting parameters are optional, but should be in the form:
{
    filters : {
        'school.name': 'name',                                          // name of school, can only be used to search for specific school
        'school.city': ['Buffalo'],                                     // Value list. Name of city or cities to search for schools in
        'school.state': ['NY'],                                         // Value list. Name of state(s) to search for schools in
        'zip': 15090,                                                   // Zip code to search for schools within a certain range of
        'dist': '10mi',                                                 // Distance from zip code to find schools
        'school.locale': ['Midsize City'],                              // Value list. Urbanization of school setting. See dictionary for values
        'school.region_id': ['Mideast'],                                // Value list. Geographic region of school. See dictionary for values
        'admissions.admission_rate.overall': ['r,', 50, 80],
        'admissions.sat_scores': {                                      // Sat scores
            percentile: '75th_percentile',                              // percentile to base results on (25th_percentile, midpoint, or 75th_percentile)
            categories: [
                {
                    critical_reading: ['r,', 200, 300],                       // Range. SAT critical reading score range
                    math: ['r,', 500,600],                                    // Range. SAT math score range
                    writing: ['r,', 200,300]                                  // Range. SAT writing score range
                }
            ]                                                           
        },                                                              
        'admissions.act_scores.midpoint.cumulative': ['r,', 30, 33],          // Range. 50th percentile ACT cumalitive score
        'latest.student.size': ['r,', 20000, 25000],                                 // Range. Undergraduate enrollment
        'latest.cost.avg_net_price.public': ['r,', 10000, 20000],             // Range. Avg net price for public institutions
        'latest.cost.avg_net_price.private': ['r,', 10000, 20000],            // Range. Avg net price for private institutions
        'latest.cost.tuition.in_state': ['r,', 10000, 20000],                 // Range. In state tuition
        'latest.cost.tuition.out_of_state': ['r,', 10000, 20000],             // Range. Out of state tuition
        'completion.completion_rate_4yr_150nt_pooled': ['r,', 80, 90],        // Range. Completion percentage (simply put)
        'admissions.test_requirements': ["Required", "Recommended"],    // Value List. options are: Required (1), Recommended (2), 
                                                                        // Neither required nor recommended (3), Do not know (4),
                                                                        // Considered but not required (5)

        'page': 1,                                                      // which page of results is returned
        'per_page': 20                                                  // number of results to return per page, max 100                                        
        'area of study': ['Agriculture']                                 // field of study to check that they have, see data dictionary for values - NOT INDEXABLE
        'retention_rate.four_year.full_time': ['r,', 50,70]                   // Range. retention rate - NOT INDEXABLE
        'rank': [1, 30]                                              // Range, general ranking of schools to show - NOT IN API, ADDED AFTER MANUALLY
    },
    sort: {
        'asc': true,                                                    // boolean value for whether to sort ascending or descending
        'sortby': 'school.name'                                         // What value to sort by, can be any one of the filter parameters
    },
}
 *        
 * @return - The response returned by the api, containing the fields:
 *      latest.cost.avg_net_price.public (or private),
 *      
 */
const collegeSearchPost = async (req, res) => {
    // define what fields we want to return
    const fields_list = [
        'school.name', 
        'school.city', 
        'school.state', 
        'latest.student.size',
        'latest.admissions.admission_rate.overall',
        'latest.cost.avg_net_price.public',
        'latest.cost.avg_net_price.private']


    // get and initialize variables
    const body = req.body;
    var filters = body.filters;
    var sort = body.sort;
    var param_string = "";

    // convert filters into param string
    for (var [filter, val] of Object.entries(filters)){
        if (filter == 'rank') {
            continue;
        } else if (filter === 'admissions.sat_scores') {
            continue;
        }

        // add filter category and = sign
        param_string += filter;

        // add data based
        // is it a single item?
        if (!Array.isArray(val)) {
            // add value to string normally
            param_string += '=';
            param_string += val;
        }
        // is it a range?
        else if (val[0] === 'r') {
            // add values using range operators
            param_string += '__range=';
            param_string += `${val[1]}..${val[2]}`;
        }
        // is it a value list? 
        else {
            // add all values with commas between them
            param_string += '=';
            for (let j=0; j<val.length; j++) {
                param_string += val[j];

                if (j !== val.length-1) {
                    param_string += ',';
                }
            }
        }

        // add andpersand for next filter
        param_string += '&';
    }

    // add sorting to string
    if (sort && sort.sortby !== "rank") {
        param_string += `sort=${sort.sortby}:`
        param_string += sort.asc ? "asc" : "desc"
        param_string += "&"
    }


    // add fields to string
    param_string += "fields="
    for (let i=0; i<fields_list.length; i++) {
        param_string += fields_list[i];

        if (i !== fields_list.length-1) {
            param_string += ',';
        }
    }

    //console.log(param_string);

    const search_results = await collegeapi.getCollegeList(param_string)
    //console.log(search_results)

    res.json(search_results);
    res.send()
}



const topCollegesPost = async (req, res) => {
    collegeapi.getTopColleges();
}



/**
 * Post controller for detailed information about a single college
 * 
 * @param req   - an object containing the name (or id?) of the college to get information about
 * @return - the response from the api call containing pretty much all of the fields that are included in the filters for collegeSearchPost
 */
const singleCollegePost = async (req, res) => {
    const school_name = req.body.school_name
    const fields_list = ['id','school.name', 'school.city', 'school.state', 'school.locale', 'school.region_id', 'latest.admissions.admission_rate.overall',
                         'latest.admissions.sat_scores.75th_percentile.critical_reading', 'latest.admissions.sat_scores.75th_percentile.math', 
                         'latest.admissions.sat_scores.75th_percentile.writing', 'latest.admissions.sat_scores.midpoint.critical_reading',
                         'latest.admissions.sat_scores.midpoint.math', 'latest.admissions.sat_scores.midpoint.writing', 'latest.admissions.act_scores.midpoint.cumulative',
                         'latest.admissions.act_scores.75th_percentile.cumulative', 'latest.admissions.act_scores.midpoint.english', 'latest.admissions.act_scores.75th_percentile.english',
                         'latest.admissions.act_scores.midpoint.writing', 'latest.admissions.act_scores.75th_percentile.writing', 'latest.admissions.sat_scores.average.overall',
                         'latest.earnings.1_yrs_after_completion.not_working_not_enrolled.overall', 'latest.earnings.1_yrs_after_completion.working_not_enrolled.overall', 
                         'latest.earnings.5_yrs_after_completion.not_working_not_enrolled.overall', 'latest.earnings.5_yrs_after_completion.working_not_enrolled.overall',
                         'latest.student.size', 'latest.cost.avg_net_price.public', 'latest.cost.avg_net_price.private', 'latest.cost.attendance.academic_year',
                         'latest.cost.tuition.in_state', 'latest.cost.tuition.out_of_state', 'latest.completion.completion_rate_4yr_150nt_pooled', 
                         'latest.completion.completion_rate_4yr_150nt', 'latest.admissions.test_requirements', 'school.school_url', 'school.price_calculator_url', 
                         'latest.retention_rate.four_year.full_time'
                        ]

    const fields_string = ""
    for (i=0; i<fields_list.length; i++) {
        fields_string += fields_list[i]
        if (i != fields_list.length-1) {
            fields_string += ','
        }
    }
    

    try {
        res.json(collegeapi.getSingleCollegeData(school_name, fields_string))
        res.send()
    } catch (e) {
        res.send(e)
    }
}


router.post("/", collegeSearchPost);
router.post("/top", topCollegesPost);
router.post("/college", singleCollegePost)

module.exports = router;