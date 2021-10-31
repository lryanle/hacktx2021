import fetch from 'node-fetch';

async function getBlock(req, res) {
    const {street, city, state, zipCode} = req.query;

    const format = 'json';
    const layers = '2020 Census Blocks';
    const benchmark = 'Public_AR_ACS2021';
    const vintage = 'Current_ACS2021';

    const params = new URLSearchParams({ street, city, state, zipCode, benchmark, vintage, layers, format });

    const url = new URL('https://geocoding.geo.census.gov/geocoder/geographies/address?');

    const geoReq = await fetch(url + params);
    const geoRes = await geoReq.json();

    const rawRes = geoRes.result.addressMatches[0];

    console.log(rawRes);

    const coordinates = rawRes.coordinates;
    const geographies = rawRes.geographies['2020 Census Blocks'];

    const resObj = {
        coordinates,
        blockCode: geographies[0]['GEOID']
    }

    res.status(200).send(resObj);
}

export default getBlock;