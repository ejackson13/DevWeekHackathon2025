const axios = require("axios");
const fs = require("fs")
const parse = require('csv-parse/sync')

const BASE_URL = `https://api.data.gov/ed/collegescorecard/v1/schools?api_key=${process.env.API_KEY}&`;


/**
 * Function to get a list of colleges with some basic information about each based on the given filters and sorting info
 * Primary api interface for search feature
 * 
 * @param param_string -  a string containing the parameters that will be appended to the end of the base url
 *                  Should look something like: 'school.name=Harvard University&page=1&per_page=1&fields=id,school.name,latest.student.size'
 *                  
 */
async function getCollegeList(param_string) {
    try {
        var response = axios.get(BASE_URL + param_string)
        return response
    } catch (e) {
        console.log(e)
        return e
    }
}


async function getTopColleges() {
    const data_string = fs.readFileSync('services/data.csv')
    const ranking_data = parse.parse(data_string, {
        columns: true,
        cast: true,
    })

}


/**
 * Function to get more detailed information about a single college
 * For use on college pages after clicking on a college during search
 * 
 * @param school_name   - a string containing the name of the school we want the information for - should be taken directly from the search results
 * @param fields        - a string containing the fields we want to retrieve separated by commas
 *                  
 */
async function getSingleCollegeData(school_name, fields) {
    try {
        var response = axios.get(BASE_URL + 'school.name=' + school_name + '&fields=' + fields)
        return response
    } catch (e) {
        console.log(e)
        return e
    }
}



module.exports = {
    getCollegeList,
    getTopColleges,
    getSingleCollegeData
}