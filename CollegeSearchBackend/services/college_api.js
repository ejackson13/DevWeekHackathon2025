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
 * @param alt - an object containing the other filters to filter data by that aren't indexable
 * @param ranked_sort - indicates that the results should be sorted by rank. If it is "asc" it will sort by ascending rank, if it is "desc" it will sort by descending rank, and if it is anything else it won't sort by rank 
 *                  
 */
async function getCollegeList(param_string, alt, ranked_sort) {
    try {
        //console.log(BASE_URL + param_string)

        var response = await axios.get(BASE_URL + param_string)
        return response.data
    } catch (e) {
        console.log(e)
        return e
    }
}


async function getTopColleges() {
    const data_string = fs.readFileSync('services/us_rankings.csv')
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