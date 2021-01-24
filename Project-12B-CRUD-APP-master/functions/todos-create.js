const faunadb = require('faunadb'),
  q = faunadb.query;

  require("dotenv").config()


exports.handler = async function(event, context) {
    try{

    if (event.httpMethod != 'POST'){
        return { statusCode: 402 , message: `POST method is not allowed in todos create`}
    }

    let reqObject = JSON.parse(event.body);
   

    const client = new faunadb.Client({secret:process.env.FAUNADB_SECRET});

    let result = await client.query(
        q.Create(
             q.Collection("solo"),
            {data: {message: reqObject.message}}
        )
    )

    console.log("Entry is successfully Created with following ID " + result.ref.id);

    return {
        statusCode: 200,
        body: JSON.stringify({id: `${result.ref.id}` })
    }

    } catch(error) {

        return { statusCode: 400 ,  body: `${error.toString()}`}

    }
}