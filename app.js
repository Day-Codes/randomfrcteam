const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const app = express();
require('dotenv').config();
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const getRandomTeamNumber = () => {
    return Math.floor(Math.random() * 9999) + 1;
    // Generate random team number between 1000 and 8999
};

const fetchTeamInfo = async (teamNumber) => {
    try {
        const response = await axios.get(`https://www.thebluealliance.com/api/v3/team/frc${teamNumber}`, {
            headers: {
                'X-TBA-Auth-Key': process.env.TBA // Replace YOUR_TBA_API_KEY with your actual TBA API key
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching team information:', error);
        return null;
    }
};

app.get('/', async (req, res) => {
    const teamNumber = getRandomTeamNumber();
    const teamInfo = await fetchTeamInfo(teamNumber);
    res.render('index', { teamNumber, teamInfo });
});

const PORT = process.env.PORT || 3900;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
